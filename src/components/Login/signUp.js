import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import styles from "./signUp.module.css";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomInput from "./CustomInput";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const SignUp = () => {
  let [iconStatus, setIconStatus] = useState(false);
  let icon = faEye;
  if (iconStatus) icon = faEyeSlash;

  const signUpValidation = yup.object().shape({
    name: yup.string().required("name required"),
    email: yup.string().email("email is invalid").required("email required"),
    password: yup
      .string()
      .required("password required")
      .matches(
        /^.*(?=.{10,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 10 characters, one uppercase,one lowercase, one digit and one special character"
      ),
    confirmPassword: yup
      .string()
      .required("Please confirm your password")
      .when("password", {
        is: (password) => (!!password && password.length > 0 ? true : false),
        then: (schema) =>
          schema.oneOf([yup.ref("password")], "Password doesn't match"),
      }),
    acceptRegulations: yup
      .boolean(true)
      .default(false)
      .isTrue("accept our regulations"),
  });

  const renderError = (msg) => (
    <div className="text-danger ps-1 mb-2">{msg}</div>
  );

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          name: "",
          password: "",
          confirmPassword: "",
          acceptRegulations: false,
        }}
        onSubmit={(values) => {
          console.log(JSON.stringify(values, null, 2));
          let { email, password } = values;
          createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              console.log(userCredential);
              // const user = userCredential.user;
              // ...
            })
            .catch((error) => {
              // something went wrong
              const errorMessage = error.message;
              console.log(errorMessage);
              // ..
            });
        }}
        validationSchema={signUpValidation}
      >
        <Form className={styles.form}>
          <CustomInput name="name" type="text" placeholder="Name..." />

          <CustomInput name="email" type="email" placeholder="Email..." />
          <CustomInput
            name="password"
            type={`${iconStatus ? "text" : "password"}`}
            placeholder="Password..."
            icon={
              <FontAwesomeIcon
                icon={icon}
                onClick={() => setIconStatus((prev) => !prev)}
              />
            }
          />
          <CustomInput
            name="confirmPassword"
            type={`${iconStatus ? "text" : "password"}`}
            placeholder="ConfirmPassword..."
            icon={
              <FontAwesomeIcon
                icon={icon}
                onClick={() => setIconStatus((prev) => !prev)}
              />
            }
          />
          <div className="mt-3 mb-2">
            <label style={{ cursor: "pointer" }} htmlFor="acceptRegulations">
              <Field
                type="checkbox"
                name="acceptRegulations"
                id="acceptRegulations"
                style={{ cursor: "pointer" }}
              />
              <span className="ms-1">
                Accept our terms of privacy and policy
              </span>
            </label>
          </div>
          <ErrorMessage render={renderError} name="acceptRegulations" />

          <Field>
            {({ form }) => {
              return (
                <button
                  disabled={form.isSubmitting}
                  type="submit"
                  className="form-control btn btn-primary"
                  onClick={() =>
                    !form.isValid &&
                    toast.error("Invalid Data!!...", {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    })
                  }
                >
                  signUp
                </button>
              );
            }}
          </Field>
        </Form>
      </Formik>
    </>
  );
};

export default SignUp;
