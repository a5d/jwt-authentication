import LayoutMd from "../components/LayoutMd";
import {Link} from "react-router-dom";
import React from "react";

const NewsPage = () => {
  return <LayoutMd title="News">
    <p>123</p>
    <p><Link to={{pathname: "/contacts", state: {from: "news"}}}>Contacts</Link></p>
  </LayoutMd>
}

export default NewsPage