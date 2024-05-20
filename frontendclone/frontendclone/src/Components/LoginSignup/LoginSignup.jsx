import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import './LoginSignup.css'
import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon_lock from '../Assets/password.png'
import password_icon_open from '../Assets/lock_open.png'
import google_icon from '../Assets/Google.png'; // Import Google icon image
import axios from 'axios';
import CreateSongForm from "../SongForm/songceateform";



const LoginSignup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [action, setAction] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (inputEmail) => {
    // Regular expression for a valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(inputEmail);
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsEmailValid(validateEmail(newEmail));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const toggleAction = () => {
    setAction(action === 'Login' ? 'Sign Up' : 'Login');
  }


  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    if (!isEmailValid) {
      alert("Invalid email address. Please enter a valid email.");
      return;
    }
    if (action === 'Login') {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/loginRequest`, {
          email: email,
          password: password,
        });

        if (response.data.message) {
          //console.log(response.data);
          alert("Login successful!");
          let userEmail=response.data.email;
          //console.log(userEmail);
          localStorage.setItem('userEmail', userEmail);
          navigate(`/Dashboard`);
        } else {
          alert(response.data.error);
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred. Please try again later.");
      }
    } else if (action === 'Sign Up') {
      try {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/registerRequest`, {
          name: name,
          email: email,
          password: password,
        });
        if (response.data.message) {
          alert("Registration successful!");
          let userEmail=response.data.email;
          //console.log(userEmail);
          localStorage.setItem('userEmail', userEmail);
          navigate(`/UserProfileForm}`);
        } else {
          alert(response.data.error);
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred. Please try again later.");
      }
    }
  };

  const handleGoogleAuth = () => {

  };





  return (
    <div className="container">

      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      <form>
        <div className="inputs">
          {action === "Login" ? <div></div> : <div className="input">
            <img src={user_icon} alt="" />
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>}



          {/* email */}

          <div className="input">
            <img src={email_icon} alt="" />
            <input
              type="email"
              placeholder="Email Id"
              required
              value={email}
              onChange={handleEmailChange}
              pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
            />
            {!isEmailValid && (
              <div className="error-message">Please enter a valid email❗</div>
            )}

          </div>

          {/* password */}

          <div className="input">
            <img src={showPassword ? password_icon_open : password_icon_lock} alt="lock_close"
              onClick={toggleShowPassword}
              id="lockIcon"
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
        </div>



        <div className="submit-container">
          <div className={action === "Login" ? "submit beige" : "submit"}
            onClick={() => {
              if (action === "Sign Up") {
                if (!password || !name) {
                  alert("Please enter a password and name.");
                } else {
                  handleSubmit();
                }
              }
              else {
                setAction("Sign Up")
              }
            }}>Sign Up</div>
          <div className={action === "Sign Up" ? "submit beige" : "submit"
          }
            onClick={() => {
              if (action === "Login") {
                if (!password) {
                  alert("Please enter a password.");
                } else {
                  handleSubmit();
                }

              } else {
                setAction("Login")
              }
            }}>Login</div>
        </div>
      </form>
      {/* Google Authentication Button */}
      <div className="google-auth-button" onClick={handleGoogleAuth}>
        <img src={google_icon} alt="Google" />
        Sign in with Google
      </div>
    </div>
  );
};

export default LoginSignup;