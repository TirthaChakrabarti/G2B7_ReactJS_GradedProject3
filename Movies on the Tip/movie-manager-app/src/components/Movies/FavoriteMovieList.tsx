import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import IMovieItem from "../../models/IMovieItems";
import { LoadingStatus } from "../../models/types";
import LoadingIndicator from "../common/LoadingIndicator";
import { Alert, Col, Row } from "react-bootstrap";
import FavoriteMovieListItem from "./FavoriteMovieListItem";
import { getMoviesForCategory } from "../../Services/movieDataFetch";

type Props = {
    category: string
}

type State = {
    status: LoadingStatus,
    movies?: IMovieItem[],
    error?: Error
}

class FavoriteMovieList extends Component<Props, State> {

    state : State = {
        status: 'LOADING'
    }

    render() {

        let el;
        const { status, movies, error } = this.state

        switch( status ) {
            case 'LOADING':
                el = (
                    <LoadingIndicator 
                        size="large" 
                        message="Fetching the list of movies. Please wait..."
                    />
                )
                break;
            
            case 'LOADED':
                el = (
                    <>
                        <h1 
                            style={{color:'whitesmoke', marginTop:'50px', marginBottom:'50px', marginRight:'10px'}}
                        >
                            My Favorite
                            <FontAwesomeIcon icon={faHeart} style={{color:'red', marginLeft:'10px'}}/>
                        </h1>
                        <Row xs={1} md={2} lg={4}>
                            {
                                movies?.map(
                                    movie => (
                                        <Col key={movie.id} className="d-flex align-items-stretch my-3">
                                            <FavoriteMovieListItem
                                                movie={movie}
                                            />
                                        </Col>
                                    )
                                )
                            }
                        </Row>
                    </>
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

    async componentDidMount() {

        const {category} = this.props

        this.setState({
            status: 'LOADING'
        })

        try {
            const data = await getMoviesForCategory(category);
            this.setState({
                status: 'LOADED',
                movies: data
            })
        } catch (error) {
            this.setState({
                status: 'ERROR_LOADING',
                error: error as Error
            })
        }
    }
}

export default FavoriteMovieList