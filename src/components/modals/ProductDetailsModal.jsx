import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ProductDetailsModal({ show, setShow, productDetails }) {
    const { imageUrl, name, description, quantity, price, stock } = productDetails;
    return (
        <>
            <Modal
                size="md"
                show={show}
                onHide={() => setShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Product Info
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="col-12 text-center py-4">
                        <img src={imageUrl} alt="" width={"100px"} height={"100px"} style={{ objectFit: "contain" }} />
                    </div>
                    <div className="col-12">
                        <div className='text-start py-2'>
                            <strong>Name</strong> : <small className="text-muted">{name}</small>
                        </div>
                        <div className='text-start py-2'>
                            <strong>Description</strong> : <small className="text-muted">{description}</small>
                        </div>
                        <div className='text-start py-2'>
                            <strong>Quantity</strong> : {stock === false ? <small className="text-muted">{quantity} left</small> : <small className="text-danger">Out of Stock</small>}
                        </div>
                        <div className='text-start py-2 d-flex justify-content-start align-items-baseline'>
                            <strong>Price</strong> : <h6 className='px-2 text-success'> &#8377; {price}</h6>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ProductDetailsModal