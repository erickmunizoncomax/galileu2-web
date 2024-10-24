import ReactECharts from 'echarts-for-react'
import { getRCEstGauge } from '../../../pages/Reports/Avva/util'
import { useReportState } from '../../../create-store'
import { useMemo } from 'react'

const AvvaReportThirdPage = () => {
  const analysis = useReportState(state => state.analysis)
  const report = useReportState(state => state.report)
  const avatar = useReportState(state => state.avatar)

  const visceralFatAreaGaugeOption = useMemo(() => {
    if (analysis?.waistToHeightRatio) {
      return getRCEstGauge(analysis.waistToHeightRatio.value, analysis.waistToHeightRatio.quintiles, report?.waistToHeightRatioRisk.title)
    }
    return {}
  }, [analysis?.waistToHeightRatio, report?.waistToHeightRatioRisk])

  return (
    <>
      <div className="content h-full w-full flex flex-col">
        <div className="report-title-container">
          <p className="leading-[1.2] font-extrabold text-lg tracking-wide">
            Relação Cintura Estatura (RCEst)
          </p>
        </div>

        <div className="top-gauge-avatar-container grid grid-cols-3 my-8">
          <div className="gauge-container col-span-2 relative flex items-center">
            <div className="chart-container h-full w-full">
              <ReactECharts option={visceralFatAreaGaugeOption}/>
            </div>
          </div>
          <div className="avatar-container flex items-center justify-center">
            <img src={`data:image/jpeg;base64,${avatar?.sidePicture}`}
                 className="h-72"
                 alt="Side Picture" />
          </div>
        </div>

        <div className="texts-container flex flex-col space-y-8">
          <div className="text-container">
            <p className="font-bold">
              Classificação do Risco Cardiometabólico
            </p>

            <p className="text-justify">
              { report?.waistToHeightRatioRisk.classification }
            </p>
          </div>

          <div className="text-container">
            <p className="text-justify">
              <span className="font-bold">
                Riscos Associados:&nbsp;
              </span>
              Uma relação cintura/estatura elevada pode aumentar o risco de doenças cardiovasculares, diabetes tipo 2 e
              hipertensão, devido ao acúmulo de gordura na região abdominal.
            </p>
          </div>

          <div className="text-container">
            <p className="font-bold">
              O que é a Relação Cintura/Estatura?
            </p>

            <p className="text-justify">
              A relação cintura/estatura é a proporção entre o perímetro da cintura e a altura. Para manter uma boa
              saúde,
              a circunferência da sua cintura deve ser menor do que a metade da sua altura.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AvvaReportThirdPage