import { RouteObject } from "react-router-dom"
import AvvaReportPage from './pages/Reports/Avva'
import GetObjectVolume from './pages/Reports/GetObjectVolume'

export const ROUTE = {
  AVVA_REPORT: '/avva-report',
  GET_OBJECT_VOLUME: '/get-object-volume',
}

export default [
  {
    path: ROUTE.AVVA_REPORT,
    element: (
      <AvvaReportPage />
    )
  },
  {
    path: ROUTE.GET_OBJECT_VOLUME,
    element: (
      <GetObjectVolume />
    )
  },
] as RouteObject[]