import { useEffect, useState } from "react";
import { todoService } from "../services/todoService";
import * as yup from "yup";
import { useFormik } from "formik";
import Todo from "../components/Todo";
import { toast } from "react-toastify";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [totalItems, setTotalItems] = useState(todos.length);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 3;
  const totalPages = Math.ceil(totalItems / pageSize);

  useEffect(() => {
    const applyFilter = (todos) => {
      switch (filter) {
        case "completed":
          return todos.filter((todo) => todo.status);
        case "pending":
          return todos.filter((todo) => !todo.status);
        case "all":
        default:
          return todos;
      }
    };

    const applySort = (todos) => {
      switch (sort) {
        case "dueDate":
          return [...todos].sort((a, b) => (a.dueDate > b.dueDate ? 1 : -1));
        case "priority": {
          const priorityMap = {
            high: 3,
            medium: 2,
            low: 1,
          };
          return [...todos].sort(
            (a, b) => priorityMap[b.priority] - priorityMap[a.priority]
          );
        }
        case "all":
        default:
          return todos;
      }
    };

    const applyPagination = (todos) => {
      const startIndex = (page - 1) * pageSize;
      return todos.slice(startIndex, startIndex + pageSize);
    };

    let newTodos = applyFilter(todos);
    newTodos = applySort(newTodos);
    setTotalItems(newTodos.length);
    newTodos = applyPagination(newTodos);
    console.log(newTodos);

    setFilteredTodos(newTodos);
  }, [todos, filter, sort, page, pageSize]);

  const onFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const onSortChange = (newSort) => {
    setSort(newSort);
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const newTodos = await todoService.createTodo(values);
      formik.resetForm();

      setTodos(newTodos);
      toast.success("Saved todo");
    } catch (error) {
      console.error(error);
      toast.error("Error happened in creating todo");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const newTodos = await todoService.deleteTodo(id);
      setTodos(newTodos);
      toast.success("Deleted todo");
    } catch (error) {
      console.error(error);
      toast.error("Error happened in deleting todo");
    } finally {
      setLoading(false);
    }
  };

  const handleMark = async (id) => {
    try {
      setLoading(true);
      const newTodos = await todoService.markTodo(id);
      setTodos(newTodos);
    } catch (error) {
      console.error(error);
      toast.error("Error happened in marking todo");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = (todo) => {
    formik.setValues(todo);
  };

  const todoSchema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    dueDate: yup.date().required(),
    priority: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      description: "",
      priority: "low",
      dueDate: "",
    },
    validationSchema: todoSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await todoService.getTodos();
        setTodos(data);
        toast.success("Loaded todos");
      } catch (error) {
        console.error(error);
        toast.error("Error happened while loading todos");
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return (
    <div className="d-flex flex-column gap-2">
      {loading && <p>Loading</p>}
      {!loading && (
        <>
          <div className="d-flex flex-column flex-lg-row gap-5">
            <div className="form-control w-100 w-lg-25 d-flex flex-column align-items-center">
              <label
                htmlFor="name"
                style={{ marginTop: "1em", marginBottom: "0.5em" }}
              >
                Sort
              </label>
              <select
                style={{ width: "15em" }}
                className="form-select"
                onChange={(e) => onSortChange(e.target.value)}
              >
                <option value="all">All</option>
                <option value="dueDate">Due date</option>
                <option value="priority">Priority</option>
              </select>
              <label
                htmlFor="name"
                style={{ marginTop: "1em", marginBottom: "0.5em" }}
              >
                Filter
              </label>
              <select
                style={{ width: "15em" }}
                className="form-select"
                onChange={(e) => onFilterChange(e.target.value)}
              >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            <form
              onSubmit={formik.handleSubmit}
              className="d-flex flex-column align-items-lg-center gap-2 form-control w-100 w-lg-75"
            >
              <div className="d-flex align-items-center w-lg-50 gap-3">
                <label htmlFor="name" style={{ paddingRight: "2.5em" }}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  style={{ width: "23em" }}
                  className="form-control"
                />
              </div>
              <div className="d-flex align-items-center w-lg-50 gap-3">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  style={{ width: "23em" }}
                  className="form-control"
                />
              </div>
              <div className="d-flex align-items-center w-lg-50 gap-3">
                <label htmlFor="dueDate" style={{ paddingRight: "3em" }}>
                  Date
                </label>
                <input
                  type="date"
                  name="dueDate"
                  id="dueDate"
                  value={formik.values.dueDate}
                  onChange={formik.handleChange}
                  style={{ width: "23em" }}
                  className="form-control"
                />
              </div>
              <div className="d-flex align-items-center w-lg-50 gap-3">
                <label htmlFor="priority" style={{ paddingRight: "2em" }}>
                  Priority
                </label>
                <select
                  name="priority"
                  value={formik.values.priority}
                  onChange={formik.handleChange}
                  style={{ width: "23em" }}
                  className="form-select"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <button
                type="submit"
                className="btn btn-primary w-25 m-auto text-center "
              >
                Save
              </button>
            </form>
          </div>
          <div className="d-flex flex-column gap-4">
            {filteredTodos.map((todo) => (
              <Todo
                key={todo.id}
                handleDelete={handleDelete}
                handleMark={handleMark}
                handleUpdate={handleUpdate}
                todo={todo}
              />
            ))}
          </div>

          <ul className="d-flex justify-content-center align-items-center mb-5 mt-5 pagination">
            <li className={`page-item ${page === 1 && "disabled"}`}>
              <button
                className="page-link"
                onClick={() => setPage((p) => p - 1)}
              >
                Prev
              </button>
            </li>
            <li className="page-item">
              <span className="page-link">{page}</span>
            </li>

            <li className={`page-item ${page === totalPages && "disabled"}`}>
              <button
                className="page-link"
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </>
      )}
    </div>
  );
}
