import * as THREE from 'three'

const calculateTetrahedronVolume = (
  x1: number,
  y1: number,
  z1: number,
  x2: number,
  y2: number,
  z2: number,
  x3: number,
  y3: number,
  z3: number,
): number => {
  return (-x3 * y2 * z1 + x2 * y3 * z1 + x3 * y1 * z2 - x1 * y3 * z2 - x2 * y1 * z3 + x1 * y2 * z3) / 6
}

export const calculateVolume = (geometry: THREE.BufferGeometry, scale: number = 1): number => {
  let volume = 0
  const position = geometry.attributes.position
  const index = geometry.index

  if (!index) {
    console.error('A geometria não é indexada. Não é possível calcular o volume corretamente.')
    return 0
  }

  const indices = index.array
  const vertices = position.array

  for (let i = 0; i < indices.length; i += 3) {
    const aIdx = indices[i] * 3
    const bIdx = indices[i + 1] * 3
    const cIdx = indices[i + 2] * 3

    const ax = vertices[aIdx] * scale
    const ay = vertices[aIdx + 1] * scale
    const az = vertices[aIdx + 2] * scale

    const bx = vertices[bIdx] * scale
    const by = vertices[bIdx + 1] * scale
    const bz = vertices[bIdx + 2] * scale

    const cx = vertices[cIdx] * scale
    const cy = vertices[cIdx + 1] * scale
    const cz = vertices[cIdx + 2] * scale

    volume += calculateTetrahedronVolume(ax, ay, az, bx, by, bz, cx, cy, cz)
  }
  return Math.abs(volume)
}