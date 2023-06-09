import React from "react";
import { useField } from "formik";

const CustomInput = ({ ...props }) => {
  const [field, meta] = useField(props);
  //   console.log(field);
  return (
    <>
      <div>
        <input
          className={`form-control ${meta.error ? "my-2" : "mb-3"}`}
          {...props}
          {...field}
        />
        {field.value && props.icon}
      </div>
      {meta.touched && meta.error ? (
        <div className="text-danger ps-1 mt-1 mb-2">{meta.error}</div>
      ) : null}
    </>
  );
};

export default CustomInput;
