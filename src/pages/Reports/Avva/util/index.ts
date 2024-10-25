import { generateGaugeData } from '../../../../utils'
import { CHART_COLORS } from '../../../../constants'

export const getCardioMetabolicRiskChartOptions = (value: number, quintiles: Quintile[], risk: Risk) => {
  const max = Math.max(...quintiles.map(q => q.limit))
  let markPointValue = value / max * 100
  const markPointColor = CHART_COLORS[risk]

  if (value > max) markPointValue = 100

  return {
    animation: false,
    grid: {
      top: 0,
      bottom: 0,
    },
    xAxis: {
      type: 'value',
      show: false
    },
    yAxis: {
      type: 'category',
      data: [''],
      show: false
    },
    series: [
      {
        name: 'Segment 1',
        type: 'bar',
        stack: 'total',
        barWidth: 40,
        data: [20],
        itemStyle: {
          color: CHART_COLORS['very-low'],
          borderRadius: [15, 0, 0, 15]
        },
        markPoint: {
          data: [
            {
              xAxis: markPointValue,
              yAxis: 0,
              symbol: 'arrow',
              symbolSize: 30,
              symbolOffset: [0, 20],
              itemStyle: {
                color: markPointColor,
              }
            }
          ]
        }
      },
      {
        name: 'Segment 2',
        type: 'bar',
        stack: 'total',
        data: [20],
        itemStyle: {
          color: CHART_COLORS.low
        }
      },
      {
        name: 'Segment 3',
        type: 'bar',
        stack: 'total',
        data: [20],
        itemStyle: {
          color: CHART_COLORS.normal
        }
      },
      {
        name: 'Segment 4',
        type: 'bar',
        stack: 'total',
        data: [20],
        itemStyle: {
          color: CHART_COLORS.high
        }
      },
      {
        name: 'Segment 5',
        type: 'bar',
        stack: 'total',
        data: [20],
        itemStyle: {
          color: CHART_COLORS['very-high'],
          borderRadius: [0, 15, 15, 0]
        }
      }
    ]
  }
}

export const getVisceralFatAreaGauge = (value: number, quintiles: Quintile[], text?: string) => {
  const [min, max, color] = generateGaugeData(quintiles)

  return {
    animation: false,
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        radius: '90%',
        min,
        max,
        axisLine: {
          lineStyle: {
            width: 50,
            color
          }
        },
        pointer: {
          icon: 'arrow',
          length: '15%',
          width: 15,
          offsetCenter: [0, '-55%'],
          itemStyle: {
            color: 'auto',
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        detail: {
          formatter: (value: number) => {
            const truncated = Math.floor(value * 10) / 10
            return `${truncated} cm²`.replace('.', ',')
          },
          fontSize: 38,
          fontFamily: 'Maven Pro',
          offsetCenter: [0, '25%']
        },
        data: [{ value }]
      }
    ],
    graphic: {
      type: 'text',
      left: '26%',
      top: '70%',
      style: {
        text,
        width: 350,
        textAlign: 'center',
        lineHeight: 24,
        font: '20px Maven Pro',
        overflow: 'break',
      }
    }
  }
}

export const getRCEstGauge = (value: number, quintiles: Quintile[], risk?: string, summary?: boolean) => {
  const [min, max, color] = generateGaugeData(quintiles)
  const config: any = {
    animation: false,
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        radius: '65%',
        min,
        max,
        axisLine: {
          lineStyle: {
            width: 40,
            color
          }
        },
        pointer: {
          icon: 'arrow',
          length: '16%',
          width: 15,
          offsetCenter: [0, '-50%'],
          itemStyle: {
            color: 'auto',
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        detail: {
          formatter: (value: number) => {
            const truncated = Math.floor(value * 10) / 10
            return `${truncated}`.replace('.', ',')
          },
          fontSize: 22,
          fontFamily: 'Maven Pro',
          offsetCenter: [0, '25%']
        },
        data: [{ value }]
      }
    ],
  }

  if (summary) {
    config.series[0].pointer = {
      icon: 'arrow',
      length: '18%',
      width: 15,
      offsetCenter: [0, '-40%'],
      itemStyle: {
        color: 'auto',
      }
    }
  }

  if (risk) {
    config.graphic = {
      type: 'text',
      left: 'center',
      top: '70%',
      style: {
        rich: { bold: { fontWeight: 500, fontSize: 20 }},
        text: risk,
        width: 350,
        textAlign: 'center',
        lineHeight: 24,
        font: '20px Maven Pro',
        overflow: 'break',
      }
    }
  }
  return config
}

export const getFatPercentageGauge = (value: number, quintiles: Quintile[], risk?: string, summary?: boolean) => {
  const [min, max, color] = generateGaugeData(quintiles)
  const config: any = {
    animation: false,
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        radius: '65%',
        min,
        max,
        axisLine: {
          lineStyle: {
            width: 40,
            color
          }
        },
        pointer: {
          icon: 'arrow',
          length: '16%',
          width: 15,
          offsetCenter: [0, '-50%'],
          itemStyle: {
            color: 'auto',
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        detail: {
          formatter: (value: number) => {
            const truncated = Math.floor(value * 10) / 10
            return `${truncated}%`.replace('.', ',')
          },
          fontSize: 22,
          fontFamily: 'Maven Pro',
          offsetCenter: [0, '25%']
        },
        data: [{ value }]
      }
    ],
  }

  if (risk) {
    config.graphic = {
      type: 'text',
      left: 'center',
      top: '70%',
      style: {
        rich: {
          bold: {
            fontWeight: 500,
            fontSize: 20
          }
        },
        text: risk,
        textAlign: 'center',
        lineHeight: 24,
        font: '20px Maven Pro',
      }
    }
  }

  if (summary) {
    config.series[0].pointer = {
      icon: 'arrow',
      length: '18%',
      width: 15,
      offsetCenter: [0, '-40%'],
      itemStyle: {
        color: 'auto',
      }
    }
  }

  return config
}

export const getVisceralFatAreaSummaryGauge = (value: number, quintiles: Quintile[]) => {
  const [min, max, color] = generateGaugeData(quintiles)
  return {
    animation: false,
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        radius: '65%',
        min,
        max,
        axisLine: {
          lineStyle: {
            width: 40,
            color
          }
        },
        pointer: {
          icon: 'arrow',
          length: '18%',
          width: 15,
          offsetCenter: [0, '-40%'],
          itemStyle: {
            color: 'auto',
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        detail: {
          formatter: (value: number) => {
            const truncated = Math.floor(value * 10) / 10
            return `${truncated} cm²`.replace('.', ',')
          },
          fontSize: 22,
          fontFamily: 'Maven Pro',
          offsetCenter: [0, '25%']
        },
        data: [{ value }]
      }
    ],
  }
}