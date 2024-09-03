import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="d-flex gap-4 justify-content-center align-items-center">
      <h3>Page not found, instead: </h3>
      <button onClick={() => navigate("/")} className="btn btn-warning">
        Go Home
      </button>
    </div>
  );
}
