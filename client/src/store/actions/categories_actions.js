import * as categories from './index'
import axios from 'axios'
import { getAuthHeader } from '../../utils/tools'

export const getCategoriesAsync = () => {
  return async (dispatch) => {
    try {
      const result = await axios.get(`/api/articles/categories`)
      dispatch(categories.getCategories(result.data))
    } catch (error) {
      dispatch(categories.errorGlobal(error.response.data.message))
      console.log({
        error: error.response.data.error,
        message: error.response.data.message
      })
    }
  }
}
export const addCategoryAsync = (category) => {
  return async (dispatch) => {
    try {
      const result = await axios.post(`/api/articles/categories`, category, getAuthHeader())
   
      dispatch(categories.addCategory(result.data))
      dispatch(categories.successGlobal('New category have been added'))     
    } catch (error) {
      dispatch(categories.errorGlobal(error.response.data.message))
      console.log({
        error: error.response.data.error,
        message: error.response.data.message
      })
    }
  }
}