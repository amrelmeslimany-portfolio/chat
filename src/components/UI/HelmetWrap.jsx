import React from "react";
import { Helmet } from "react-helmet";

const HelmetWrap = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | AMRChat</title>
    </Helmet>
  );
};

export default HelmetWrap;
