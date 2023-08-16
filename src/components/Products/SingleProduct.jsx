import React from 'react';
import { useEffect } from 'react';

import { useParams, useNavigate } from "react-router-dom";
import { useGetProductQuery } from '../../features/api/apiSlice';
import { ROUTES } from '../../utils/routes';


// import Product from "./Product";
// import Products from "./Products";


const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });

  useEffect(() => {
      if(!isLoading && !isFetching && !isSuccess) {
         navigate(ROUTES.HOME)
      }
  }, [isLoading, isFetching, isSuccess]);


  return (
    <div>SingleProduct</div>
  )
}

export default SingleProduct;