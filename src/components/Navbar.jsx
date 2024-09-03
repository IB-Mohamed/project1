import { userService } from "../services/userService";
import NavBarLink from "./NavBarLink";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const isAuth = userService.auth();
  const navigate = useNavigate();
  const handleLogout = () => {
    userService.logout();
    navigate("/");
  };
  return (
    <nav
      className="navbar user-select-none w-100 p-3"
      style={{ marginBottom: "3em" }}
    >
      <div className="mr-auto">
        <NavBarLink to="/" text="Home" />
      </div>
      {isAuth ? (
        <>
          <NavBarLink to="/todos" text="Todos" />
          <button onClick={handleLogout} className={"navbar-brand mb-0 h1 btn btn-primary text-white"}>
            Logout
          </button>
        </>
      ) : (
        <>
          <NavBarLink to="/login" text="Login" />
          <NavBarLink to="/register" text="Register" />
        </>
      )}
    </nav>
  );
}
