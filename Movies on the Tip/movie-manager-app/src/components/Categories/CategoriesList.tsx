import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import '../../styles/CategoryList.css'

interface Props {
    hideCategoryList: () => void;
}

const CategoryList = ({ hideCategoryList }: Props) => {

    const lastVisitedUrl = sessionStorage.getItem('lastVisitedUrl');
    console.log(lastVisitedUrl)

    const categoryBackClickHandler = () => {      
        hideCategoryList()
        // window.history.back() 
    };

    return (

        <div id="category-overlay">
            <div id="category-body" style={{color: 'white', display: 'flex', flexDirection: 'column'}}>
                <section id="category-list">

                    <Link to="/categories/movies-coming">
                        <div className="list-item" id="list-item-1">
                            <div className="layer" onClick={categoryBackClickHandler}>
                                <h2>Upcoming Movies</h2>
                            </div>
                        </div>
                    </Link>

                    <Link to="/categories/movies-in-theaters">
                        <div className="list-item" id="list-item-2">
                            <div className="layer" onClick={categoryBackClickHandler}>
                                <h2>Movies running in Theaters</h2>
                            </div>
                        </div>
                    </Link>

                    <Link to="/categories/top-rated-india">
                        <div className="list-item" id="list-item-3">
                            <div className="layer" onClick={categoryBackClickHandler}>
                                <h2>Top Rated Indian Movies</h2>
                            </div>
                        </div>
                    </Link>

                    <Link to="/categories/top-rated-movies">
                        <div className="list-item" id="list-item-4">
                            <div className="layer" onClick={categoryBackClickHandler}>
                                <h2>Top Rated Movies</h2>
                            </div>
                        </div>
                    </Link>

                </section> 
                <section>
                    <Link to={`${lastVisitedUrl}`}>
                        <Button 
                            variant="danger" 
                            style={{height:'50px', width:'100px', fontSize:'1.5em', marginTop: '15px'}}
                            onClick={categoryBackClickHandler}
                        > 
                            Back
                        </Button>
                    </Link>
                </section>
            </div>
        </div>
    )
}

export default CategoryList;