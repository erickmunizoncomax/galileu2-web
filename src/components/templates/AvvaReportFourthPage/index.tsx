import ReactECharts from 'echarts-for-react'
import { getFatPercentageGauge } from '../../../pages/Reports/Avva/util'
import infoGraphic from '../../../assets/img/fourth-page/info-graphic.png'
import { useMemo } from 'react'
import { useReportState } from '../../../create-store'

const AvvaReportFourthPage = () => {
  const analysis = useReportState(state => state.analysis)
  const report = useReportState(state => state.report)

  const fatPercentageGaugeOption = useMemo(() => {
    if (analysis?.fatPercentage) {
      const risk = `${report?.fatPercentageRisk.title}\n${report?.fatPercentageRisk.subtitle}`
      return getFatPercentageGauge(analysis.fatPercentage.value, analysis.fatPercentage.quintiles, risk)
    }
    return {}
  }, [analysis?.fatPercentage, report?.fatPercentageRisk])

  return (
    <>
      <div className="content h-full w-full flex flex-col">
        <div className="report-title-container">
          <p className="leading-[1.2] font-extrabold text-lg tracking-widå">
            Percentual de Gordura
          </p>
        </div>

        <div className="gauge-container col-span-2 relative flex items-center">
          <div className="chart-container h-full w-full">
            <ReactECharts option={fatPercentageGaugeOption}/>
          </div>
        </div>

        <div className="texts-container flex flex-col space-y-4 mb-6">
          <div className="text-container">
            <p className="font-bold">
              Classificação do Risco Cardiometabólico
            </p>
            <p className="text-justify">
              { report?.fatPercentageRisk.classification }
            </p>
          </div>

          <div className="text-container">
            <p className="text-justify">
              <span className="font-bold">
                Riscos associados:&nbsp;
              </span>
              Um percentual de gordura muito alto aumenta o risco de doenças cardiovasculares e hipertensão. Por outro
              lado, um percentual muito baixo pode levar à uma imunidade mais baixa e desequilíbrios hormonais. Manter
              o equilíbrio é importante.
            </p>
          </div>
        </div>

        <div className="explanation-container flex items-center">
          <div className="text-container w-1/2 pr-2">
            <p className="font-bold">
              O que é o Percentual de Gordura?
            </p>
            <p className="text-justify">
              O percentual de gordura representa a proporção de gordura no corpo em relação ao peso total. Essa medida
              ajuda a avaliar a composição corporal e a monitorar a saúde.
            </p>
          </div>

          <div className="info-graphic-container w-1/2 pl-2">
            <div className="img-container">
              <img src={infoGraphic} alt=""/>
            </div>

            <div className="text-container flex justify-between ml-7 mr-5 relative">
              <p className="text-xs absolute left-0">
                baixo
              </p>
              <p className="text-xs absolute left-[86px]">
                normal
              </p>
              <p className="text-xs absolute left-[168px]">
                sobrepeso
              </p>
              <p className="text-xs absolute right-0">
                obesidade
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AvvaReportFourthPage