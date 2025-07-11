const InputField = ({
  onChange,
  onKeyDown,
  name,
  defaultValue = "",
  classNames = "",
  type = "text",
  placeholder,
  value,
  isRequired = true,
  variant = "default",
  label,
  icon,
  id,
  error,
  as = "input",
  multiple = false,
  accept,
  uncontrolled = false,
  ...rest
 
}) => {
 const baseStyles = "w-full py-2 px-4 transition-all duration-200 focus:outline-none";
  
  const variants = {
    default: "border border-card-border rounded-lg bg-bg-dark text-white placeholder-text-light focus:ring-2 focus:ring-primary/50 focus:border-transparent",
    outline: "border-b-2 border-gray-300 bg-transparent focus:border-blue-500",
    filled: "bg-gray-100 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500",
    floating: "border border-gray-300 rounded-lg peer focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
  };

  const inputClasses = `${baseStyles} ${
    variants[variant] || variants.default
  } ${classNames}`;

  const InputComponent = as === "textarea" ? "textarea" : "input";

  const inputProps = {
    type,
    id,
    name,
    placeholder,
    className: inputClasses,
    required: isRequired,
    onChange,
    onKeyDown,
    rows: as === "textarea" ? 3 : undefined,
    ...(type === "file"
      ? { multiple, accept } // file-specific props
      : uncontrolled 
        ? { defaultValue: value || defaultValue } // uncontrolled
        : { value: value || defaultValue }), // controlled
    ...rest
  };

  return (
    <div className="relative">
      {label && (
        <label htmlFor={name} className="block text-md text-[#5A607F] mb-1">
          {label}
          {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <InputComponent {...inputProps} />
        {icon && <div className="absolute right-3 top-3.5 text-gray-400">{icon}</div>}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default InputField;
