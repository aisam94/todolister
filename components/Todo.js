const Todo = () => {
  return (
    <div class="todo-container">
      <h1 id="todo-title">Todo List</h1>
      <form id="todo-form">
        <input
          autofocus
          type="text"
          aria-label="Enter new item"
          placeholder="Enter new item here..."
          id="todo-input"
        />
      </form>
      <ul id="todo-list"></ul>
    </div>
  );
};

export default Todo;
