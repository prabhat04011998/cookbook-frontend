import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import {login} from '../api/auth_api'
//functional component for login .
function Login() {
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(false);
//seting data to the state while changing the input boxes.
  function onChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  function onSubmit(e) {
    e.preventDefault();

    const user = {
      username: state.username,
      password: state.password,
    };
//on submitting the form calling authntication api.
    login(user).then((res) => {
      if (res.status == "1") {
        window.location.href="/profile"
        setState({
          username: "",
          password: "",
        });
      } else {
        setError(true);
        setState({
          username: "",
          password: "",
        });
      }
    });
  }

  return (
    <div
      class="container-fluid"
      style={{
        color: "#fff",
        height: "500px",
        backgroundImage:
          "url(" +
          "https://b.zmtcdn.com/data/images/order/home_page_bg.jpg?output-format=webp" +
          ")",
        backgroundSize: "100% 100%",
      }}
    >
      <h4>LOGIN </h4>
      {error ? (<h2 style={{color:"red"}}>An error occured</h2>):(null)}
      <form
      onSubmit={onSubmit}
        class="ui form"
        style={{
          position: "relative",
          zIndex: "1",
          background: "#FFFFFF",
          maxWidth: "360px",
          margin: "0 auto 100px",
          padding: "45px",
          textAlign: "center",
          boxShadow:
            "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
        }}
      >
        <div class="field">
          <input
            placeholder="User Name"
            type="text"
            style={{
              fontFamily: '"Roboto", sans-serif',
              outline: "0",
              background: "#f2f2f2",
              width: "100%",
              border: "0",
              margin: "0 0 15px",
              padding: "15px",
              boxSizing: "border-box",
              fontSize: "14px",
            }}
            name="username"
            value={state.username}
            onChange={onChange}
          />
        </div>
        <div class="field">
          <input
            placeholder="Password"
            type="password"
            style={{
              fontFamily: '"Roboto", sans-serif',
              outline: "0",
              background: "#f2f2f2",
              width: "100%",
              border: "0",
              margin: "0 0 15px",
              padding: "15px",
              boxSizing: "border-box",
              fontSize: "14px",
            }}
            name="password"
            value={state.password}
            onChange={onChange}
          />
        </div>

        <button type="submit" class="ui button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
