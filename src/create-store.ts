import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import json from './mock/sandra.json'

type ReportState = {
  header?: Header
  customer?: Customer
  avatar?: Avatar
  analysis?: Analysis
  report?: AvvaReport
  setReportData: (data: ReportData) => void
  loadReportDataFromStorage: () => void
}

export const useReportState = create(
  immer<ReportState>((set) => ({
    setReportData: (data) => set((state) => {
      state.header = data.header
      state.customer = data.customer
      state.avatar = data.avatar
      state.analysis = data.analysis
      state.report = data.report
    }),
    loadReportDataFromStorage: () => set((state) => {
      const storedValue = localStorage.getItem('reportData')
      if (storedValue) {
        const json = JSON.parse(storedValue)
        state.setReportData(json as ReportData)
      }
      state.setReportData(json as any)
    })
  }))
)