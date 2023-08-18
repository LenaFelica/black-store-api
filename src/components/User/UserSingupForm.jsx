//* модалка для входа юзеров

import React from "react";
import { useState } from "react";
import { createUser } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";

import styles from "../../styles/User.module.css";

const UserSingupForm = ({ closeForm, toggleCurrentFormType }) => {
   const dispatch = useDispatch();

   const [values, setValues] = useState({
      name: "",
      email: "",
      password: "",
      avatar: "",
   });

   const handleChange = ({ target: { value, name }}) => {
      setValues ({ ...values, [name]: value })
   }

//* Registration
   const handleSubmit = (e) => {
      e.prevetDefault(); 
      //* some - cheking values(name, email, password)
      const isNotEmpty = Object.values(values).every(val => val)
      if(!isNotEmpty) return;

      dispatch(createUser(values))
      closeForm();
   };
  

  return (
    <div className={styles.wrapper}>
      <div className={styles.close} onClick={closeForm} >
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
        </svg>
      </div>

      <div className={styles.title}>Sign Up</div>

      <form className={styles.form} onSubmit={handleSubmit} >
         <div className={styles.group}>
          <input
            type="email"
            name="email"
            value={values.email}
            placeholder="Your email"
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.group}>
          <input
            type="name"
            name="name"
            value={values.name}
            placeholder="Your name"
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.group}>
          <input
            type="password"
            name="password"
            value={values.password}
            placeholder="Your password"
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.group}>
          <input
            type="avatar"
            name="avatar"
            value={values.avatar}
            placeholder="Your avatar"
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.link} 
             onClick={() => toggleCurrentFormType("login")}
         >
            I already have an account
        </div>

        <button className={styles.submit} type="submit">
            Create an account
        </button>

      </form>
    </div>
  );
};

export default UserSingupForm;
