import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-center align-items-center flex-column-reverse flex-lg-row">
      <div
        className="text-left d-flex flex-column gap-3 w-100 w-lg-50"
        style={{ marginTop: "12em" }}
      >
        <h2>Organize your work and life, finally.</h2>
        <h4>
          Welcome to My To-Do List! Here, you can organize your tasks, set
          priorities, and stay on top of your daily goals. Whether it’s
          work-related, personal, or a mix of both, we’ve got you covered. Let’s
          make productivity a breeze!
        </h4>
        <div className="d-flex gap-5">
          <div>
            <button
              className="btn btn-primary"
              onClick={() => {
                navigate("/register");
              }}
            >
              Sign up
            </button>
          </div>
          <div>
            <button
              className="btn btn-secondary"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
      <div>
        <img
          src="https://i.pinimg.com/originals/31/36/cd/3136cd447c99783f59cd1a4c7d9ca9c1.png"
          className="w-100"
        />
      </div>
    </div>
  );
}
