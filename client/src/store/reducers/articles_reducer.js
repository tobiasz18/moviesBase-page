import { ADD_ARTICLE, CLEAR_CURRENT_ARTICLE, DELETE_ARTICLE, GET_CURRENT_ARTICLE, GET_ARTICLES, GET_PAGINATE_ARTICLES, UPDATE_STATUS_ARTICLE } from "../types";

export default function articleReducer(state = {}, action) {
  switch (action.type) {
    case GET_ARTICLES:
      return { ...state, articles: action.payload }
    case ADD_ARTICLE:
      return { ...state, lastAdded: action.payload, success: true }

    case GET_CURRENT_ARTICLE:
      return { ...state, current: action.payload }
    case CLEAR_CURRENT_ARTICLE:
      return { ...state, current: null }
      
    case GET_PAGINATE_ARTICLES:
      return { ...state, adminArticles: action.payload }
    case DELETE_ARTICLE:
      return {
        ...state, adminArticles: {
          ...state.adminArticles, docs: action.payload
        }
      }
    case UPDATE_STATUS_ARTICLE:
      return {
        ...state, adminArticles: {
          ...state.adminArticles,
          docs: action.payload
        }
      }

    default:
      return state
  }
}