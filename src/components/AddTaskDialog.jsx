import "./AddTaskDialog.css";

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import { toast } from "sonner";
import { v4 } from "uuid";

import { LoaderIcon, TrashIcon } from "../assets/icons";
import Button from "./Button";
import Input from "./Input";
import TimeSelect from "./TimeSelect";

const AddTaskDialog = ({ isOpen, handleClose, onSubmitSuccess }) => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("morning");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const nodeRef = useRef();
  const titleRef = useRef();

  useEffect(() => {
    if (!isOpen) {
      setTitle("");
      setDescription("");
    }
  }, [isOpen]);

  const handleSaveClick = async () => {
    const newErrors = [];

    if (!title.trim()) {
      newErrors.push({
        inputName: "title",
        message: "O titulo é obrigatório.",
      });
    }

    if (!time.trim()) {
      newErrors.push({
        inputName: "time",
        message: "O horário é obrigatório.",
      });
    }

    if (!description.trim()) {
      newErrors.push({
        inputName: "description",
        message: "A descrição é obrigatória.",
      });
    }

    setErrors(newErrors);

    if (newErrors.length > 0) {
      return;
    }

    const task = { id: v4(), title, time, description, status: "not_started" };
    setIsLoading(true);
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      setIsLoading(false);
      return toast.error(
        "Erro ao adicionar a tarefa. Por favor tenta novamente."
      );
    }

    onSubmitSuccess(task);
    setIsLoading(false);

    handleClose();
  };

  const titleError = errors.find((error) => error.inputName === "title");
  const timeError = errors.find((error) => error.inputName === "time");
  const descriptionError = errors.find(
    (error) => error.inputName === "description"
  );

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div>
        {createPortal(
          // Div main
          <div
            ref={nodeRef}
            className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur-sm"
          >
            {/* Dialog */}
            <div className="rounded-xl bg-white p-5 text-center shadow">
              <h2 className="text-xl font-semibold text-brand-dark-blue">
                Nova Tarefa
              </h2>
              <p className="mb-4 mt-1 text-sm text-brand-text-gray">
                Insira as informações abaixo
              </p>

              {/* Inputs */}
              <div className="flex flex-col space-y-4">
                <Input
                  id="title"
                  label="Título"
                  placeholder="Insira o título da tarefa"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  error={titleError}
                  ref={titleRef}
                  disabled={isLoading}
                />

                <TimeSelect
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                  error={timeError}
                  disabled={isLoading}
                />

                <Input
                  id="tasks"
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  error={descriptionError}
                  disabled={isLoading}
                />

                {/* Buttons */}
                <div className="flex gap-3">
                  <Button
                    color="secondary"
                    className="w-full text-center"
                    size="large"
                    onClick={handleClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="w-full"
                    size="large"
                    onClick={handleSaveClick}
                    disabled={isLoading}
                  >
                    {isLoading && <LoaderIcon className="mr-2 animate-spin" />}
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  );
};

AddTaskDialog.PropTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleAddTask: PropTypes.func.isRequired,
};

export default AddTaskDialog;
