import { ADD_ARTICLE, CLEAR_ARTICLE, GET_ARTICLE, GET_ARTICLES } from "../types";

export default function articleReducer(state = [], action) {
  switch (action.type) {
    case GET_ARTICLES:
      return { ...state, articles: action.payload }
    case ADD_ARTICLE:
      return { ...state, lastAdded: action.payload, success: true }
    case GET_ARTICLE:
      return { ...state, current: action.payload }  
    case CLEAR_ARTICLE: 
      return { ...state, current: null }  
    default:
      return state
  }
}