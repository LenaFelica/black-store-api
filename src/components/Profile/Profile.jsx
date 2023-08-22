import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../features/user/userSlice';

import styles from "../../styles/Profile.module.css";

const Profile = () => {

   const dispatch = useDispatch(); 
   const { currentUser } = useSelector(({ user }) => user)
  
   const [values, setValues] = useState({
      name: "",
      email: "",
      password: "",
   });

   useEffect(() => {
      if(!currentUser) return;

      setValues(currentUser)
   }, [currentUser])
   

   const handleChange = ({ target: { value, name }}) => {
      setValues ({ ...values, [name]: value })
   }

   const handleSubmit = (e) => {
      e.prevetDefault(); 
      //* some - cheking values(name, email, password)
      const isNotEmpty = Object.values(values).every((val) => val)
      if(!isNotEmpty) return;

      dispatch(updateUser(values))
   };
  return (
    <section className={styles.profile}>
      {!currentUser ? <span>You need to log in </span> : (
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

                 <button type="submit" className={styles.submit}>
                     Update
                 </button>
      </form>           
      )}
    </section>
  )
}

export default Profile;