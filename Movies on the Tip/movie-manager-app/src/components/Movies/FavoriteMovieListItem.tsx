import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import IMovieItems from "../../models/IMovieItems";
import { deleteMovieFromFavorite } from "../../Services/movieDataFetch";
import '../../styles/MovieListItem.css'

type Props = {
    movie: IMovieItems
}

const FavoriteMovieListItem = ( {movie} : Props ) => {

    const {
        id,
        title,
        genres,
        posterurl
    } = movie

    function isWebUrl(url: string): boolean {
        return /^https?:\/\//.test(url);
    }

    const RemoveButtonClickHandler = () => {
        deleteMovieFromFavorite(movie.id);
        localStorage.setItem(`favorite_${movie.id}`, 'false');
        window.location.href = `/categories/favourite`
    }

    return (
        <Card bg="dark" text="white" style={{ width: '18rem', marginTop: '10px'}}>
            <Link to={`${id}`}>    
                <Card.Img 
                    id="movieListItemImage"
                    variant="top" 
                    src={isWebUrl(posterurl) ? posterurl : ''} 
                    style={{height: '300px'}} 
                />
            </Link>
            <Card.Body>
                <Card.Title className="d-flex justify-content-between">
                    {title}
                </Card.Title>
                <Card.Text>
                    {genres.join(", ")}
                </Card.Text>
                <Row>
                    <Col>
                        <Link to={`${id}`}>
                            <Button className="btn btn-primary btn-sm bg-danger border-danger">                           
                                <FontAwesomeIcon icon={faCircleInfo} className="me-2"/>
                                Details
                            </Button>
                        </Link>
                    </Col>
                    <Col>
                        <Button 
                            className="btn btn-primary btn-sm bg-danger border-danger d-flex align-items-center justify-content-center"       
                            onClick={RemoveButtonClickHandler}
                        >
                            <>
                                <FontAwesomeIcon icon={solidHeart} className="me-2"/>
                                Remove
                            </>
                        </Button>                            
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default FavoriteMovieListItem