import { ButtonPrimary } from "components/ButtonPrimary/ButtonPrimary";
import { Input } from "components/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import s from "./style.module.css";
import { AuthLayout } from "layouts/AuthLayout";
import { useState } from "react";
import { AuthAPI } from "api/auth";
import { setUser } from "store/auth/auth-slice";
import { useDispatch } from "react-redux";
import { toast } from "utils/sweet-alert";

export function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const user = await AuthAPI.signin(email, password)

  const submit = async (e) => {
    e.preventDefault();
    try {
      console.log("submited ", email, password);
      const user = await AuthAPI.signin(email, password);
      dispatch(setUser(user));
      await toast("success", "Auth succeed");
      navigate("/");
    } catch (err) {
      toast("error", err.message);
    }
  };
  console.log(email, password);
  const form = (
    <div className={s.formContainer}>
      <h2 className={s.title}>
        Sign in <br />
        to access your notes
      </h2>
      <form onSubmit={submit} className={s.formGroup}>
        <Input placeholder={"Email"} onTextChange={setEmail} />
        <Input
          placeholder={"Password"}
          type="password"
          onTextChange={setPassword}
        />
        <ButtonPrimary type="submit" className={s.button}>
          Sign in!
        </ButtonPrimary>
        <span>
          Don't have an account yet ? <Link to="/signup">Signup</Link>
        </span>
      </form>
    </div>
  );
  return <AuthLayout>{form}</AuthLayout>;
}
