import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
// import {useNavigate} from 'react-router-dom'
import axios from "axios";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";


const SignUp = () => {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  }
  

  const [passwordShow, setPasswordShow] = useState(false);
  const togglePassword = () => {
    setPasswordShow(!passwordShow);
  };


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //register is a function provided by the useForm hook. We can assign it to each input field so that the react-hook-form can track the changes for the input field value
  //handleSubmit is the function we can call when the form is submitted
  //errors is a nested property in the formState object which will contain the validation errors, if any


  const onSubmit = async (...register) => {
    // e.preventDefault();
    console.log(...register)
    try {
      await axios.post("http://localhost:4000/api/users/", form
        // ...register
        // userName: form.userName,
        // firstName: form.firstName,
        // lastName: form.lastName,
        // email: form.email,
        // password: form.password,
      );
      const loginRes = await axios.post('http://localhost:4000/api/users/login', {
        // ...register("email"),
        // ...register("pasword")
        email: form.email,
        password: form.password,
      })
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user
      })
      localStorage.setItem('auth-token', loginRes.data.taken)
        navigate("/")
    }catch(err){
      // console.log('problem==>', err.data.msg)
      console.log(err)
    }
  }



  // console.log(createProfile());


  // console.log({...register("password")});
  //We're using the spread operator so react-hook-form will spread out all the required event handlers like onChange, onBlur, and other props for that input field.


  return (
    <div
      className="signup"
      style={{
        backgroundImage:
          "URL('https://www.evangadi.com/themes/humans/assets/images/misc/bg-svg-f.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no repeat",
      }}
    >
      <div className="signup__form">
        <div>
          <h2>Join the network</h2>
        </div>
        <div>
          <p>
            Already have an accoun? <Link to="/">Sign in</Link>
          </p>
        </div>
        <div>
          {errors.email?.type === "required" && (
            <p className="errorMsg">Email is required</p>
          )}
          {errors.email?.type === "pattern" && (
            <p className="errorMsg">Email is not valid</p>
          )}
          {errors.userName?.type === "required" && (
            <p className="errorMsg">User name required</p>)}
          {errors.firstName?.type === "required" && (
            <p className="errorMsg">First name required</p>)}
          {errors.lastName?.type === "required" && (
            <p className="errorMsg">Last name required</p>)}
          {errors.password?.type === "required" && (
            <p className="errorMsg">Password is required</p>
          )}
          {errors.password?.type === "checkLength" && (
            <p className="errorMsg">
              Password should be at least 8 characters
            </p>
          )}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form__control">
            <input
              type="text"
              name="email"
              placeholder="Email address"
              {...register("email", {
                required: true,
                pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              })}
            />
            {/* {errors.email?.type === "required" && (
              <p className="errorMsg">Email is required</p>
            )}
            {errors.email?.type === "pattern" && (
              <p className="errorMsg">Email is not valid</p>
            )} */}
          </div>
          <div className="form__name">
            <div className="form__control">
              <input
                type="text"
                name="userName"
                placeholder="User name"
                {...register("userName", {
                  required: true,
                })}
              />
              {/* {errors.userName?.type === "required" && (
                <p className="errorMsg">User name required</p>)} */}
            </div>
            <div className="form__control">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                {...register("firstName", {
                  required: true,
                })}
              />
              {/* {errors.lastName?.type === "required" && (
                <p className="errorMsg">First name required</p>)} */}
            </div>
            <div className="form__control">
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                {...register("lastName", {
                  required: true,
                })}
              />
              {/* {errors.lastName?.type === "required" && (
                <p className="errorMsg">Last name required</p>)} */}
            </div>
          </div>
          <div className="form__control">
            <input
              onClick={togglePassword}
              type={passwordShow ? "text" : "password"}
              name="password"
              placeholder="Password"
              {...register("password", {
                required: true,
                validate: {
                  checkLength: (value) => value.length >= 8,
                  // matchPattern: (value) =>
                  //   /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(value),
                },
              })}
            />
            {/* {errors.password?.type === "required" && (
              <p className="errorMsg">Password is required</p>
            )}
            {errors.password?.type === "checkLength" && (
              <p className="errorMsg">
                Password should be at least 8 characters
              </p>
            )} */}
            {/* {errors.password?.type === "matchPattern" && (
              <p className="errorMsg">
                Password should contain at least one uppercase letter, lowercase
                letter, digit, and special symbol
              </p>
            )} */}
          </div>
          <div className="form__control">
            <p>
              I agree to the{" "}
              <a
                href="https://www.evangadi.com/legal/privacy/"
                rel="noreferrer"
                target="_blank"
              >
                <i>privacy policy</i>
              </a>{" "}
              and{" "}
              <a
                href="https://www.evangadi.com/legal/terms/"
                rel="noreferrer"
                target="_blank"
              >
                <i>terms of services</i>
              </a>
            </p>
            <button className="bttn" type="submit">
              Agree and Join
            </button>
            <p>
              <Link to="/">Already have an account?</Link>
            </p>
          </div>
        </form>
      </div>

      <div className="signup__about">
        <p className="about">About</p>
        <h1>Evangadi Networks</h1>
        <p>
          No matter what stage of life you are in, whether you’re just starting
          elementary school or being promoted to CEO of a Fortune 500 company,
          you have much to offer to those who are trying to follow in your
          footsteps.{" "}
        </p>
        <p>
          Wheather you are willing to share your knowledge or you are just
          looking to meet mentors of your own, please start by joining the
          network here.
        </p>
        <a href="https://www.evangadi.com/explained/">
          <button>How it works</button>
        </a>
      </div>
    </div>
  );
};

export default SignUp;
