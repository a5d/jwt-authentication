import React from "react";

interface Props {
  children: JSX.Element[] | JSX.Element | string
}

const TextBlock = (props: Props) => {
  return <div className="text-block">
    {props.children}
  </div>
}

export default TextBlock