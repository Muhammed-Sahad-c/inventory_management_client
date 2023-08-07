import { useState } from 'react'
import "../../assets/styles/products.css";
import AddProductModal from '../modals/AddProductModal';

function Products() {
    const [process, setProcess] = useState(false);
    const [selectedImg, setSelectedImg] = useState(undefined);
    const [addProductModal, setAddProductModal] = useState(false);
    const [addProductStatus, setAddProductStatus] = useState(false);
    const [errors, setErrors] = useState({ name: "", description: "", quantity: "", price: "", image: "" });
    const [productDetails, setProductDetails] = useState({ name: "", description: "", quantity: "", price: "", image: undefined });

    const { name, description, quantity, price, image } = productDetails

    const showAddProductModal = () => {
        setAddProductModal(true);
        setSelectedImg(undefined);
        setAddProductStatus(false);
        setErrors({ name: "", description: "", quantity: "", price: "", image: "" });
        setProductDetails({ name: "", description: "", quantity: "", price: "", image: undefined });
    };

    const validateForm = () => {
        const newErrors = {};

        if (name.trimEnd().length === 0) {
            newErrors.name = "* Name cannot be empty";
        } else if (name.length > 50) {
            newErrors.name = "* name should not exceed 50 characters.";
        }

        if (description.trimEnd().length === 0) {
            newErrors.description = "* Description cannot be empty";
        } else if (description.length > 200) {
            newErrors.description = "* description should not exceed 200 characters.";
        }

        if (quantity.length === 0) {
            newErrors.quantity = "* Quantity cannot be empty";
        } else if (quantity <= 0 || quantity >= 2147483647) {
            newErrors.quantity = "* Enter valid amount of quantity";
        }

        if (price.length === 0) {
            newErrors.price = "* Price cannot be empty";
        } if (price <= 0) {
            newErrors.price = "* enter valid amount";
        }

        if (image === undefined) {
            newErrors.image = "* Please choose an image"
        } else if (image.type.startsWith('image') === false) {
            newErrors.image = "invalid file please select jpg /jpeg/png ...etc"
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const submitUserForm = e => {
        e.preventDefault();
        if (process === false) {
            setProcess(true);
            setAddProductStatus(true)
            if (validateForm()) {
                const product_photo = new FormData();
                product_photo.append('file', image);
                const request_data = {
                    product_photo,
                    price: +price,
                    quantity: +quantity,
                    name: name.trimEnd(),
                    description: description.trimEnd(),
                }
                // send api request
                setProcess(false);
                setAddProductStatus(false);
                console.log(request_data);
            }
        }
    }

    return (
        <>
            <div className="container-fluid p-0">
                <div className="row">
                    <div className="col-12">
                        <h2 className='px-3 py-3'>Products</h2>
                    </div>
                    <div className="col-12 d-flex justify-content-end px-5">
                        <button className="btn btn-success py-2 px-3" onClick={showAddProductModal}>add product</button>
                        <AddProductModal
                            errors={errors}
                            setErrors={setErrors}
                            show={addProductModal}
                            selectedImg={selectedImg}
                            status={addProductStatus}
                            setShow={setAddProductModal}
                            productDetails={productDetails}
                            setSelectedImg={setSelectedImg}
                            submitFormDetails={submitUserForm}
                            setProductDetails={setProductDetails}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products