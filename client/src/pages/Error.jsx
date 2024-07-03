import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div>
      Error
      <h1 onClick={() => navigate(-1)}>Go back</h1>
    </div>
  );
};

export default Error;
