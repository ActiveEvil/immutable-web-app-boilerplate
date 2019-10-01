
import { useNProgress } from '@tanem/react-nprogress'
import React from 'react'
import { Bar, Container } from './Styled'

interface ProgressBarProps {
  isAnimating?: boolean
}

const ProgressBar: React.FC<ProgressBarProps> = ({ isAnimating }): JSX.Element => {
  const { animationDuration, isFinished, progress } = useNProgress({
    // animationDuration: 300,
    // incrementDuration: 500,
    isAnimating
  })

  return <Container animationDuration={animationDuration} isFinished={isFinished} progress={progress}>
    <Bar/>
  </Container>
}

export default ProgressBar
