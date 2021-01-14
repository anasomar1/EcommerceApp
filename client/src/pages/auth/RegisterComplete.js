import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, []);
  const submitHandler = async (e) => {
    e.preventDefault();

    // validation

    if (!email || !password) {
      toast.error("Please enter your email and password.");
      return;
    }
    if (password.length < 6) {
      toast.error("Your password must be at least 6 characters long.");
      return;
    }
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        // remove user email from the local storage
        window.localStorage.removeItem("emailForRegistration");
        //get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        // redux store
        console.log("user", user, "idTokenResult", idTokenResult);
        // redirect the user
        history.push("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const completeRegistrationForm = () => (
    <form onSubmit={submitHandler}>
      <input
        type="email"
        className="form-control mt-4"
        value={email}
        disabled
      />
      <input
        type="password"
        className="form-control mt-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
        placeholder="Enter your password..."
      />
      <button type="submit" className="btn btn-raised mt-4">
        Complete Registration
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register Completion</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
