import InputLabel from "./InputLabel";

const Input = ({ label, error, ...rest }) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        className="rounded-lg border border-solid border-brand-border px-4 py-3 outline-brand-primary placeholder:text-sm placeholder:text-brand-text-gray"
        {...rest}
      />
      {error && (
        <p className="text-left text-xs text-red-500">{error.message}</p>
      )}
    </div>
  );
};

export default Input;
