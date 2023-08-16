import React from 'react'
import Poster from '../Poster/Poster'
import Products from '../Products/Products';
import { useSelector, useDispatch } from "react-redux";
import Categories from '../Categories/Categories';
import Banner from '../Banner/Banner';
import { useEffect } from 'react';
import { filterByPrice } from '../../features/products/productsSlice';

const Home = () => {
  const dispatch = useDispatch();
  //* NOTE
  //* используем useSelector, чтобы достать данные из нашего store
  //* и передать в Products
//   const { products: { list, filtered }, categories } = useSelector(state => ({ products: state.products.list, products: state.products.filtered, categories: state.categories}))
  const { products: { list, filtered }, categories } = useSelector((state) => state)
   
  useEffect(() => {
     if(!list.length) return;

     dispatch(filterByPrice(100))
  },[dispatch, list.length])

  return (
    <>
       <Poster />
       <Products products={list} amount={5} title="Trending" />
       <Categories products={categories.list} amount={5} title="Worth seeing" />
       <Banner/>
       <Products products={filtered} amount={5} title="Less than 100$" />

    </>
  )
}

export default Home;