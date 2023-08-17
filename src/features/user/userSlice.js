

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";


// export const getUsers = createAsyncThunk(
//    'categories/getCategories', 
//    async(_, thunkAPI) => {
//       try{
//          const response = await axios(`${BASE_URL}/user`);
//          return response.data;
//       } catch(err) {
//          console.log(err)
//          return thunkAPI.rejectWithValue(err)
//       }
// })

//* если прописать как ниже, то можно не оборачивать в try/catch выше
const userSlice = createSlice({
   name: 'user',
   initialState: {
      currentUser: [],
      cart: [],
      isLoading: false,
   },
   reducers: {
      addItemToCart: (state, { payload }) => {
         let newCart =     [...state.cart];

         const found = state.cart.find(({ id }) => id === payload.id)
         if(found) {
            newCart = newCart.map((item) => {
               return item.id === payload.id ? {...item, quantity: payload.quantity || item.quantity + 1 } : item;
            });
         } else newCart.push({ ...payload, quantity: 1 })

         state.cart = newCart;
      },
   },
   extraReducers: (builder) => {
      // builder.addCase(getUsers.pending, (state) => {
      //    state.isLoading = true;
      // });
      // builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      //    state.list = payload;
      //    state.isLoading = false;
      // });
      // builder.addCase(getUsers.rejected, (state) => {
      //    state.isLoading = false;
      // });
   },
});

export const { addItemToCart } = userSlice.actions;

export default userSlice.reducer;