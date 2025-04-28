import { useEffect, useRef, useState } from "react";
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
  const [saveIsLoading, setSaveIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const titleRef = useRef();
  const descriptionRef = useRef();
  const timeRef = useRef();

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

  const handleSaveClick = async () => {
    setSaveIsLoading(true);
    const newErrors = [];
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const time = timeRef.current.value;

    if (!task.title.trim()) {
      newErrors.push({
        inputName: "title",
        message: "O titulo é obrigatório.",
      });
    }

    if (!task.time.trim()) {
      newErrors.push({
        inputName: "time",
        message: "O horário é obrigatório.",
      });
    }

    if (!task.description.trim()) {
      newErrors.push({
        inputName: "description",
        message: "A descrição é obrigatória.",
      });
    }

    setErrors(newErrors);

    if (newErrors.length > 0) {
      return setSaveIsLoading(false);
    }

    setSaveIsLoading(true);
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title,
        description,
        time,
      }),
    });

    if (!response.ok) {
      return setSaveIsLoading(false);
    }
    const newTask = await response.json();
    setTask(newTask);
    toast.success("Tarefa salva com sucesso!.");
    setSaveIsLoading(false);
  };

  const titleError = errors.find((error) => error.inputName === "title");
  const timeError = errors.find((error) => error.inputName === "time");
  const descriptionError = errors.find(
    (error) => error.inputName === "description"
  );

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
          <Button className="h-fit self-end" color="danger">
            <TrashIcon />
            Deletar Tarefas
          </Button>
        </div>

        {/* Dados da Tarefa */}
        <div className="mt-6 space-y-6 rounded-xl bg-brand-white p-6">
          <div>
            <Input
              error={titleError}
              id="title"
              label="Título"
              defaultValue={task?.title}
              ref={titleRef}
            />
          </div>

          <div>
            <TimeSelect
              error={timeError}
              defaultValue={task?.time}
              ref={timeRef}
            />
          </div>

          <div>
            <Input
              error={descriptionError}
              id="description"
              label="Descrição"
              defaultValue={task?.description}
              ref={descriptionRef}
            />
          </div>
        </div>

        <div className="flex w-full justify-end gap-3">
          <Button
            disabled={saveIsLoading}
            onClick={handleSaveClick}
            size="large"
            color="primary"
          >
            {saveIsLoading && <LoaderIcon className="mr-2 animate-spin" />}
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
