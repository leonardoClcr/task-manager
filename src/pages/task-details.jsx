import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LoaderIcon,
  TrashIcon,
} from "../assets/icons";
import Button from "../components/Button";
import Input from "../components/Input";
import Sidebar from "../components/Sidebar";
import TimeSelect from "../components/TimeSelect";

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: task?.title,
      description: task?.description,
      time: task?.time,
    },
  });

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
      reset(data);
    };

    fecthTask();
  }, [taskId, reset]);

  const handleSaveClick = async (data) => {
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return toast.error("Ocorreu um erro ao salvar a tarefa");
    }
    const newTask = await response.json();
    setTask(newTask);
    toast.success("Tarefa salva com sucesso!");
    navigate(-1);
  };

  const handleDeleteClick = async () => {
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      return toast.error("Ocorreu um erro ao deletar a tarefa!.");
    }
    toast.success("Tarefa deletada com sucesso!");
    navigate(-1);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        {/* Barra do topo */}
        <div className="flex w-full justify-between">
          {/* Parte da Esquerda */}
          <div>
            <button
              onClick={handleBackClick}
              className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary"
            >
              <ArrowLeftIcon />
            </button>
            <div className="flex items-center gap-1 text-xs">
              <Link to={"/"} className="text-brand-text-gray">
                Minhas Tarefas
              </Link>
              <ChevronRightIcon className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>
            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>
          {/* Parte da Direita */}
          <Button
            onClick={handleDeleteClick}
            className="h-fit self-end"
            color="danger"
          >
            <TrashIcon />
            Deletar Tarefas
          </Button>
        </div>

        {/* Dados da Tarefa */}
        <form onSubmit={handleSubmit(handleSaveClick)}>
          <div className="mt-6 space-y-6 rounded-xl bg-brand-white p-6">
            <div>
              <Input
                id="title"
                label="Título"
                {...register("title", {
                  required: "O Título é obrigatório!",
                  validate: (value) => {
                    if (!value.trim()) {
                      return "O título não pode ser vazio";
                    }
                    return true;
                  },
                })}
                errorMessage={errors?.title?.message}
              />
            </div>

            <div>
              <TimeSelect
                {...register("time", {
                  required: "O Horário é obrigatório!",
                })}
                errorMessage={errors?.time?.message}
              />
            </div>

            <div>
              <Input
                id="description"
                label="Descrição"
                {...register("description", {
                  required: "A descrição é obrigatória!",
                })}
                errorMessage={errors?.description?.message}
              />
            </div>
          </div>
          {/* Botão de salvar */}
          <div className="flex w-full justify-end gap-3">
            <Button
              disabled={isSubmitting}
              type="submit"
              size="large"
              color="primary"
            >
              {isSubmitting && <LoaderIcon className="mr-2 animate-spin" />}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
