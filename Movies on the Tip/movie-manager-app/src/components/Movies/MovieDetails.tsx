import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import IMovieItem from "../../models/IMovieItems";
import { LoadingStatus } from "../../models/types";
import LoadingIndicator from "../common/LoadingIndicator";
import { Alert, Col, Row, Card, Badge, Button } from "react-bootstrap";
import { getMovieDetails } from "../../Services/movieDataFetch";
import Rating from "../common/rating";
import '../../styles/MovieDetails.css'

const MovieDetails = () => {

    const [status, setStatus] = useState<LoadingStatus>('LOADING');
    const [movie, setMovie] = useState<IMovieItem | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const {category, id} = useParams<{category: string, id: string}>()
    console.log(category, id)

    const back = () => {
        window.history.back()
    }

    useEffect( 
        () => {
            const loadMovieDetails = async() => {

                try {
                    const data = await getMovieDetails(category as string, id as string)
                    setMovie(data);
                    setStatus('LOADED')
                } catch(error) {
                    setError(error as Error)
                    setStatus('ERROR_LOADING')
                }
            }

            loadMovieDetails();
        }
    );

    let el;

    switch( status ) {
        case 'LOADING':
            el = (
                <LoadingIndicator 
                    size="large" 
                    message="Fetching the details of the movie. Please wait..."
                />
            )
            break;
        
        case 'LOADED':

            const {
                title,
                year,
                genres,
                releaseDate,
                averageRating,
                storyline,
                actors,
                imdbRating,
                posterurl
            } = movie as IMovieItem

            el = (

                <Card className="mb-4 my-5" bg="dark" text="white" style={{ marginBottom: '20px' }}>
                    <Row xs={1} md={2}>
                        <Col xs={12} md={6} lg={4}>
                            <Card.Img 
                                variant="top" 
                                style={{height: '30rem', width: '22rem'}} 
                                src={posterurl} 
                                id="movieDetailsImage"
                                />
                        </Col>
                        <Col xs={12} md={6} lg={8}>
                            <Card.Body>
                                <Card.Title>{title} ({year})</Card.Title>
                                <Card.Text>{storyline}</Card.Text>
                                <Card.Text><span>Release Date:  </span>{releaseDate}</Card.Text>
                                <hr />
                                <Row>
                                    <Col xs={6}>
                                        <h6>Genres</h6>
                                        {genres.map(genre => (
                                            <Badge key={genre} className="me-2 mb-2" bg="danger">{genre}</Badge>
                                        ))}
                                    </Col>
                                    <Col xs={6}>
                                        <h6>Actors</h6>
                                        {actors.map(actor => (
                                            <div key={actor}>{actor}</div>
                                        ))}
                                    </Col>
                                </Row>
                                <hr />
                                <Row>
                                    <Col xs={6}>
                                        <h6>IMDB Rating:</h6>
                                        <Rating value={typeof imdbRating === 'string' ? parseFloat(imdbRating) : imdbRating} totalStar={10} className="me-2"/>
                                        {imdbRating}
                                    </Col>
                                    <Col xs={6}>
                                        <h6>Average Rating:</h6>
                                        <Rating value={averageRating} totalStar={5} className="me-2"/>
                                        {averageRating}
                                    </Col>
                                </Row>
                                <hr/>
                                <Row className="my-2">
                                    <Col>
                                        <></>
                                    </Col>
                                    <Col>
                                        <Button 
                                            className="btn btn-primary btn-sm bg-danger border-danger"
                                            onClick={back}>Back
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Col>
                    </Row>
                    {/* </div> */}
                </Card>                
            )

            break;

        case 'ERROR_LOADING':
            el = (
                <Alert variant="danger my-5" style={{textAlign: 'center', fontSize: '1.2em'}}>
                    {error?.message}
                </Alert>                  
            )
            break;
    }

    return el;
}

export default MovieDetails