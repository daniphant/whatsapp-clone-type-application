import React from "react";
import { Button } from "@material-ui/core";
import { auth, provider } from "../../Firebase";
import { actionTypes } from "../../reducer";
import { useStateValue } from "../../StateProvider";

import "./index.css";

const Login = () => {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(val => {
        dispatch({
          type: actionTypes.SET_USER,
          user: val.user,
        });
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png"
          alt="logo"
        />
        <div className="login__text">
          <h1>Sign in to continue.</h1>
        </div>
        <Button onClick={signIn}> Sign In With Google </Button>
      </div>
    </div>
  );
};

export default Login;
