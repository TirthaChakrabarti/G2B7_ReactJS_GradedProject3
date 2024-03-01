import React from "react";
import { Routes, Route} from "react-router-dom";

import categories from "../models/MoviesCategories";
import NavigationMenu from "./NavigationMenu";
import Home from "./Home";
import CategoryList from "./Categories/CategoriesList";
import { Container } from "react-bootstrap";
import MovieDetails from "./Movies/MovieDetails";
import MoviesListContainer from "./MovieListContainer";
import FavoriteMovieList from "./Movies/FavoriteMovieList";

import '../styles/App.css'

const App = () => {

    return (
        <div id="background">
            <NavigationMenu/>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/home" element={<Home/>}></Route>
                <Route path="/categories" element={<CategoryList hideCategoryList={()=>{}}/>}></Route>
                <Route path="/categories/:category"element={<Container><MoviesListContainer/></Container>}></Route>
                <Route path="/categories/favourite" element={<Container><FavoriteMovieList category={categories.favourite}/></Container>}></Route> 
                <Route path="/categories/:category/:id" element={<Container><MovieDetails/></Container>}></Route>
            </Routes>
        </div>
    )

}

export default App;