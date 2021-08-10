import { GET_ARTICLES } from "../types";

export const getArticles = (sort) => ({
    type: GET_ARTICLES,
    payload: sort
})