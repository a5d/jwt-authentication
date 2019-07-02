import React from 'react'
import {Container, CssBaseline} from "@material-ui/core";

interface Props {
  children: JSX.Element[] | JSX.Element | string
  title?: string
}

const LayoutMd = ({title, children}: Props) => {
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline/>
      {title && <h2>{title}</h2>}
      {children}
    </Container>
  )
}

export default LayoutMd