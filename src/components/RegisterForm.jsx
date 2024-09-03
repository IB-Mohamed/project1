import { useFormik } from "formik";
import { object, string } from "yup";
import { userService } from "../services/userService.js";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const navigate = useNavigate();
  const handleOnSubmit = async (values) => {
    try {
      await userService.registerUser(values);
      navigate("/todos");
    } catch (error) {
      console.error(error);
    }
  };

  const formSchema = object().shape({
    email: string()
      .email("Field must be an email")
      .matches(/^[^@]+@[^@]+\.[^@]+$/, "Field should match a valid email")
      .required("Email is a required field"),

    password: string()
      .min(6, "Password should be at least 6 characters long")
      .required("Password is a required field"),
  });

  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: { email: "", password: "" },
      onSubmit: handleOnSubmit,
      validationSchema: formSchema,
    });

  return (
    <div className="w-50 mx-auto">
      <form
        className="d-flex gap-3 justify-content-center align-items-center flex-column"
        onSubmit={handleSubmit}
      >
        <div className="w-100">
          <label className="form-label" htmlFor="email">
            Email:
          </label>
          <input
            className="form-control"
            type="email"
            name="email"
            id="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />

          {touched.email && errors.email && (
            <p className="text-danger">{errors.email}</p>
          )}
        </div>

        <div className="w-100">
          <label className="form-label" htmlFor="password">
            Password:
          </label>
          <input
            className="form-control "
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {touched.password && errors.password && (
            <p className="text-danger">{errors.password}</p>
          )}
        </div>
        <button className="btn btn-primary w-100" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}
