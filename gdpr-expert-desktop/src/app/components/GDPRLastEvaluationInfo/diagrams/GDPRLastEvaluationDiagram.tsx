import React, { ReactElement } from 'react'
import { Doughnut } from 'react-chartjs-2'

const data = {
  labels: ['Red', 'Green'],
  datasets: [
    {
      data: [30, 50],
      backgroundColor: ['#cc1111', '#11cc11'],
      hoverBackgroundColor: ['#cc1111', '#11cc11'],
    },
  ],
}

export const GDPRLastEvaluationDiagram = (): ReactElement => {
  return (
    <div style={{ height: '200px' }}>
      <Doughnut
        width={100}
        height={50}
        options={{
          maintainAspectRatio: false,
        }}
        data={data}
      />
    </div>
  )
}
