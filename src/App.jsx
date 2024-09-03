import Navbar from "./components/Navbar";
import Todos from "./Pages/Todos";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./Pages/Home";
import NotFound from "./components/NotFound";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

export default function App() {
  const Layout = () => (
    <div className="container">
      <Navbar />
      <Outlet />
    </div>
  );

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" Component={Layout}>
        <Route
          path="/todos"
          element={
            <PrivateRoute>
              <Todos/>
            </PrivateRoute>
          }
        />
        <Route path="/" Component={Home} />

        <Route path="/login"  element={
            <PublicRoute>
              <Login/>
            </PublicRoute>
          } />

        <Route path="/register" element={
            <PublicRoute>
              <Register/>
            </PublicRoute>
          } /> 

        <Route path="*" Component={NotFound} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
