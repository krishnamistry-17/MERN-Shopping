/** @format */

import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Logout = () => {
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const res = await fetch("/logout", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (res.status !== 200) {
          const error = new Error("Logout failed");
          throw error;
        }

        dispatch({ type: "USER", payload: false });
      } catch (err) {
        console.log(err);
      } finally {
        navigate("/login", { replace: true });
      }
    };

    logoutUser();
  }, [dispatch, navigate]);

  return (
    <>
      <h1>Logout Page</h1>
    </>
  );
};

export default Logout;
