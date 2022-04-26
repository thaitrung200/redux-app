import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'


const initialState = {
    data: [],
    loading: false,
    error: null,
}
export const getListProduct = createAsyncThunk('product/getListProduct', async() =>{
    try {
        const res = await axios.get('https://624ee2998c5bf4a105431664.mockapi.io/products')
        console.log(res.data);
        return res.data
    } catch (error) {
        console.log('Loi');
    }
})

export const addListProduct = createAsyncThunk('product/addListProduct', async({ name, price}) =>{
    try {
        const res = await axios.post('https://624ee2998c5bf4a105431664.mockapi.io/products',{
            avatar:"https://loremflickr.com/320/240",
            name,
            price
        })
        return res.data
    } catch (error) {
        console.log('loi');
    }
})

export const deleteProduct = createAsyncThunk('post/deleteProduct', async({item}) =>{
  try {
    const res = await axios.delete(`https://624ee2998c5bf4a105431664.mockapi.io/products/${item.id}`)
    return res.data
  } catch (error) {
    console.log('loi');
  }
})
export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers:{},
    extraReducers(buider){
        buider
         // getlist product
      .addCase(getListProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getListProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getListProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Add ListProduct
      .addCase(addListProduct.pending, (state, action) =>{
          state.loading = true;
      })
      .addCase(addListProduct.fulfilled, (state, action) => {
        state.loading = false;
        // state.data = action.payload;
      })
      .addCase(addListProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

       // delete
      .addCase(deleteProduct.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        // state.data = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    }
})


export default productSlice.reducer;


