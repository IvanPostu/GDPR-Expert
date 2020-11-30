import React, { ReactElement } from 'react'
import { Bar } from 'react-chartjs-2'

type GDPREvaluationDiagramsPropType = {
  dates: Array<string> //YYYY-mm-dd
  percents: Array<number> // 0 ... 100
}

function barDataCreator(props: GDPREvaluationDiagramsPropType) {
  const BORDER_COLOR = '#3d3d3d'
  const BG_COLOR = 'rgba(125,95,255,0.4)'
  const BG_COLOR_HOVER = 'rgba(125,95,255,0.6)'

  return {
    labels: props.dates,
    datasets: [
      {
        label: 'Conformitatea cu R.G.P.D.',
        backgroundColor: BG_COLOR,
        borderColor: BORDER_COLOR,
        borderWidth: 1,
        hoverBackgroundColor: BG_COLOR_HOVER,
        hoverBorderColor: BORDER_COLOR,
        data: props.percents,
      },
    ],
  }
}

export const GDPREvaluationDiagrams = (props: GDPREvaluationDiagramsPropType): ReactElement => {
  const data = barDataCreator(props)

  return (
    <div style={{ height: '300px' }}>
      <Bar
        data={data}
        width={100}
        height={50}
        options={{
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Data realizării evaluării GDPR',
                },
              },
            ],
            yAxes: [
              {
                display: true,
                ticks: {
                  beginAtZero: true,
                  steps: 10,
                  stepValue: 5,
                  max: 100,
                  min: 0,
                },
              },
            ],
          },
        }}
      />
    </div>
  )
}
