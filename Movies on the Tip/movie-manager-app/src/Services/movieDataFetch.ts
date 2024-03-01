import axios from "axios"
import IMovieItem from "../models/IMovieItems"

// const baseUrl = process.env.REACT_APP_API_BASE_URL
const baseUrl = 'http://localhost:3001'

const getMoviesForCategory = (category: string) => {
    return axios.get<IMovieItem[]>(`${baseUrl}/${category}`)
        .then(response => response.data)
}

const getMovieDetails = (category: string, id : number|string) => {
    return axios.get<IMovieItem>(`${baseUrl}/${category}/${id}`)
        .then(response => response.data)
}

const addMovieToFavorite = (movie: IMovieItem) => {
    axios.post(`${baseUrl}/favourite`, movie)
        .then(response => response.data)
}

const deleteMovieFromFavorite = (id: number|string) => {
    axios.delete(`${baseUrl}/favourite/${id}`)
}

export {
    getMoviesForCategory,
    getMovieDetails,
    addMovieToFavorite,
    deleteMovieFromFavorite
}