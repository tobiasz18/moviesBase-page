import { ADD_CATEGORY, GET_CATEGORIES } from "../types";


export default function categoriesReducer(state = {}, action) {

  switch (action.type) {
    case GET_CATEGORIES:
      return { ...state, categories: action.payload }

    case ADD_CATEGORY:
      return { ...state, categories: [...state.categories, action.payload] }
    default:
      return state
  }
}