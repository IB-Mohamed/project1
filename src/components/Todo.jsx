export default function Todo({ todo, handleDelete, handleMark, handleUpdate }) {
  return (
    <div className="container border w-100 w-lg-50 rounded p-4 d-grid gap-1">
      <h1>{todo.name}</h1>
      <p className="text-secondary">{todo.description}</p>
      <h5
        className={
          todo.priority === "low"
            ? "text-success"
            : todo.priority === "medium"
            ? "text-warning"
            : "text-danger"
        }
      >
        {todo.priority}
      </h5>
      <h6>{todo.dueDate}</h6>

      <div className="d-flex gap-2">
        <button className={`btn ${todo.status ? "btn-primary" : "btn-dark"}`} onClick={() => handleMark(todo.id)}>
          {todo.status ? "Unmark" : "Mark"}
        </button>
        <button
          className="btn btn-danger"
          onClick={() => handleDelete(todo.id)}
        >
          Delete
        </button>
        <button className="btn btn-info" onClick={() => handleUpdate(todo)}>
          Edit
        </button>
      </div>
    </div>
  );
}
