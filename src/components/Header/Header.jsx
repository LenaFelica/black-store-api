import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/Header.module.css'
import { ROUTES } from '../../utils/routes';

import LOGO from "../../images/logo.svg";
import AVATAR from "../../images/avatar.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { toggleForm } from '../../features/user/userSlice';
import { useState } from 'react';
import { useEffect } from 'react';
import { useGetProductsQuery } from '../../features/api/apiSlice';

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [searchValue, setSearchValue] = useState("")
  const { currentUser } = useSelector(({ user }) => user)
 
  const [values, setValues] = useState({ name: "Guest", avatar: AVATAR });

  const { data, isLoading} = useGetProductsQuery({ title: searchValue});
  console.log(data);

  useEffect(() => {
     if (!currentUser) return;
     setValues(currentUser);
  }, [currentUser])

  const handleClick = () => {
     if(!currentUser) dispatch(toggleForm(true))
     else navigate(ROUTES.PROFILE)
  }

  const handleSearch = ({ target: { value }}) => {
   setSearchValue(value)
  }

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
         <Link to={ROUTES.HOME}>
            <img src={LOGO} alt="Stuff" />
         </Link>
      </div>

      <div className={styles.info}>

        <form className={styles.form}>
            <div className={styles.icon}>
             <svg className="icon">
               <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
             </svg>
            </div>
            <div className={styles.input}>
               <input 
                  type="search" 
                  name="search" 
                  placeholder="Search for anything.."
                  autoComplete='off'
                  onChange={handleSearch}
                  value={searchValue}
               />
            </div>

            {searchValue && <div className={styles.box}>
               {isLoading ? 'Loading' : !data.length ? "No results" : (
                  data.map(({title, images, id}) => {
                     return (
                        <Link 
                           to={`/products/${id}`}
                           className={styles.item}
                           onClick={() => setSearchValue("")}
                           key={id}
                        >
                           <div 
                              className={styles.image}
                              styles={{ backgroundImage: `url(${images[0]})`}}
                           />

                           <div className={styles.title}>{title}</div>
                        </Link>
                     )
                  })
               )}
            </div>}
         </form>

         <div className={styles.user} onClick={handleClick} >
            <div className={styles.avatar} style={{ backgroundImage: `url(${values.avatar})`}} />
            <div className={styles.username}>{values.name}</div>
         </div>

         <div className={styles.account}>
            <Link to={ROUTES.HOME} className={styles.favourites}>
               <svg className={styles["icon-fav"]}>
                 <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
               </svg>
            </Link>

            <Link to={ROUTES.CART} className={styles.cart}>
               <svg className={styles["icon-cart"]}>
                 <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
               </svg>
               <span className={styles.count}>2</span>
            </Link>
         </div>
      </div>
    </div>
  )
}

export default Header;