import React from "react";
import { useSelector } from "react-redux";
import UserSingupForm from "./UserSingupForm";
import UserLoginForm from "./UserLoginForm";

import { useDispatch } from "react-redux";

import styles from "../../styles/User.module.css";
import { toggleForm, toggleFormType } from "../../features/user/userSlice";


const UserForm = () => {
  const dispatch = useDispatch();
  const { showForm, formType } = useSelector(({ user }) => user);

  const closeForm = () => dispatch(toggleForm(false));
  const toggleCurrentFormType = (type) => dispatch(toggleFormType(type));

  return showForm ? (
    <>
      <div className={styles.overlay} onClick={closeForm}/>
      {formType === 'singup' ? (
      <UserSingupForm toggleCurrentFormType={toggleCurrentFormType} closeForm={closeForm} /> 
      ) : (
      <UserLoginForm toggleCurrentFormType={toggleCurrentFormType} closeForm={closeForm} />
      )}
    </>
  ) : (
    <></>
  );
};

export default UserForm;
