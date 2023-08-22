//* модалка для входа юзеров

import React from "react";
import { useState } from "react";
import { loginUser } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";

import styles from "../../styles/User.module.css";

const UserLoginForm = ({ closeForm, toggleCurrentFormType}) => {
   const dispatch = useDispatch();

   const [values, setValues] = useState({
      email: "",
      password: "",
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

      dispatch(loginUser(values))
      closeForm();
   };
  

  return (
    <div className={styles.wrapper}>
      <div className={styles.close} onClick={closeForm} >
        <svg className="icon">
          <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`} />
        </svg>
      </div>

      <div className={styles.title}>Log In</div>

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
            type="password"
            name="password"
            value={values.password}
            placeholder="Your password"
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>


        <div className={styles.link} 
             onClick={() => toggleCurrentFormType("signup")}
         >
             Create an accaunt       
          </div>

        <button className={styles.submit} type="submit">
            Login
        </button>

      </form>
    </div>
  );
};

export default UserLoginForm;
