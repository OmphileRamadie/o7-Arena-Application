import React from "react";
import people2 from "../images/people2.jpg";
import google from "../images/googleIcon.png";

export default function SignIn({
  email,
  password,
  handleChange,
  signIn,
  googleSignIn,
}) {
  return (
    <div className="">
      <h1 className="signInHeading">Sign In</h1>
      <div className="signIn">
        <img src={people2} alt="people" className="people" />
        <div className="signInContainer">
          <form>
            <div className="credentials">
              <input
                type="text"
                name="email"
                placeholder=" Email"
                value={email}
                onChange={handleChange}
              />
            </div>

            <div className="credentials">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
              />
            </div>

            <div>
              <div className="submitBtn">
                <button className="signInBtn" onClick={signIn}>
                  Sign in
                </button>
              </div>
              <p>OR</p>
              <button className="googleSignIn" onClick={googleSignIn}>
                <img src={google} alt="people" className="googleIcon" />
                <span>Sign In With Google</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
