import { FC } from 'react'
import ReactECharts from 'echarts-for-react'

export interface SummaryChartItemProps {
  title: string
  text?: string
  chartOptions?: any
}

const SummaryChartItem: FC<SummaryChartItemProps> = (props) => {
  const {
    title,
    text,
    chartOptions,
  } = props

  return (
    <>
      <div className="summary-chart-item-container flex">
        <div className="chart-container w-1/3 relative">
          <div className="chart-container h-full w-full absolute left-0">
            <ReactECharts option={chartOptions ?? {}}
                          style={{ transform: 'translateY(-50px)' }}/>
          </div>
        </div>

        <div className="text-container w-2/3 flex flex-col space-y-4 p-4">
          <p className="font-extrabold">
            { title }
          </p>
          <p className="leading-none text-justify">
            { text }
          </p>
        </div>
      </div>
    </>
  )
}

export default SummaryChartItem