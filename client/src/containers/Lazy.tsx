import React from "react";
import Loadable from 'react-loadable'

export default (fn: any, text: string) => Loadable({
  loader: fn,
  loading() {
    return <div>{text}</div>
  }
})
