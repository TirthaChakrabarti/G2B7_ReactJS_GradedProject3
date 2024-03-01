import React, { Component } from "react";
import IMovieItem from "../../models/IMovieItems";
import { LoadingStatus } from "../../models/types";
import LoadingIndicator from "../common/LoadingIndicator";
import { Alert, Col, Row } from "react-bootstrap";
import MovieListItem from "./MovieListItem";
import { getMoviesForCategory } from "../../Services/movieDataFetch";
import SectionHead from "../common/SectionHead";

type Props = {
    category: string
}

type State = {
    category: string | null,
    status: LoadingStatus,
    movies?: IMovieItem[],
    error?: Error
}

class MovieList extends Component<Props, State> {

    state : State = {
        category: null,
        status: 'LOADING'
    }

    render() {

        let el;
        const { category, status, movies, error } = this.state

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
                        <SectionHead 
                            section={category as string} 
                            icon={this.getIconForCategory(category as string)}
                        />
                        <Row className="justify-content-center" xs={1} md={2} lg={4} >
                            {
                                movies?.map(
                                    movie => (
                                        <Col key={movie.id} className="d-flex align-items-stretch my-3">
                                            <MovieListItem
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
                category: category,
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

    getIconForCategory(category: string) {
        if (category === "movies-coming") {
            return "icon1";
        } else if (category === "movies-in-theaters") {
            return "icon2"; 
        } else if (category === "top-rated-india") {
            return "icon3"; 
        } else if (category === "top-rated-movies") {
            return "icon4"; 
        } else {
            return ''
        }
    }
}

export default MovieList