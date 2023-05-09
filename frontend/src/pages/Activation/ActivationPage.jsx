import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { server } from "../../server";
import axios from "axios";

const ActivationPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const verifyAccountToken = queryParams.get("verify_account");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (verifyAccountToken) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/user/activation`, {
            activation_token: verifyAccountToken,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            setError(true);
          });
      };
      sendRequest();
    }
  }, [verifyAccountToken]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p>Your token is expired!</p>
      ) : (
        <p>Your account has been created successfully!</p>
      )}
    </div>
  );
};

export default ActivationPage;
