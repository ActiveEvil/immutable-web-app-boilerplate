import React from 'react'
import styled from 'styled-components'

interface ContainerProps {
  animationDuration: number
  isFinished: boolean
  progress: number
}

export const Container = styled.div<ContainerProps>`
  pointer-events: none;
  opacity:  ${({ isFinished }) => isFinished ? 0 : 1};
  background: hotpink;
  height: 3px;
  left: 0;
  margin-left: ${({ progress }) => `${(-1 + progress) * 100}%`};
  position: fixed;
  top: 0;
  transition: ${({ animationDuration }) => `margin-left ${animationDuration}ms linear`};
  width: 100%;
  z-index: 9999;
`

export const Bar = styled.div`
  display: block;
  height: 100%;
  opacity: 1;
  position: absolute;
  right: 0;
  transform: rotate(3deg) translate(0px, -4px);
  width: 100px;
`
