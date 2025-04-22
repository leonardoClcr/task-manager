import { useState } from "react";
import { toast } from "sonner";

import {
  AddIcon,
  CloudSunIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from "../assets/icons/index";
import taskData from "../constants/tasks";
import AddTaskDialog from "./AddTaskDialog";
import Button from "./Button";
import TaskItem from "./TaskItem";
import TaskSeparator from "./TaskSeparator";

const Tasks = () => {
  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false);

  const [tasks, setTasks] = useState(taskData);

  const morningTasks = tasks.filter((task) => {
    return task.time === "morning";
  });

  const afternoonTasks = tasks.filter((task) => {
    return task.time === "afternoon";
  });

  const eveningTasks = tasks.filter((task) => {
    return task.time === "evening";
  });

  const handleDialogClose = () => {
    setAddTaskDialogIsOpen(false);
  };

  const handleTaskDeleteClick = (taskId) => {
    const newTasks = tasks.filter((task) => task.id != taskId);
    setTasks(newTasks);
    toast.success("Tarefa removida com sucesso");
  };

  const handleTaskCheckboxClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id != taskId) {
        return task;
      }

      if (task.status === "not_started") {
        return { ...task, status: "in_progress" };
      }

      if (task.status === "in_progress") {
        return { ...task, status: "done" };
      }

      if (task.status === "done") {
        return { ...task, status: "not_started" };
      }

      return tasks;
    });

    setTasks(newTasks);
  };

  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
    toast.success("Tarefa adicionada com sucesso");
  };

  return (
    <div className="w-full px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-brand-primary">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost">
            Limpar tarefas
            <TrashIcon />
          </Button>
          <Button onClick={() => setAddTaskDialogIsOpen(true)}>
            <AddIcon />
            Nova tarefa
          </Button>

          <AddTaskDialog
            isOpen={addTaskDialogIsOpen}
            handleClose={handleDialogClose}
            handleAddTask={handleAddTask}
          />
        </div>
      </div>

      <div className="rouded-xl bg-white p-6">
        <div className="space-y-3">
          <TaskSeparator title="Manhã" icon={<SunIcon />} />
          {morningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TaskSeparator title="Tarde" icon={<CloudSunIcon />} />
          {afternoonTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TaskSeparator title="Noite" icon={<MoonIcon />} />
          {eveningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskCheckboxClick={handleTaskCheckboxClick}
              handleDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
