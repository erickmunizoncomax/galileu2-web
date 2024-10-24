import ReactECharts from 'echarts-for-react'
import { getCardioMetabolicRiskChartOptions } from '../../../pages/Reports/Avva/util'
import CardBigNumber from './components/CardBigNumber'
import Weight from '../../../assets/svg/first-page/weight.svg?react'
import Man from '../../../assets/svg/first-page/man.svg?react'
import WaterTreatment from '../../../assets/svg/first-page/water-treatment.svg?react'
import { useReportState } from '../../../create-store'
import { useMemo } from 'react'

const AvvaReportFirstPage = () => {
  const customer = useReportState(state => state.customer)
  const avatar = useReportState(state => state.avatar)
  const analysis = useReportState(state => state.analysis)
  const report = useReportState(state => state.report)

  const cardioMetabolicRiskChartOption = useMemo(() => {
    if (analysis?.avarage) {
      return getCardioMetabolicRiskChartOptions(analysis.avarage.value, analysis.avarage.quintiles)
    }
    return {}
  }, [analysis?.avarage])

  return (
    <div className="content h-full w-full flex flex-col space-y-12">
      <div className="report-title-container">
        <p className="leading-[1.2] font-extrabold text-lg tracking-wide">
          Laudo da análise <br/>
          do risco cardiometabólico
        </p>
      </div>

      <div className="avatars-containter flex _space-x-4 justify-center">
        <img src={`data:image/jpeg;base64,${avatar?.frontPicture}`}
             className="h-[400px] w-[205px]"
             alt="Front Avatar" />
        <img src={`data:image/jpeg;base64,${avatar?.sidePicture}`}
             className="h-[400px] w-[205px]"
             alt="Side Avatar" />
        <img src={`data:image/jpeg;base64,${avatar?.backPicture}`}
             className="h-[400px] w-[205px]"
             alt="Back Avatar" />
      </div>

      <div className="big-numbers-container flex items-center justify-center space-x-8">
        <CardBigNumber Icon={Weight}
                       label="Peso"
                       value={customer?.weight}
                       unit="Kg"
                       color="#efd8ea"/>
        <CardBigNumber Icon={WaterTreatment}
                       label="Volume"
                       value={+((customer?.bodyVolume ?? 0) / 1000000).toFixed(2)}
                       unit="L"
                       color="#cce3f1"/>
        <CardBigNumber Icon={Man}
                       label="IMC"
                       value={+(customer?.bmi ?? 0).toFixed(2)}
                       unit="Kg/m2"
                       color="#dbecc8"/>
      </div>

      <div className="gauge-container flex flex-col space-y-8 w-full">
        <div className="chart-container">
          <ReactECharts option={cardioMetabolicRiskChartOption}
                        style={{ height: 35 }}/>
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
    </div>
  )
}

export default AvvaReportFirstPage