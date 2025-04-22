import InputLabel from "./InputLabel";

const TimeSelect = (props, error) => {
  return (
    <div className="flex flex-col gap-1 text-left">
      <InputLabel htmlFor="time">Horário</InputLabel>

      <select
        id="time"
        className="rounded-lg border border-solid border-brand-border px-4 py-3 outline-brand-primary placeholder:text-sm placeholder:text-brand-text-gray"
        {...props}
      >
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>

      {error && (
        <p className="text-left text-xs text-red-500">{error.message}</p>
      )}
    </div>
  );
};

export default TimeSelect;
