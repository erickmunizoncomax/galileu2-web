import { generateGaugeData } from '../../../../utils'

export const getCardioMetabolicRiskChartOptions = (value: number, quintiles: Quintile[]) => {
  const max = Math.max(...quintiles.map(q => q.limit))
  const markPointValue = value / max * 100

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
          color: '#6ECC39',
          borderRadius: [15, 0, 0, 15]
        },
        markPoint: {
          data: [
            {
              xAxis: markPointValue,
              yAxis: 0,
              symbol: 'arrow',
              symbolSize: 30,
              itemStyle: {
                color: '#FFF',
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
          color: '#B2D235'
        }
      },
      {
        name: 'Segment 3',
        type: 'bar',
        stack: 'total',
        data: [20],
        itemStyle: {
          color: '#FFD400'
        }
      },
      {
        name: 'Segment 4',
        type: 'bar',
        stack: 'total',
        data: [20],
        itemStyle: {
          color: '#FF8800'
        }
      },
      {
        name: 'Segment 5',
        type: 'bar',
        stack: 'total',
        data: [20],
        itemStyle: {
          color: '#FF3333',
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
          show: true,
          length: '80%',
          width: 70,
          showAbove: false,
          itemStyle: {
            color: '#FFF'
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
          formatter: '{value} cm²',
          fontSize: 38,
          fontFamily: 'Maven Pro',
          offsetCenter: [0, '20%']
        },
        data: [{ value }]
      }
    ],
    graphic: {
      type: 'text',
      left: 'center',
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

export const getRCEstGauge = (value: number, quintiles: Quintile[], risk?: string) => {
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
          show: true,
          length: '70%',
          width: 40,
          showAbove: false,
          itemStyle: {
            color: '#FFF'
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
          formatter: '{value}',
          fontSize: 22,
          fontFamily: 'Maven Pro',
          offsetCenter: [0, '20%']
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

export const getFatPercentageGauge = (value: number, quintiles: Quintile[], risk?: string) => {
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
          show: true,
          length: '70%',
          width: 40,
          showAbove: false,
          itemStyle: {
            color: '#FFF'
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
          formatter: '{value}%',
          fontSize: 22,
          fontFamily: 'Maven Pro',
          offsetCenter: [0, '20%']
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
          show: true,
          length: '70%',
          width: 40,
          showAbove: false,
          itemStyle: {
            color: '#FFF'
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
          formatter: '{value} cm²',
          fontSize: 22,
          fontFamily: 'Maven Pro',
          offsetCenter: [0, '20%']
        },
        data: [{ value }]
      }
    ],
  }
}