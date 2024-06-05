import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchProduct = createAsyncThunk(
    'product/fetchProduct',
    async (id) => {
        const response = await axios.get(`https://dummyjson.com/products/${id}`)
        return response.data
    },
)

const productSlice = createSlice({
    name: 'product',
    initialState: {
        product: {},
        currentProduct: 1,
        loading: false,
        error: null,
    },
    reducers: {
        nextProduct: (state) => {
            state.currentProduct += 1
        },
        prevProduct: (state) => {
            state.currentProduct -= 1
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchProduct.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.product = action.payload
                console.log(state.product)
            })
    },
})

export const productReducer = productSlice.reducer
export const { nextProduct, prevProduct } = productSlice.actions
