import React from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import IMovieItems from "../../models/IMovieItems";
import AddRomoveButton from "../common/addRemove";
import '../../styles/MovieListItem.css'

type Props = {
    movie: IMovieItems
}

const MovieListItem = ( {movie} : Props ) => {

    const {
        id,
        title,
        genres,
        posterurl
    } = movie

    function isWebUrl(url: string): boolean {
        return /^https?:\/\//.test(url);
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
                    <Col >
                        <Link to={`${id}`}>
                            <Button className="btn btn-primary btn-sm bg-danger border-danger">                           
                                <FontAwesomeIcon icon={faCircleInfo} className="me-2"/>
                                Details
                            </Button>
                        </Link>
                    </Col>
                    <Col>
                        <AddRomoveButton movie={movie}/>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default MovieListItem;