import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (!newTaskTitle) return; // caso o titulo esteja vazio, a function será interrompida

    // cria uma nova task
    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      isComplete: false,
    };

    setTasks((oldState) => [...oldState, newTask]); // adiciona a nova task mantendo as tasks antigas

    setNewTaskTitle(""); // reseta o conteúdo do input
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    // Percorre todo o array de tasks
    const completeTask = tasks.map(
      (task) =>
        task.id === id
          ? {
              ...task, // espalha todos os dados já contidos na task
              isComplete: !task.isComplete, // muda o valor do isComplete entre true e false
            }
          : task // caso o id for diferente retorna a task sem alteração
    );

    setTasks(completeTask); // atualiza o array de tasks
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    // Filtra todo o array de tasks para retornar um novo array sem os dados referente ao id da task deletada
    const filteredTasks = tasks.filter((task) => task.id !== id);

    setTasks(filteredTasks); // atualiza o array de tasks
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
