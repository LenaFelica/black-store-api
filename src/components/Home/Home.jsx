import React from 'react'
import Poster from '../Poster/Poster'
import Products from '../Products/Products';
import { useSelector } from "react-redux";

const Home = () => {

  //* используем useSelector, чтобы достать данные из нашего store
  //* и передать в Products
  const { list } = useSelector(({products }) => products)
   
  return (
    <>
       <Poster />
       <Products products={list} amount={5} title="Trending" />
    </>
  )
}

export default Home;