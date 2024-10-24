import { getQueryParam } from '../../../utils'
import { useLocation } from 'react-router-dom'
import Object3DRenderer from '../../../components/organisms/Object3DRenderer'
import { useEffect } from 'react'

const GetObjectVolume = () => {
  const location = useLocation()
  const path = getQueryParam(location.search, 'objUrl')

  const handleVolumeLoad = (bodyVolume: number) => {
    const eventInit = { detail: { bodyVolume }}
    const event = new CustomEvent(`bodyVolumeReadyEvent`, eventInit)
    console.log('bodyVolumeReadyEvent')
    window.dispatchEvent(event)
  }

  useEffect(() => {
    const eventMapping: any = {
      front: 'frontPictureReadyEvent',
      back: 'backPictureReadyEvent',
      right: 'sidePictureReadyEvent'
    }
    const callback = (event: any) => {
      const { detail: { name }} = event
      if (eventMapping[name]) {
        const eventName = eventMapping[name]
        const event = new CustomEvent(eventName)
        window.dispatchEvent(event)
      }
    }
    window.addEventListener('readyToCaptureImage', callback)
  }, [])

  return (
    <>
      <div className="object3d-renderer-container h-screen w-screen">
        <Object3DRenderer objectPath={path}
                          onVolumeLoad={handleVolumeLoad}
                          printMode />
      </div>
    </>
  )
}

export default GetObjectVolume