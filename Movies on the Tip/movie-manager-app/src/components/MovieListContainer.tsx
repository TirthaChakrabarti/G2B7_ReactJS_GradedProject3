import React from "react";
import { useParams } from "react-router-dom";
import MovieList from "./Movies/MovieList";

const MoviesListContainer = () => {

    const { category } = useParams();
    if (!category) {
        return <div>Loading...</div>;
    } 
    return <MovieList category={category}/>;
}

export default MoviesListContainer;