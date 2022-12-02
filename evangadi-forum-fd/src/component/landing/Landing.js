import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import './Landing.css'
import axios from 'axios'

const Land = () => {
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

  const onSubmit =async (e) => {
    // e.preventDefault();
    try {
      const loginRes= await axios.post('http://localhost:4000/api/users/login', {
        // ...register("email"),
        // ...register("password"),
        email: form.email,
        password: form.password,
        // userName: form.userName,
        // firstName: form.firstName,
        // lastName: form.lastName
      })
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user
      })
      localStorage.setItem('auth-token', loginRes.data.token);
      navigate('/');
      // console.log(...register);
    }catch(err){
      console.log('problem', err.response.data.msg);
      alert(err.response.data.msg);
    }
  };

  useEffect(() => {
    if(userData) navigate('/');

  }, [userData, navigate]);

  return (
    <div>
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
            <h2>Login to your account</h2>
          </div>
          <div>
            <p>
              Don’t have an account? <Link to="signup"> Create a new account</Link>
            </p>
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
              {errors.email?.type === "required" && (
                <p className="errorMsg">Email is required</p>
              )}
              {errors.email?.type === "pattern" && (
                <p className="errorMsg">Email is not valid</p>
              )}
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
              {errors.password?.type === "required" && (
                <p className="errorMsg">Password is required</p>
              )}
              {errors.password?.type === "checkLength" && (
                <p className="errorMsg">
                  Password should be at least 8 characters
                </p>
              )}
              {/* {errors.password?.type === "matchPattern" && (
              <p className="errorMsg">
                Password should contain at least one uppercase letter, lowercase
                letter, digit, and special symbol
              </p>
            )} */}
            </div>
            <div className="form__control">
              <button className="bttn" type="submit">
                Log in
              </button>
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
    </div>
  )
}

export default Land