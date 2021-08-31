import React from 'react';
import {Modal} from 'react-bootstrap';
import {Button} from "@material-ui/core";

export const ContinueModal = ({show, handleClose, text}) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Body>{text}</Modal.Body>
            <Modal.Footer>
                <Button
                    variant="contained"
                    onClick={handleClose}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    )
}