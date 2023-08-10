import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ExclamationTriangleFill } from 'react-bootstrap-icons';

function AlertModal({ show, setShow, proceedFn }) {

    const handleClose = () => setShow(false);

    return (
        <>
            <Modal show={show} onHide={handleClose} size="md">
                <Modal.Header closeButton>
                    <Modal.Title className='text-dark'>
                        <div className="d-flex justify-content-start align-items-center text-muted">
                            <ExclamationTriangleFill className='mx-2' />
                            Warning!
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center py-2">
                        <h4>You're about to delete a product</h4>
                        <h6>This will delete your product from catelog</h6>
                        <h6>Are you sure ?</h6>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={proceedFn}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AlertModal