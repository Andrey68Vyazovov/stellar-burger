import { TConstructorIngredient } from '@utils-types';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

type TConstructorState = {
  formulaBurger: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
};

const initialState: TConstructorState = {
  formulaBurger: {
    bun: null,
    ingredients: []
  }
};

export const constructorSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      switch (action.payload.type) {
        case 'bun':
          state.formulaBurger.bun = action.payload;
          break;
        case 'main':
        case 'sauce':
          state.formulaBurger.ingredients.push({
            ...action.payload,
            id: nanoid()
          });
      }
    },
    deleteIngredient: (state, action) => {
      state.formulaBurger.ingredients = state.formulaBurger.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ id: string; direction: string }>
    ) => {
      const { direction, id } = action.payload;

      const index = state.formulaBurger.ingredients.findIndex(
        (idx) => idx.id === id
      );

      const ingredients = state.formulaBurger.ingredients;
      const ingredientMove = ingredients[index];

      if (direction === 'up') {
        ingredients[index] = ingredients[index - 1];
        ingredients[index - 1] = ingredientMove;
      } else {
        ingredients[index] = ingredients[index + 1];
        ingredients[index + 1] = ingredientMove;
      }
    },
    resetConstructor: (state: TConstructorState) => (state = initialState)
  },
  selectors: {
    getConstructorState: (state) => state
  }
});

export const {
  addIngredient,
  deleteIngredient,
  moveIngredient,
  resetConstructor
} = constructorSlice.actions;

export const { getConstructorState } = constructorSlice.selectors;

export const constructorReducer = constructorSlice.reducer;
