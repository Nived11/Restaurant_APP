import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios'; 
import { extractErrorMessages } from '../utils/extractErrorMessages'; // നിങ്ങളുടെ പ്രോജക്റ്റിലെ കൃത്യമായ പാത്ത് നൽകുക

const loadCart = () => {
  if (typeof window !== 'undefined') {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }
  return [];
};

const saveToLocal = (items) => {
  localStorage.setItem('cart', JSON.stringify(items));
};

const formatCartItems = (items) => {
  return (items || []).map(item => ({
    ...item,
    id: item.id,
    item_id: item.item_id || item.id,
    name: item.name || item.item_name, 
    image: item.image || item.item_image,
    offer_price: item.offer_price?.toString() || "0",
  }));
};

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/orders/cart/');
      return response.data; 
    } catch (err) {
      return rejectWithValue(extractErrorMessages(err)); // Utils ഉപയോഗിച്ചു
    }
  }
);

export const mergeCartOnLogin = createAsyncThunk(
  'cart/mergeCart',
  async (_, { rejectWithValue }) => {
    try {
      const localCart = loadCart();
      if (localCart.length === 0) {
        const response = await api.get('/orders/cart/');
        return response.data;
      }
      const itemsToMerge = localCart.map(item => ({
        item_id: item.item_id || item.id,
        quantity: item.quantity
      }));
      const response = await api.post('/orders/cart/merge/', { items: itemsToMerge });
      localStorage.removeItem('cart'); 
      return response.data; 
    } catch (err) {
      return rejectWithValue(extractErrorMessages(err));
    }
  }
);

export const syncCartUpdate = createAsyncThunk(
  'cart/syncUpdate',
  async ({ itemId, actionType }, { rejectWithValue }) => {
    try {
      const response = await api.post('/orders/cart/update/', {
        item_id: itemId,
        action: actionType 
      });
      return response.data; 
    } catch (err) {
      return rejectWithValue(extractErrorMessages(err));
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCart(),
    loading: false,
    error: null
  },
  reducers: {
    addToCart: (state, action) => {
      const { item, quantity } = action.payload;
      const itemId = item.item_id || item.id;
      const existingItem = state.items.find((i) => (i.item_id || i.id) === itemId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ 
          ...item, 
          item_id: itemId,
          quantity,
          name: item.name || item.item_name,
          image: item.image || item.item_image,
          offer_price: item.offer_price?.toString() || "0"
        });
      }
      saveToLocal(state.items);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) {
        item.quantity = quantity;
        saveToLocal(state.items);
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveToLocal(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('cart');
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = formatCartItems(action.payload.items);
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Sync Update
      .addCase(syncCartUpdate.fulfilled, (state, action) => {
        if (action.payload?.items) {
          state.items = formatCartItems(action.payload.items);
        }
      })
      .addCase(syncCartUpdate.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;