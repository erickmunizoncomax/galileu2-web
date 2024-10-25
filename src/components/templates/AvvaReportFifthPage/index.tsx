import ReactECharts from 'echarts-for-react'
import {
  getCardioMetabolicRiskChartOptions,
  getFatPercentageGauge,
  getRCEstGauge,
  getVisceralFatAreaSummaryGauge
} from '../../../pages/Reports/Avva/util'
import { useMemo } from 'react'
import { useReportState } from '../../../create-store'
import SummaryChartItem, { SummaryChartItemProps } from './components/SummaryChartItem'

const AvvaReportFifthPage = () => {
  const analysis = useReportState(state => state.analysis)
  const report = useReportState(state => state.report)

  const cardioMetabolicRiskChartOption = useMemo(() => {
    if (analysis?.avarage) {
      return getCardioMetabolicRiskChartOptions(
        analysis.avarage.value,
        analysis.avarage.quintiles,
        analysis.avarage.risk
      )
    }
    return {}
  }, [analysis?.avarage])

  const visceralFatAreaGaugeOption = useMemo(() => {
    if (analysis?.visceralFatArea) {
      return getVisceralFatAreaSummaryGauge(analysis.visceralFatArea.value, analysis.visceralFatArea.quintiles)
    }
    return {}
  }, [analysis?.visceralFatArea])

  const fatPercentageGaugeOption = useMemo(() => {
    if (analysis?.fatPercentage) {
      return getFatPercentageGauge(analysis.fatPercentage.value, analysis.fatPercentage.quintiles, void 0, true)
    }
    return {}
  }, [analysis?.fatPercentage])

  const rCEstGaugeOption = useMemo(() => {
    if (analysis?.waistToHeightRatio) {
      return getRCEstGauge(analysis.waistToHeightRatio.value, analysis.waistToHeightRatio.quintiles, void 0, true)
    }
    return {}
  }, [analysis?.waistToHeightRatio])

  const summaryChartItems: SummaryChartItemProps[] = useMemo(() => {
    return [
      {
        title: 'Área de Gordura Visceral',
        text: report?.visceralFatAreaRisk.classification,
        chartOptions: visceralFatAreaGaugeOption
      },
      {
        title: 'Relação Cintura/Estatura (RCEST)',
        text: report?.waistToHeightRatioRisk.classification,
        chartOptions: rCEstGaugeOption
      },
      {
        title: 'Percentual de Gordura Corporal',
        text: report?.fatPercentageRisk.classification,
        chartOptions: fatPercentageGaugeOption
      }
    ]
  }, [visceralFatAreaGaugeOption, rCEstGaugeOption, fatPercentageGaugeOption, report])

  return (
    <>
      <div className="content h-full w-full flex flex-col">
        <div className="report-title-container">
          <p className="leading-[1.2] font-extrabold text-lg tracking-widå">
            Resumo
          </p>
        </div>

        <div className="gauge-container flex flex-col space-y-8 w-full my-8">
          <div className="chart-container">
            <ReactECharts option={cardioMetabolicRiskChartOption}
                          style={{ height: 100 }}/>
          </div>
          <div className="text-container text-center text-lg">
          <p className="leading-none">
            { report?.avarageRisk.title }
            </p>
            <p className="leading-none font-medium">
              { report?.avarageRisk.subtitle }
            </p>
          </div>
        </div>

        <div className="summary-charts-container flex flex-col space-y-8">
          {
            summaryChartItems.map(({ title, text, chartOptions }, index) => (
              <SummaryChartItem key={index}
                                title={title}
                                text={text}
                                chartOptions={chartOptions}/>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default AvvaReportFifthPage