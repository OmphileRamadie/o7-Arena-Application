import React from "react";
import people1 from "../images/people1.jpg";

export default function SignUp({
  name,
  email,
  password,
  handleChange,
  signUp,
}) {
  return (
    <div className="">
      <h1 className="signUpHeading">Sign Up</h1>
      <div className="signUp">
        <img src={people1} alt="people" className="people" />

        <div className="signUpContainer">
          <form>
            <div className="credentials">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={handleChange}
              />
            </div>

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
            <div className="submitBtn">
              <button className="" onClick={signUp}>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
