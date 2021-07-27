import React from 'react'

const DeliveryProgress = ({
  height,
  width,
  progress,
  labels,
  completedColor,
  uncompletedColor,
  lineColor,
}) => {
  const startHeight = height / 2
  const r = width * 0.0384
  const firstEnding = 10 + 2 * r
  const lastEnding = width - 2 * r
  const distance = (lastEnding - firstEnding - 10) / 3

  const firstCircleX = 10 + r
  const secondCircleX = firstCircleX + r + distance
  const thirdCircleX = secondCircleX + r + distance
  const fourthCircleX = width - r - 20

  return (
    <svg className='svg' height={height} width={width}>
      <line
        x1={firstEnding}
        y1={startHeight}
        x2={lastEnding}
        y2={startHeight}
        style={{ strokeWidth: '2', stroke: lineColor }}
      />
      <circle
        cx={firstCircleX}
        cy={startHeight}
        r={r}
        fill={progress >= 1 ? completedColor : 'white'}
        stroke={progress >= 1 ? completedColor : uncompletedColor}
        strokeWidth='2'
      />
      <text
        x={firstCircleX - 1.5 * r}
        y={startHeight + 2 * r}
        fill={progress >= 1 ? completedColor : uncompletedColor}
      >
        {labels.label1}
      </text>
      <circle
        cx={secondCircleX}
        cy={startHeight}
        r={r}
        fill={progress >= 2 ? completedColor : 'white'}
        stroke={progress >= 2 ? completedColor : uncompletedColor}
        strokeWidth='2'
      />
      <text
        x={secondCircleX - 1.25 * r}
        y={startHeight + 2 * r}
        fill={progress >= 2 ? completedColor : uncompletedColor}
      >
        {labels.label2}
      </text>
      <circle
        cx={thirdCircleX}
        cy={startHeight}
        r={r}
        fill={progress >= 3 ? completedColor : 'white'}
        stroke={progress >= 3 ? completedColor : uncompletedColor}
        strokeWidth='2'
      />
      <text
        x={thirdCircleX - 1.5 * r}
        y={startHeight + 2 * r}
        fill={progress >= 3 ? completedColor : uncompletedColor}
      >
        {labels.label3}
      </text>
      <circle
        cx={fourthCircleX}
        cy={startHeight}
        r={r}
        fill={progress >= 4 ? completedColor : 'white'}
        stroke={progress >= 4 ? completedColor : uncompletedColor}
        strokeWidth='2'
      />
      <text
        x={fourthCircleX - 1.5 * r}
        y={startHeight + 2 * r}
        fill={progress >= 4 ? completedColor : uncompletedColor}
      >
        {labels.label4}
      </text>
      Sorry, your browser does not support inline SVG.
    </svg>
  )
}

DeliveryProgress.defaultProps = {
  height: 220,
  width: 500,
  radius: 20,
  progress: 1,
  labels: {
    label1: 'Received',
    label2: 'Packed',
    label3: 'Shipped',
    label4: 'Delivered',
  },
  completedColor: 'blue',
  uncompletedColor: '#8080ff',
  lineColor: '#bfbfbf',
}

export default DeliveryProgress
