import React, { ReactElement } from 'react'
import { Doughnut } from 'react-chartjs-2'

type GDPRLastEvaluationDiagramPropType = {
  greenPercents: number
  redPercents: number
}

export const GDPRLastEvaluationDiagram = (
  props: GDPRLastEvaluationDiagramPropType,
): ReactElement => {
  const data = {
    labels: ['Conformitate cu GDPR', 'Non-conformitate cu GDPR'],
    datasets: [
      {
        data: [props.greenPercents, props.redPercents],
        backgroundColor: ['#11cc11', '#cc1111'],
        hoverBackgroundColor: ['#11cc11', '#cc1111'],
      },
    ],
  }

  return (
    <div style={{ height: '200px' }}>
      <Doughnut
        width={100}
        height={50}
        options={{
          maintainAspectRatio: false,
          legend: {
            position: 'bottom',
          },
        }}
        data={data}
      />
    </div>
  )
}
