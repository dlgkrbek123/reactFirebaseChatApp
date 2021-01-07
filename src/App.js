import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Switch, Route, Link } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import ChatPage from "./components/ChatPage/ChatPage";
import firebase from "./firebase";
import { setUser } from "./redux/actions/user";

const App = () => {
  const isLoading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();
  const history = useHistory(); // Router의 하위 컴포넌트에서 사용가능

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(user));
        history.push("/");
      } else {
        dispatch(setUser(null));
        history.push("/login");
      }
    });
  }, []);

  return isLoading ? (
    <div>loading...</div>
  ) : (
    <div className="App">
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/" component={ChatPage} />
      </Switch>
    </div>
  );
};

export default App;
