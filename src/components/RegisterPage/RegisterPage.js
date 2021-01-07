import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import firebase from "../../firebase";
import md5 from "md5";
import { Link } from "react-router-dom";

// name이 핵심
// watch로 input을 관찰
// errors로 에러를 확인

const RegisterPage = () => {
  const { register, handleSubmit, watch, errors } = useForm({
    mode: "onChange",
  });
  const password = useRef("");
  password.current = watch("password");

  const [loading, setLoading] = useState(false);
  const [errorFromSubmit, setErrorFromSubmit] = useState("");
  const history = useHistory();
  const onSubmit = async (data) => {
    const { email, name, password } = data;

    try {
      setLoading(true);
      let createUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      await createUser.user.updateProfile({
        displayName: name,
        photoURL: `http://gravatar.com/avatar/${md5(email)}?d=identicon`,
        // md5로 유니크한 값을 생성
      });
      await firebase.database().ref("users").child(createUser.user.uid).set({
        name: createUser.user.displayName,
        image: createUser.user.photoURL,
      });

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
        <h3>Register</h3>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          name="email"
          type="email"
          ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <p>This Email field is required</p>}
        <label>Name</label>
        <input
          name="name"
          type="text"
          ref={register({ required: true, maxLength: 10 })}
        />
        {errors.name && errors.name.type === "required" && (
          <p>This Email field is required</p>
        )}
        {errors.name && errors.name.type === "maxLength" && (
          <p>이름은 10자이하로 입력해주세요</p>
        )}
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
        <label>Password Confirm</label>
        <input
          name="password_confirm"
          type="password"
          ref={register({
            required: true,
            validate: (value) => value === password.current,
          })}
        />
        {errors.password_confirm &&
          errors.password_confirm.type === "required" && <p>입력해주세요.</p>}
        {errors.password_confirm &&
          errors.password_confirm.type === "validate" && (
            <p>패스워드와 다른 값이 입력되었습니다.</p>
          )}
        {errorFromSubmit && <p>{errorFromSubmit}</p>}
        <input type="submit" disabled={loading} />
        <Link
          to="/login"
          style={{
            color: "gray",
            textDecoration: "none",
          }}
        >
          이미 아이디가 있다면...
        </Link>
      </form>
    </div>
  );
};

export default RegisterPage;
