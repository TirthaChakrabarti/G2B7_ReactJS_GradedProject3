import React, { useEffect } from "react";
import { ToastContainer, Toast } from "react-bootstrap";
import '../../styles/Message.css'

type Props = {
    message: string;
    handleClose: () => void;
}

const Message = ({ message, handleClose }: Props) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            handleClose();
        }, 2000);
        return () => clearTimeout(timer);
    }, [handleClose]);

    return (

        <ToastContainer position={"top-end"} style={{ zIndex: 1 }} id="category-overlay">
            <Toast bg="danger" show autohide delay={5000} onClose={handleClose}>
                <Toast.Header closeButton={false}>
                    Message for you:
                </Toast.Header>
                <Toast.Body style={{color:'white'}}>{message}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default Message;