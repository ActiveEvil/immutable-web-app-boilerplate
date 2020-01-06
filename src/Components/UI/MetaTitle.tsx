import React from 'react'
import { Helmet } from 'react-helmet'

interface MetaTitleProps {
  title: string
}

const MetaTitle: React.FC<MetaTitleProps> = ({ title }): JSX.Element => (
  <Helmet>
    <title>{title}</title>
    <meta name={title} content={`${title} content`} />
  </Helmet>
)

export default MetaTitle
