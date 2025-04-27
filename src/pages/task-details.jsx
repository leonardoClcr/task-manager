import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ArrowLeftIcon, ChevronRightIcon, TrashIcon } from "../assets/icons";
import Button from "../components/Button";
import Sidebar from "../components/Sidebar";

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState();
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fecthTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      });
      const data = await response.json();
      setTask(data);
    };

    fecthTask();
  }, [taskId]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full px-8 py-16">
        {/* Barra do topo */}
        <div className="flex w-full justify-between">
          {/* Parte da Esquerda */}
          <div>
            <button
              onClick={handleBackClick}
              className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary"
            >
              <ArrowLeftIcon />
            </button>
            <div className="flex items-center gap-1 text-xs">
              <span className="text-brand-text-gray">Minhas Tarefas</span>
              <ChevronRightIcon className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>
            <h1 className="mt-1 text-xl font-semibold">{task?.title}</h1>
          </div>
          {/* Parte da Direita */}
          <Button className="h-fit self-end" color="danger">
            <TrashIcon />
            Deletar Tarefas
          </Button>
        </div>

        {/* Dados da Tarefa */}
        <div className="rounded-xl bg-brand-white p-6"></div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
