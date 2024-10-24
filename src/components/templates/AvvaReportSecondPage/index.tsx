import { getVisceralFatAreaGauge } from '../../../pages/Reports/Avva/util'
import ReactECharts from 'echarts-for-react'
import visceralFatInfoGraphic from '../../../assets/img/second-page/visceral-fat-info-graphic.png'
import ManIcon from '../../../assets/svg/second-page/man-icon.svg?react'
import WomanIcon from '../../../assets/svg/second-page/woman-icon.svg?react'
import { useMemo } from 'react'
import { useReportState } from '../../../create-store'

const AvvaReportSecondPage = () => {
  const analysis = useReportState(state => state.analysis)
  const report = useReportState(state => state.report)

  const visceralFatLimitsInfoGraphic = useMemo(() => {
    return [
      {
        Icon: ManIcon,
        label: (
          <p className="text-sm">
            Homens <span className="font-bold">{`< 100 cm²`}</span>
          </p>
        )
      },
      {
        Icon: WomanIcon,
        label: (
          <p className="text-sm">
            Mulheres <span className="font-bold">{`< 80 cm²`}</span>
          </p>
        )
      }
    ]
  }, [])

  const visceralFatAreaGaugeOption = useMemo(() => {
    if (analysis?.visceralFatArea) {
      return getVisceralFatAreaGauge(analysis.visceralFatArea.value, analysis.visceralFatArea.quintiles, report?.visceralFatAreaRisk.title)
    }
    return {}
  }, [analysis?.visceralFatArea, report?.visceralFatAreaRisk])

  return (
    <>
      <div className="content h-full w-full flex flex-col">
        <div className="report-title-container">
          <p className="leading-[1.2] font-extrabold text-lg tracking-wide">
            Área de gordura visceral
          </p>
        </div>

        <div className="gauge-container">
          <div className="chart-container">
            <ReactECharts option={visceralFatAreaGaugeOption} />
          </div>
        </div>

        <div className="risk-container flex flex-col space-y-4 mb-4">
          <div className="cardio-metabolic-risk-container">
            <p className="font-bold">
              Classificação do Risco Cardiometabólico
            </p>
            <p>
              { report?.visceralFatAreaRisk.classification }
            </p>
          </div>

          <div className="associated-risks-container">
            <p className="text-justify">
              <span className="font-bold">
                Riscos Associados:&nbsp;
              </span>
              Excesso de gordura visceral está relacionado a doenças cardiovasculares, diabetes tipo 2 e hipertensão,
              além de inflamações crônicas e complicações metabólicas.
            </p>
          </div>
        </div>

        <div className="visceral-fat-container flex items-center space-x-8 mb-6">
          <div className="img-container min-w-44">
            <img src={visceralFatInfoGraphic} alt="Visceral Fat Info Graphic" />
          </div>

          <div className="text-container">
            <p className="font-bold">
              Gordura Visceral
            </p>
            <p className="leading-snug text-justify">
              A gordura visceral se acumula ao redor dos órgãos internos, como fígado e intestinos. Em excesso, está
              associada a problemas como doenças cardíacas e diabetes. Manter seus níveis controlados é essencial para
              a saúde.
            </p>
          </div>
        </div>

        <div className="visceral-fat-limits-container px-12 flex flex-col space-y-8">
          <div className="top-text-container">
            <p className="font-bold">
              Limites da Área de Gordura Visceral
            </p>
            <p>
              Homens com menos de 100 cm² e mulheres com menos de 80 cm² têm menor risco cardiometabólico.
            </p>
          </div>

          <div className="info-graphic-container flex items-center justify-center space-x-20">
            {
              visceralFatLimitsInfoGraphic.map(({ Icon, label }, index) => (
                <div key={index}
                     className="graphic-container flex items-center space-x-4">
                  <Icon /> { label }
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default AvvaReportSecondPage