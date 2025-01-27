import React, { useEffect, useState } from 'react';
import "../css_files/todos.css"

function Todos() {

  const [todos, setTodos] = useState([]); // רשימת ה-TODOS
  const [searchTerm, setSearchTerm] = useState(''); // מונח החיפוש
  const [searchCriteria, setSearchCriteria] = useState('id'); // קריטריון חיפוש
  const [sortCriteria, setSortCriteria] = useState('id'); // קריטריון מיון
  const [newTodoTitle, setNewTodoTitle] = useState(''); // כותרת הפריט החדש
  const userId=JSON.parse(localStorage.getItem("loggedInUser")).id;
  
  // טעינת ה-TODOS מהשרת 
  useEffect(() => {
    fetch('http://localhost:3000/todos')
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error('Error fetching todos:', error));
  }, []);

  
  // טיפול במיון
  const sortTodos = (todos) => {
    switch (sortCriteria) {
      case 'id':
        return [...todos].sort((a, b) => a.id - b.id);
      case 'title':
        return [...todos].sort((a, b) => a.title.localeCompare(b.title));
      case 'completed':
        return [...todos].sort((a, b) => a.completed - b.completed);
      case 'random':
        return [...todos].sort(() => Math.random() - 0.5);
      default:
        return todos;
    }
  };


  // סינון לפי קריטריון חיפוש
  const filteredTodos = todos.filter((todo) => {
    switch (searchCriteria) {
      case 'id':
        return todo.id.toString().includes(searchTerm);
      case 'title':
        return todo.title.toLowerCase().includes(searchTerm.toLowerCase());
      case 'completed':
        return (
          (searchTerm === 'true' && todo.completed) ||
          (searchTerm === 'false' && !todo.completed)
        );
      default:
        return true;
    }
  });

  // רשימת TODOS מסוננת וממוינת
  const displayedTodos = sortTodos(filteredTodos);

  // הוספת פריט חדש
  const addTodo = async () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")).id;
    
    if (!loggedInUser) {
      alert("No logged-in user found!");
      return;
    }
  
    if (!newTodoTitle.trim()) {
      alert("Please enter a valid title for the todo.");
      return;
    }
  
    try {
      // השגת רשימת todos כדי למצוא את ה-ID האחרון
      const response = await fetch("http://localhost:3000/todos");
      const todos = await response.json();
  
      // יצירת ID חדש על פי המספר האחרון
      const newId = todos.length > 0 
        ? Math.max(...todos.map(todo => parseInt(todo.id))) + 1 
        : 1;
  
      // יצירת אובייקט ה-todo החדש
      const newTodo = {
        userId: parseInt(loggedInUser), // המרת ID המשתמש למספר שלם
        id: newId.toString(),
        title: newTodoTitle,
        completed: false
      };
  
      // שמירה לשרת
      const saveResponse = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTodo)
      });
  
      if (saveResponse.ok) {
        // עדכון התצוגה בזמן אמת
        setTodos((prevTodos) => [...prevTodos, newTodo]);
        alert("Todo added successfully!");
        setNewTodoTitle(""); // איפוס שדה ההוספה
      } else {
        alert("Failed to add todo. Please try again.");
      }
    } catch (error) {
      console.error("Error adding todo:", error);
      alert("An error occurred while adding the todo.");
    }
  };
  

  // מחיקת פריט
  const deleteTodo = async (id) => {
    try {
      // שליחת בקשת DELETE לשרת
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE"
      });
  
      if (response.ok) {
        // עדכון התצוגה על ידי סינון המשימה שנמחקה
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        alert("Todo deleted successfully!");
      } else {
        alert("Failed to delete todo. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
      alert("An error occurred while deleting the todo.");
    }
  };
  
  // עדכון מצב ביצוע
  const toggleCompletion = async (id) => {
    // מציאת המשימה המתאימה
    const todoToUpdate = todos.find((todo) => todo.id === id);
  
    if (!todoToUpdate) {
      alert("Todo not found!");
      return;
    }
  
    const updatedCompletedStatus = !todoToUpdate.completed;
  
    try {
      // עדכון מצב הביצוע בשרת
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: updatedCompletedStatus }),
      });
  
      if (response.ok) {
        // עדכון התצוגה בזמן אמת
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, completed: updatedCompletedStatus } : todo
          )
        );
      } else {
        alert("Failed to update completion status on the server. Please try again.");
      }
    } catch (error) {
      console.error("Error updating completion status:", error);
      alert("An error occurred while updating the completion status.");
    }
  };
  

  // עדכון כותרת
  const updateTitle = async (id, newTitle) => {
    if (!newTitle.trim()) {
      alert("Please enter a valid title.");
      return;
    }
  
    try {
      // שליחת בקשת PATCH לשרת לעדכון הכותרת
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle }),
      });
  
      if (response.ok) {
        // עדכון התצוגה בזמן אמת
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, title: newTitle } : todo
          )
        );
        alert("Todo title updated successfully!");
      } else {
        alert("Failed to update title on the server. Please try again.");
      }
    } catch (error) {
      console.error("Error updating title:", error);
      alert("An error occurred while updating the title.");
    }
  };
  

  return (
    <div>
      <div className="todos-controls">
        <h2>Todos</h2>

        {/* חיפוש */}
        <div className="control-group">
          <label>Search: </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter search term"
          />
          <select onChange={(e) => setSearchCriteria(e.target.value)}>
            <option value="id">ID</option>
            <option value="title">Title</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* מיון */}
        <div className="control-group">
          <label>Sort By: </label>
          <select onChange={(e) => setSortCriteria(e.target.value)}>
            <option value="id">ID</option>
            <option value="title">Title</option>
            <option value="completed">Completed</option>
            <option value="random">Random</option>
          </select>
        </div>

        {/* הוספת פריט */}
        <div className="control-group">
          <label>New Todo: </label>
          <input
            type="text"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            placeholder="Enter new todo title"
          />
          <button onClick={addTodo}>Add</button>
        </div>
      </div>

      {/* רשימת TODOS */}
      <div className="todos-container">
        {displayedTodos.map((todo) => (
          <div key={todo.id} className="todo-item">
            <div className="todo-title">#{todo.id}: {todo.title}</div>
            <div className="todo-actions">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleCompletion(todo.id)}
              />
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              <button
                onClick={() => {
                  const newTitle = prompt('Enter new title:', todo.title);
                  if (newTitle) updateTitle(todo.id, newTitle);
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Todos;
