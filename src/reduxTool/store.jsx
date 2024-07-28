import { configureStore } from '@reduxjs/toolkit';

// import AuthReducer from "./AuthSlice"
import cartReducer from "./CartSlice"; 
import AuthReducer from "./AuthContext"
import checkReducer from "./CheckSlice";
export const store = configureStore({
  reducer: {
    // Auth: AuthReducer,
    cart: cartReducer,
    auth: AuthReducer,
    checkSlice: checkReducer,
    // contact:contactReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});