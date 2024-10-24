import { FC, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Group, Loader } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { createRoot } from 'react-dom/client'
import { calculateVolume } from './utils'

// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// @ts-ignore
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

declare const window: any

type LoaderFunctionProps = {
  loader?: Loader<GLTF | Group>
  container?: Element
  scene: any
  camera: any
  controls: any
  onVolumeLoad?: (volume: number) => void
}

interface Object3DRendererProps {
  objectPath?: string
  onVolumeLoad?: (volume: number) => void
  printMode?: boolean
}

const scope: {
  loadedModel: any
  isAnimating: boolean
} = {
  loadedModel: void 0,
  isAnimating: true,
}

const Object3DRenderer: FC<Object3DRendererProps> = (props) => {
  const { objectPath = '/robinho-com-normals.gltf', onVolumeLoad, printMode } = props
  const parentContainerRef = useRef<any>(null)
  const [isObjectLoaded, setIsObjectLoaded] = useState<boolean>(false)

  const loadFromObj = (params: LoaderFunctionProps) => {
    const { loader, camera, scene, controls } = params
    loader!.load(objectPath, (object) => {
      scene.add(object)
      const boundingBox = new THREE.Box3().setFromObject(object as any)
      const size = new THREE.Vector3()
      const modelCenter = new THREE.Vector3()
      const cameraDistance = 400
      boundingBox.getSize(size)
      boundingBox.getCenter(modelCenter)
      camera.position.set(0, modelCenter.y + cameraDistance, 2000)
      controls.target.copy(modelCenter)
      controls.update()
    })
  }

  const loadFromGLTF = (params: LoaderFunctionProps) => {
    const { loader, scene, controls, camera, onVolumeLoad } = params

    loader!.load(objectPath, (gltf) => {
      // @ts-ignore
      const model = gltf.scene
      scene.add(model)
      scope.loadedModel = model
      const boundingBox = new THREE.Box3().setFromObject(model)
      const size = new THREE.Vector3()
      const modelCenter = new THREE.Vector3()
      const cameraDistance = 400
      boundingBox.getSize(size)
      boundingBox.getCenter(modelCenter)
      camera.position.set(0, modelCenter.y + cameraDistance, 2000)
      controls.target.copy(modelCenter)
      controls.update()

      setTimeout(() => {
        // @ts-ignore
        gltf.scene.traverse((object) => {
          const child = object.children[0] as any
          if (child?.isMesh) {
            const geometry = child.geometry
            if (geometry.isBufferGeometry && geometry.attributes.position) {
            const volume = calculateVolume(geometry)
            onVolumeLoad && onVolumeLoad(volume)
            setIsObjectLoaded(true)
          }
        }})
      }, 1000)
    })
  }

  useEffect(() => {
    if (!parentContainerRef.current) return
    const parent: any = parentContainerRef.current
    const gltfLoader = new GLTFLoader()
    const objLoader = new OBJLoader()
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, parent.clientWidth / parent.clientHeight, 0.1, 10000)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    const controls = new OrbitControls(camera, renderer.domElement)

    scene.background = new THREE.Color(0xffffff)

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(parent.clientWidth, parent.clientHeight)
    parent.appendChild(renderer.domElement)

    controls.minPolarAngle = Math.PI / 2
    controls.maxPolarAngle = Math.PI / 2
    controls.enablePan = false
    controls.enableZoom = false

    const params: LoaderFunctionProps = { camera, scene, controls, container: parentContainerRef.current, onVolumeLoad }

    if (objectPath.endsWith('gltf')) {
      params.loader = gltfLoader
      loadFromGLTF(params)
    } else {
      params.loader = objLoader
      loadFromObj(params)
    }

    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3)

    scene.add(hemisphereLight)
    hemisphereLight.position.set(0, 20, 0)

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5)

    dirLight.position.set(-100, 2000, 1000)
    dirLight.castShadow = true
    dirLight.shadow.camera.top = 2
    dirLight.shadow.camera.bottom = -2
    dirLight.shadow.camera.left = -2
    dirLight.shadow.camera.right = 2
    dirLight.shadow.camera.near = 0.1
    dirLight.shadow.camera.far = 40
    scene.add(dirLight)

    const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 300)
    const dirLightPos = dirLightHelper.position

    dirLightHelper.position.set(dirLightPos.x, dirLightPos.y + 1000, dirLightPos.z)

    const animate = () => {
      requestAnimationFrame(animate)
      if (scope.loadedModel && scope.isAnimating && !printMode) scope.loadedModel.rotation.y += 0.01
      renderer.render(scene, camera)
    }

    animate()
  }, [parentContainerRef])

  const executePrintAnimation = () => {
    const configs = [
      { name: 'front', position: 0 },
      { name: 'left', position: 300 },
      { name: 'right', position: -300 },
      { name: 'back', position: 600 },
    ]

    configs.forEach((config, index) => {
      setTimeout(() => {
        const { position, name } = config
        const eventInit = { detail: { name }}
        scope.loadedModel.rotation.y = position
        window.loadedModel = scope.loadedModel
        const event = new CustomEvent(`readyToCaptureImage`, eventInit)
        window.dispatchEvent(event)
      }, index * 1000)
    })
  }

  useEffect(() => {
    if (isObjectLoaded && printMode) {
      executePrintAnimation()
    }
  }, [isObjectLoaded])

  const handleBeforeUnload = () => {
    setIsObjectLoaded(false)
  }

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  return (
    <div ref={parentContainerRef}
         style={{ height: '100%', width: '100%', backgroundColor: '#000', opacity: isObjectLoaded ? 1 : 0 }}
         className="parent-container relative"
         onMouseUp={() => scope.isAnimating = false}
         onMouseDown={() => scope.isAnimating = false} />
  )
}

class TeraScienceObject3DRenderer {
  selector: string
  objectPath: string
  container: any
  onVolumeLoad: (volume: number) => void
  printMode: boolean

  constructor(props: any) {
    this.selector = props.selector
    this.objectPath = props.objectPath
    this.onVolumeLoad = props.onVolumeLoad
    this.printMode = props.printMode
    this.container = document.querySelector(this.selector)
    if (!this.container) throw new Error('É necessário fornecer o seletor de um container válido para TeraScienceObject3DRenderer')
    this.render()
  }

  render() {
    const root = createRoot(this.container!)
    root.render(
      <Object3DRenderer objectPath={this.objectPath}
                        onVolumeLoad={this.onVolumeLoad}
                        printMode={this.printMode} />
    )
  }
}

window.TeraScienceObject3DRenderer = TeraScienceObject3DRenderer

export default Object3DRenderer