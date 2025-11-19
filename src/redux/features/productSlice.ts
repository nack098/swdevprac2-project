import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { get } from "@/libs/apis/arttoys";

type ProductState = {
    products: ProductDetail[];
    loading: boolean;
    error: string | null;
}

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await get();
    return res.data;
  }
);

const initialState:ProductState = { products: [], loading: false, error: null };

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<ProductDetail>) => {
        const remainItems = state.products.filter(obj => {
            return (obj._id !== action.payload._id)
        })
        state.products = remainItems
        state.products.push(action.payload)
    },

    deleteProduct: (state, action: PayloadAction<ProductDetail>) => {
        const remainItems = state.products.filter(obj => {
            return (obj._id !== action.payload._id)
        })
        state.products = remainItems
    },

    editProduct: (state, action: PayloadAction<ProductDetail>) => {
        const index = state.products.findIndex(
            (product) => product._id === action.payload._id
        );
        if (index !== -1) {
            state.products[index] = action.payload;
        }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<ProductDetail[]>) => {
          state.loading = false;
          state.products = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export const { addProduct, deleteProduct, editProduct } = productSlice.actions;

export default productSlice.reducer;