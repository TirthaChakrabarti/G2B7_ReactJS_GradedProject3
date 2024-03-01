import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons"
import IMovieItems from "../../models/IMovieItems";
import { addMovieToFavorite, deleteMovieFromFavorite } from "../../Services/movieDataFetch";
import Message from "./message";

type Props = {
    movie: IMovieItems
}

const AddRomoveButton = ( {movie} : Props ) => {

    const [addRemoveButtonStatus, setAddRemoveButtonStatus] = useState<boolean>(false);
    const [showMessage, setShowMessage] = useState<boolean>(false)
    
    useEffect(() => {
        const status = localStorage.getItem(`favorite_${movie.id}`);
        if (status !== null) {
            setAddRemoveButtonStatus(status === 'true');
        }
    }, [movie.id]);
    
    const addRemoveButtonClickHandler = () => {
        if (!addRemoveButtonStatus) {
            addMovieToFavorite(movie)
            setAddRemoveButtonStatus(true)
            localStorage.setItem(`favorite_${movie.id}`, 'true');
            setShowMessage(true)
        } else {
            deleteMovieFromFavorite(movie.id)
            setAddRemoveButtonStatus(false)
            localStorage.setItem(`favorite_${movie.id}`, 'false');
            setShowMessage(true)
        }
    }

    const handleCloseMessage = () => {
        setShowMessage(false);
    };    

    return (
        <>
            <Button 
                className="btn btn-primary btn-sm bg-danger border-danger d-flex align-items-center justify-content-center"        
                onClick={addRemoveButtonClickHandler}
            >
                {addRemoveButtonStatus ? 
                (
                    <>
                        <FontAwesomeIcon icon={solidHeart} className="me-2"/>
                        Remove
                    </>
                ) : (
                    <>
                        <FontAwesomeIcon icon={regularHeart} className="me-2"/>
                        I love it!
                    </>
                )}
            </Button>   

            {
                showMessage && (
                    <Message 
                    message={addRemoveButtonStatus ? "Movie added to Favourite" : "Movie removed from Favourite"} 
                    handleClose={handleCloseMessage} 
                />
                )
            }
        </>
    )
}

export default AddRomoveButton;

