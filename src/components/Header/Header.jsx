import { Logo } from "components/logo";
import s from "./style.module.css";
import logoSrc from "assets/images/logo.png";

import { useNavigate } from "react-router-dom";
import { AuthAPI } from "api/auth";
import { setUser } from "store/auth/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export function Header(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.authSlice.auth.user);

  const signout = () => {
    AuthAPI.signout();
    dispatch(setUser(null));
  };

  const renderAuthProfil = () => {
    return (
      <div>
        <img
          src={`https://api.dicebear.com/5.x/bottts/svg?seed=${user.email}`}
          style={{ width: 40 }}
          className="rounded-circle"
          alt="avatar"
        />
        <div>Welcome, {user.email} </div>
        <Link to="#" onClick={signout}>
          Signout
        </Link>
      </div>
    );
  };
  return (
    <div className={`row ${s.container}`}>
      <div className="col-xs-12 col-sm-4">
        <Logo
          onClick={() => navigate("/")}
          title={"WriteIt"}
          subtitle={"Save your notes"}
          image={logoSrc}
        />
      </div>
      <div className="col-xs-12 col-sm-8 text-end"> {renderAuthProfil()} </div>
    </div>
  );
}
