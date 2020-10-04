import React from "react";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import Landing from "./Landing";
import Header from "./Header";
import { BrowserRouter, Switch, Route } from "react-router-dom";

export default function Home({
  name,
  email,
  password,
  handleChange,
  googleSignIn,
  signIn,
  signUp,
  role,
}) {
  return (
    <div>
      <BrowserRouter>
        <Header />

        <Switch>
          <Route path="/" exact component={Landing} />

          <Route
            path="/signup"
            exact
            render={() => (
              <SignUp
                name={name}
                email={email}
                role={role}
                password={password}
                handleChange={handleChange}
                signUp={signUp}
              />
            )}
          />

          <Route
            path="/signin"
            exact
            render={() => (
              <SignIn
                email={email}
                password={password}
                handleChange={handleChange}
                signIn={signIn}
                googleSignIn={googleSignIn}
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
