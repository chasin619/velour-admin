import React from "react";

interface InputProps {
  label: string;
  error?: { message?: string };
  placeholder?: string;
  name: string;
  inputType?: string;
  register: any;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  placeholder,
  name,
  inputType = "text",
  register
}) => {
  const errorMessageId = `${name}-error`;

  return (
    <div className="mb-5.5">
      <label
        htmlFor={name}
        className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
      >
        {label}
      </label>
      <input
        {...register}
        type={inputType}
        name={name}
        id={name}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? errorMessageId : undefined}
        className={`w-full rounded-[7px] border-[1.5px] border-stroke bg-white px-4.5 py-2.5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary ${
          error ? "border-red-500" : ""
        }`}
      />
      {error?.message && (
        <p id={errorMessageId} className="mt-1 text-sm text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default React.memo(Input);
