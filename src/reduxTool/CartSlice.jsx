/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalItems: 0,
    totalPrice: 0,
  },
  reducers: {
    addMeal: (state, action) => {
      try {
        const meal = action.payload.meal;
        // console.log("meal", meal);
        meal.extensions = action.payload.selectedExtensions || [];
        let priceOfTopings = 0;
        if (meal.extensions.length > 0) {
          priceOfTopings = meal.extensions.reduce((acc, obj) => {
            return acc + obj.price;
          }, 0);
        }
        const arraysEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);
        const exist = state.items.find(
          (x) => x.productId === meal.id && arraysEqual(x.extensions, meal.extensions)
        );
        if (exist) {
          exist.quantity++;
          exist.totalPrice += meal.price + priceOfTopings;
          state.totalItems++;
          state.totalPrice += meal.price + priceOfTopings;
        } else {
          state.items.push({
            productId: meal.id,
            quantity: 1,
            price: meal.price,
            totalPrice: meal.price + priceOfTopings,
            name: meal.name,
            photoName: meal.photoName,
            offerNr: meal.offerNr,
            description1: meal.description1,
            description2: meal.description2,
            description3: meal.description3,
            extensions: meal.extensions,
          });
          state.totalItems++;
          state.totalPrice += meal.price + priceOfTopings;
        }
      } catch (err) {
        console.log("error in add meal", err);
      }
    },

    deleteMeal: (state, action) => {
      try {
        const meal = action.payload;
        const arraysEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);
        const exist = state.items.find(
          (x) =>
            x.productId === meal.productId &&
            arraysEqual(x.extensions, meal.extensions)
        );
        if (!exist) return;

        let priceOfTopings = 0;
        if (meal.extensions.length > 0) {
          priceOfTopings = meal.extensions.reduce((acc, obj) => {
            return acc + obj.price;
          }, 0);
        }
        if (exist.quantity > 1) {
          exist.quantity--;
          exist.totalPrice -= meal.price + priceOfTopings;
          state.totalItems--;
          state.totalPrice -= meal.price + priceOfTopings;
        } else if (exist.quantity === 1) {
          const arraysNotEqual = (a, b) =>
            JSON.stringify(a) !== JSON.stringify(b);
          state.items = state.items.filter(
            (x) =>
              x.productId !== meal.productId ||
              (x.productId === meal.productId &&
                arraysNotEqual(x.extensions, meal.extensions))
          );
          state.totalItems--;
          state.totalPrice -= meal.price + priceOfTopings;
        }
      } catch (err) {
        console.log("error in delete item", err);
      }
    },

    removeMeal: (state, action) => {
      try {
        const meal = action.payload;
        const exist = state.items.find(
          (x) =>
            x.productId === meal.productId &&
            JSON.stringify(x.extensions) === JSON.stringify(meal.extensions)
        );
        if (!exist) return;

        let priceOfTopings = 0;
        if (meal.extensions.length > 0) {
          priceOfTopings = meal.extensions.reduce((acc, obj) => {
            return acc + obj.price;
          }, 0);
        }
        state.totalItems -= exist.quantity;
        state.totalPrice -= exist.totalPrice;
        state.items = state.items.filter(
          (x) =>
            x.productId !== meal.productId ||
            JSON.stringify(x.extensions) !== JSON.stringify(meal.extensions)
        );
      } catch (err) {
        console.log("can't remove this meal", err);
      }
    },

    addMealFromCart: (state, action) => {
      const meal = action.payload;
      const arraysEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);
      const exist = state.items.find(
        (x) =>
          x.productId === meal.productId && arraysEqual(x.extensions, meal.extensions)
      );
      // console.log("exist",exist)
      let priceOfTopings = 0;
      if (meal.extensions.length > 0) {
        priceOfTopings = meal.extensions.reduce((acc, obj) => {
          return acc + obj.price;
        }, 0);
      }
      state.totalItems++;
      state.totalPrice += meal.price + priceOfTopings;
      exist.quantity++;
      exist.totalPrice += meal.price + priceOfTopings;
    },
  },
});

export const { addMeal, deleteMeal, removeMeal, addMealFromCart } = CartSlice.actions;
export default CartSlice.reducer;



