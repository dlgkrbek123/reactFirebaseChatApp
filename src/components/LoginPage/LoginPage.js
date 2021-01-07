import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import firebase from "../../firebase";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { register, handleSubmit, watch, errors } = useForm({
    mode: "onChange",
  });
  const [loading, setLoading] = useState(false);
  const [errorFromSubmit, setErrorFromSubmit] = useState("");
  const history = useHistory();

  const onSubmit = async ({ email, password }) => {
    try {
      setLoading(true);
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setLoading(false);
      history.push("/login");
    } catch (err) {
      setErrorFromSubmit(err.message);
      setLoading(false);
      setTimeout(() => setErrorFromSubmit(""), 5000);
    }
  };

  return (
    <div className="auth-wrapper">
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h3>Login</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          name="email"
          type="email"
          ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <p>This Email field is required</p>}
        <label>Password</label>
        <input
          name="password"
          type="password"
          ref={register({
            required: true,
            minLength: 6,
          })}
        />
        {errors.password && errors.password.type === "required" && (
          <p>패스워드를 입력해주세요</p>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <p>패스워드는 최소 6자이상입력해주세요.</p>
        )}
        {errorFromSubmit && <p>{errorFromSubmit}</p>}
        <input type="submit" disabled={loading} />
        <Link
          to="/register"
          style={{
            color: "gray",
            textDecoration: "none",
          }}
        >
          아직 아이디가 없다면...
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
