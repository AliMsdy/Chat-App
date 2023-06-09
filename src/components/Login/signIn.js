import React, { useState } from "react";
import google from "../../assets/google.svg";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import styles from "./signUp.module.css";
import CustomInput from "./CustomInput";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { auth } from "../../firebase";

const SignIn = () => {
  let [iconStatus, setIconStatus] = useState(false);
  let icon = faEye;
  if (iconStatus) icon = faEyeSlash;
  const provider = new GoogleAuthProvider();

  const handleSignInWithGoogle = () => {
    signInWithRedirect(auth, provider)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleSignInWithPassword = (values) => {
    let { email, password } = values;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential);
        // const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };
  const signInValidation = yup.object().shape({
    email: yup.string().email("email is invalid").required("email required"),
    password: yup.string().required("password required"),
  });
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values) => handleSignInWithPassword(values)}
      validationSchema={signInValidation}
    >
      <>
        <Form className={styles.form}>
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

          <Field
            className="form-control btn btn-primary"
            type="submit"
            value="SignIn"
            name="submit"
          />
        </Form>
        <button
          onClick={handleSignInWithGoogle}
          className="d-flex align-items-center justify-content-center btn btn-success mt-4"
        >
          <img
            style={{ height: "50px" }}
            className="img-fluid w-25 me-3"
            src={google}
            alt="googleIcon"
          />
          <div className="text-white">Sign In With Google</div>
        </button>
      </>
    </Formik>
  );
};

export default SignIn;
