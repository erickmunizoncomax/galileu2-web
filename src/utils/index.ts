import { CHART_COLORS } from '../constants'

export const getQueryParam = (queryString: string, paramName: string) => {
  const params = new URLSearchParams(queryString)
  return params.get(paramName) as any
}

export const generateGaugeData = (quintiles: Quintile[]) => {
  quintiles.sort((q1, q2) => q1.limit - q2.limit)

  const min = Math.min(...quintiles.map(q => q.limit))
  const max = Math.max(...quintiles.map(q => q.limit))
  const colors = [
    CHART_COLORS['very-low'],
    CHART_COLORS.low,
    CHART_COLORS.normal,
    CHART_COLORS.high,
    CHART_COLORS['very-high'],
  ]
  const colorRanges: any[] = []

  quintiles.forEach((q, index, arr) => {
    if (index < arr.length - 1) {
      colorRanges.push({
        color: colors[index],
        start: q.limit,
        end: quintiles[index + 1].limit
      })
    }
  })

  let color: [number, string][] = colorRanges.map(range => {
    return [(range.end - min) / (max - min), range.color]
  })

  color = color.reduce((result: [number, string][], current, index, arr) => {
    result.push(current)
    if (index < arr.length - 1) result.push([current[0] + 0.005, 'rgba(0,0,0,0)'])
    return result;
  }, [])

  return [min, max, color]
}