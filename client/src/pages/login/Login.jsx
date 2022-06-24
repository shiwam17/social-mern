import { useContext, useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import * as Yup from 'yup'
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  // const schema= Yup.object.shape({

  // })
  function PasswordEye({ id }) {
    const [eyeIcon, setEyeIcon] = useState('fa fa-eye-slash')
    const [mouseLeave, setMouseLeave] = useState(false)
    const showPassword = () => {
        const password = document.getElementById(id);
        if (password.type === 'password') {
            password.type = 'text'
            setEyeIcon('fa fa-eye')
            setMouseLeave(true)
        } else {
            setMouseLeave(false)
            password.type = 'password'
            setEyeIcon('fa fa-eye-slash')
        }
    }
    return <span onClick={() => showPassword()} className="text-muted show-password"><i onMouseLeave={() => mouseLeave && showPassword()} className={eyeIcon}></i></span>
}

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social</h3>
          <span className="loginDesc">
            Sharing Happiness.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">
              <Link to ='forgot'>Forgot Password?
              </Link>

              </span>
            <button className="loginRegisterButton">
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
