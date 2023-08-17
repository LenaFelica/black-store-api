import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";


import { useParams, useNavigate } from "react-router-dom";
import { useGetProductQuery } from '../../features/api/apiSlice';
import { getRelatedProducts } from '../../features/products/productsSlice';
import { ROUTES } from '../../utils/routes';
import Product from './Product';
import Products from './Products';



const SingleProduct = () => {
  const dispatch = useDispatch(); 
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });

  useEffect(() => {
      if(!isLoading && !isFetching && !isSuccess) {
         navigate(ROUTES.HOME)
      }
  }, [isLoading, isFetching, isSuccess]);

  useEffect(() => {
      if(data) {
         dispatch(getRelatedProducts(data.category.id))
      }
  }, [data])


  return !data ?  (
  <section className='preloader'>Loading...</section>
  ) : ( <>
          <Product {...data} />
          {/* <Products products={data} amount={5} title="Trending" /> */}
        </>
  );
  
}

export default SingleProduct;