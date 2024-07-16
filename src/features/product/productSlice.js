import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  fetchAllProducts,
  fetchAvailability,
  fetchCategories,
  fetchProductById,
  fetchProductsByFilters,
  fetchWarranty,
  updateProduct,
} from "./productAPI";

const initialState = {
  products: [],
  availabilityStatus: [],
  category: [],
  warrantyInformation: [],
  status: "idle",
  selectedProduct: null,
  totalItems: 0,
};

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchAllProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
  "product/fetchProductsByFilters",
  async ({ filter, sort, pagination }) => {
    const response = await fetchProductsByFilters(filter, sort, pagination);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchProductsByAvailabilityAsync = createAsyncThunk(
  "product/availabilityStatus",
  async () => {
    const response = await fetchAvailability();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchProductsByCategoryAsync = createAsyncThunk(
  "product/category",
  async () => {
    const response = await fetchCategories();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchProductsByWarrantyAsync = createAsyncThunk(
  "product/warrantyInformation",
  async () => {
    const response = await fetchWarranty();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const createProductAsync = createAsyncThunk(
  "product/create",
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);

export const updateProductAsync = createAsyncThunk(
  "product/update",
  async (update) => {
    const response = await updateProduct(update);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.data;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchProductsByAvailabilityAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByAvailabilityAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.availabilityStatus = action.payload;
      })
      .addCase(fetchProductsByCategoryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByCategoryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.category = action.payload;
      })
      .addCase(fetchProductsByWarrantyAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByWarrantyAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.warrantyInformation = action.payload;
      })
      .addCase(fetchAllProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = action.payload;
      });
  },
});

export const { clearSelectedProduct } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectAvailability = (state) => state.product.availabilityStatus;
export const selectCategory = (state) => state.product.category;
export const selectWarranty = (state) => state.product.warrantyInformation;
export const selectProductById = (state) => state.product.selectedProduct;

export default productSlice.reducer;
