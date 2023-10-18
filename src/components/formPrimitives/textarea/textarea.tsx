import cn from "classnames";
import { useField, FieldHookConfig, ErrorMessage } from "formik";

const Textarea = (
  props: FormElement &
    FieldHookConfig<string | number> & {
      rows: number;
    }
) => {
  const [field, meta] = useField(props);

  const isInvalid = meta.touched && !!meta.error;

  const baseClasses = [
    "appearance-none",
    "p-4",
    "rounded",
    "w-full",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-black",
    "bg-t-gray-2",
    "text-t-gray-5",
  ];
  const inputClasses = cn(
    baseClasses,
    {
      "outline-red-500 outline-2 outline placeholder-red-500": isInvalid,
    },
    props.className
  );
  return (
    <div>
      <label className="block mb-3 text-t-black" htmlFor={props.id}>
        {props.customLabel ?? props.label}
      </label>
      <textarea
        className={inputClasses}
        {...field}
        placeholder={props.placeholder}
        name={props.name}
        id={props.id}
        aria-label={props.label}
        onWheel={(e) => e.currentTarget.blur()}
        autoFocus={props.autoFocus}
        rows={props.rows}
      />
      <div className="text-red-500 mt-1">
        <ErrorMessage name={props.name} component="div" />
      </div>
    </div>
  );
};

export { Textarea };
