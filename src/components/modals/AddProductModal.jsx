import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function AddProductModal({ show, setShow, productDetails, setProductDetails, submitFormDetails, errors, setErrors, selectedImg, setSelectedImg, status }) {

    const { name, description, quantity, price } = productDetails;

    const handleClose = () => {
        setShow(false);
        setSelectedImg(undefined);
        setErrors({ name: "", description: "", quantity: "", price: "", image: "" });
        setProductDetails({ name: "", description: "", quantity: "", price: "", image: "" });
    };

    const onInputChange = e => {
        const { name, value } = e.target;
        setProductDetails(prevDetails => ({
            ...prevDetails,
            [name]: value.trimStart(),
        }));
    };

    const onInputChangeFile = e => {
        setProductDetails(prevDetails => ({
            ...prevDetails,
            [e.target.name]: e.target.files[0]
        }));

        var product_image = e.target.files[0];
        if (product_image !== undefined && product_image.type.startsWith("image/")) {
            setSelectedImg(URL.createObjectURL(product_image));
        } else {
            setSelectedImg(undefined);
        }

    };

    const removeSelectedPhoto = () => {
        setProductDetails(prevDetails => ({
            ...prevDetails,
            image: undefined
        }));
        setSelectedImg(undefined);
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.fControlInput1">
                            <Form.Control
                                autoFocus
                                type="text"
                                name='name'
                                value={name}
                                onChange={onInputChange}
                                placeholder="Product name"
                                className={`${errors.name ? "border-danger" : ""}`}
                            />
                            <small className="text-danger">{errors.name}</small>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Control
                                rows={3}
                                as="textarea"
                                name="description"
                                value={description}
                                onChange={onInputChange}
                                placeholder="Product Description"
                                className={`${errors.description ? "border-danger" : ""}`}
                            />
                            <small className="text-danger">{errors.description}</small>

                        </Form.Group>
                        <div className="row">
                            <Form.Group className="mb-3 col-6" controlId="exampleForm.ControlInput1">
                                <Form.Control
                                    autoFocus
                                    type="number"
                                    name='quantity'
                                    value={quantity}
                                    placeholder="Quantity"
                                    onChange={onInputChange}
                                    className={`${errors.quantity ? "border-danger" : ""} `}
                                />

                                <small className="text-danger">{errors.quantity}</small>

                            </Form.Group>
                            <Form.Group className="mb-3 col-6" controlId="exampleForm.ControlInput1">
                                <Form.Control
                                    autoFocus
                                    name='price'
                                    type="number"
                                    value={price}
                                    placeholder="Price"
                                    onChange={onInputChange}
                                    className={`${errors.price ? "border-danger" : ""}`}
                                />
                                <small className="text-danger">{errors.price}</small>
                            </Form.Group>
                        </div>

                        {
                            selectedImg !== undefined ?
                                <div className="py-5 text-center">
                                    <div className="text-end px-3 py-2">
                                        <span className='remove-btn' onClick={removeSelectedPhoto}>remove</span>
                                    </div>
                                    <img src={selectedImg} alt="...not found" width={`90`} />
                                </div>
                                :
                                <div className='py-5 text-center '>
                                    <small className='text-muted'>choose image</small>
                                </div>
                        }

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                autoFocus
                                type="file"
                                name='image'
                                accept="image/*"
                                onChange={onInputChangeFile}
                            />
                            <small className="text-danger">{errors.image}</small>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={submitFormDetails}>
                        {
                            status ? "loading...." : "add product"
                        }
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddProductModal