import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useRef, useState } from 'react';
const Alert1 = React.lazy(() => import("../alerts/Alert1"));
import { updateEditedProductDetails } from '../../services/ProductServices';


function EditProductModal({ show, setShow, currentProductDetails, setCurrentProductDetails, initialProductDetails, setProductList, productLIst }) {
    const fileInputRef = useRef(null);
    const [process, setProcess] = useState(false);
    const [hasChanged, setHasChanged] = useState(false);
    const [selectedImg, setSelectedImg] = useState(undefined);
    const [errors, setErrors] = useState({ name: "", description: "", quantity: "", price: "", image: "" });
    const [alertModal, setAlertModal] = useState({ status: false, message: "", variant: "" });

    const { name, description, price, quantity, imageUrl, _id } = currentProductDetails;

    const handleClose = () => {
        if (process === false) {
            setShow(false);
            setErrors({ name: "", description: "", quantity: "", price: "", image: "" });
        }
    }

    const onInputChange = e => {
        const { name, value } = e.target;
        setCurrentProductDetails(prevDetails => ({
            ...prevDetails,
            [name]: value.trimStart(),
        }));
    };

    const onInputChangeFile = (e) => {
        const file = e.target.files[0];
        if (file.type.startsWith("image/")) {
            setCurrentProductDetails(prevDetails => ({
                ...prevDetails,
                [e.target.name]: e.target.files[0]
            }));
        } else {
            setSelectedImg(undefined);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            setErrors(prevErrors => ({
                ...prevErrors,
                image: "Please select a valid image file (e.g., JPEG, PNG, GIF)."
            }))
        }
    }

    const removeSelectedImg = () => {
        setSelectedImg(undefined);
        setCurrentProductDetails(prevDetails => ({
            ...prevDetails, imageUrl: undefined
        }));
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    const compareObjects = (obj1, obj2) => {
        for (let key in obj1) {
            if (obj1[key] != obj2[key]) {
                return false;
            }
        }
        return true;
    }

    const validateForm = () => {
        const newErrors = {};

        if (name.trimEnd().length === 0) {
            newErrors.name = "* Name cannot be empty";
        } else if (name.length > 1000) {
            newErrors.name = "* name should not exceed 1000 characters.";
        }

        if (description.trimEnd().length === 0) {
            newErrors.description = "* Description cannot be empty";
        } else if (description.length > 10000) {
            newErrors.description = "* description should not exceed 10000 characters.";
        }

        if (quantity.length === 0) {
            newErrors.quantity = "* Quantity cannot be empty";
        } else if (+quantity <= 0 || +quantity >= 2147483647) {
            newErrors.quantity = "* Enter valid amount of quantity";
        }

        if (price.length === 0) {
            newErrors.price = "* Price cannot be empty";
        } else if (+price <= 0) {
            newErrors.price = "* enter valid amount";
        }

        if (imageUrl === undefined) {
            newErrors.image = "* Please choose an image"
        }


        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const onSubmitForm = async e => {
        e.preventDefault();
        try {

            if (process === false) {
                setProcess(true);
                if (validateForm()) {
                    const formData = new FormData();
                    const productInfo = {
                        prod_id: _id,
                        price: +price,
                        quantity: +quantity,
                        name: name.trimEnd(),
                        description: description.trimEnd(),
                    }
                    if (typeof imageUrl === 'object') {
                        formData.append('file', imageUrl);
                    } else {
                        productInfo.imageUrl = imageUrl;
                    }

                    formData.append('edited_product_details', JSON.stringify(productInfo));
                    const response = await updateEditedProductDetails(formData);
                    const { status, message, newImageUrl } = response.data;
                    if (status) {
                        const updatedProduct = { name, price: +price, _id: _id, imageUrl: newImageUrl };
                        const updatedProducts = productLIst.map(product => (product._id === _id ? updatedProduct : product));
                        setProductList(updatedProducts);
                        setShow(false);
                    } else {
                        const updatedErrors = { ...errors };
                        updatedErrors.name = message;
                        setErrors(updatedErrors);
                    }
                }
                setProcess(false);
            }
        } catch (error) {
            setAlertModal({ status: true, message: error.response.data.message, variant: "danger" });
            setProcess(false);
        }
    }

    useEffect(() => {
        if (typeof imageUrl === 'string') {
            setSelectedImg(imageUrl);
        } else if (typeof imageUrl === 'object') {
            setSelectedImg(URL.createObjectURL(imageUrl))
        } else {
            setSelectedImg(undefined);
        }

        setHasChanged(compareObjects(currentProductDetails, initialProductDetails))

    }, [currentProductDetails]);


    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                autoFocus
                                type="text"
                                name='name'
                                value={name}
                                onChange={onInputChange}
                                className={`${errors.name ? "border-danger" : ""}`}
                            />
                            <small className="text-danger">{errors.name}</small>
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                rows={3}
                                as="textarea"
                                name="description"
                                value={description}
                                onChange={onInputChange}
                                className={`${errors.description ? "border-danger" : ""}`}
                            />
                            <small className="text-danger">{errors.description}</small>
                        </Form.Group>
                        <div className="row">
                            <Form.Group className="mb-3 col-6" controlId="exampleForm.ControlInput1">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control
                                    autoFocus
                                    type="number"
                                    name='quantity'
                                    value={quantity}
                                    onChange={onInputChange}
                                    className={`${errors.quantity ? "border-danger" : ""} `}
                                />
                                <small className="text-danger">{errors.quantity}</small>
                            </Form.Group>
                            <Form.Group className="mb-3 col-6" controlId="exampleForm.ControlInput1">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    autoFocus
                                    name='price'
                                    type="number"
                                    value={price}
                                    onChange={onInputChange}
                                    className={`${errors.price ? "border-danger" : ""}`}
                                />
                                <small className="text-danger">{errors.price}</small>
                            </Form.Group>
                            {
                                selectedImg !== undefined ?
                                    <div className="py-5 text-center">
                                        <div className="text-end px-3 py-2">
                                            <span className='remove-btn' onClick={removeSelectedImg}>remove</span>
                                        </div>
                                        <img src={selectedImg ? selectedImg : ""} alt="...not found" width={`90`} />
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
                                    name='imageUrl'
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={onInputChangeFile}
                                />
                                <small className="text-danger">{errors.image}</small>
                            </Form.Group>
                            <div className="col-12">
                                <Alert1 alertModal={alertModal} setAlertModal={setAlertModal} />
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={onSubmitForm} disabled={hasChanged}>
                        {
                            process ? "Updating..." : "Save changes"
                        }
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default EditProductModal