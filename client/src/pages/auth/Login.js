import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]);

  let dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });
      history.push("/");
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  const googleLoginHandler = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        });
        history.push("/");
      })
      .catch((err) => toast.error(err.message));
  };
  const loginForm = () => (
    <form onSubmit={submitHandler}>
      <div className="form-group">
        <input
          type="email"
          className="form-control p-2"
          value={email}
          autoFocus
          placeholder="Your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control mt-4 p-2"
          value={password}
          autoFocus
          placeholder="Your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button
        onClick={submitHandler}
        type="primary"
        className="mb-3"
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
      >
        Login with Email
      </Button>
      <Button
        onClick={googleLoginHandler}
        type="danger"
        block
        shape="round"
        icon={<GoogleOutlined />}
        size="large"
      >
        Login with Google
      </Button>

      <Link to="/forgot/password" className="mt-3 float-right text-danger">
        Forgot Password?
      </Link>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {isLoading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Login</h4>
          )}
          {loginForm()}
        </div>
      </div>
    </div>
  );
};

export default Login;
