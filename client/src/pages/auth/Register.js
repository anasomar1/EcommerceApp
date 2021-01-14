import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const Register = ({ history }) => {
  const [email, setEmail] = useState("");
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]);
  const submitHandler = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    try {
      await auth.sendSignInLinkToEmail(email, config);
      toast.success(
        `An activation link has been sent to ${email}, click on the link to complete your registration`
      );
      //Save email in local storage
      window.localStorage.setItem("emailForRegistration", email);
      //clear state
      setEmail("");
    } catch (error) {
      toast.error("An error has occured, please try again");
    }
  };
  const registerForm = () => (
    <form onSubmit={submitHandler}>
      <input
        type="email"
        className="form-control"
        value={email}
        autoFocus
        placeholder="Your email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" className="btn btn-raised mt-4">
        Register
      </button>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
