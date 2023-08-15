import "../../assets/styles/products.css";
import React, { Suspense, useState } from 'react';
const Alert1 = React.lazy(() => import("../alerts/Alert1"));
import { createNewProduct } from '../../services/ProductServices';
const DataTable = React.lazy(() => import('../Products/ProductList'));
const AddProductModal = React.lazy(() => import("../modals/AddProductModal"));

function Products() {
    const [process, setProcess] = useState(false);
    const [productList, setProductList] = useState([]);
    const [selectedImg, setSelectedImg] = useState(undefined);
    const [addProductModal, setAddProductModal] = useState(false);
    const [addProductStatus, setAddProductStatus] = useState(false);
    const [alertModal, setAlertModal] = useState({ status: false, message: "", variant: "" });
    const [errors, setErrors] = useState({ name: "", description: "", quantity: "", price: "", image: "" });
    const [productDetails, setProductDetails] = useState({ name: "", description: "", quantity: "", price: "", image: undefined });

    const { name, description, quantity, price, image } = productDetails;

    const clearform = () => {
        setSelectedImg(undefined);
        setAddProductStatus(false);
        setErrors({ name: "", description: "", quantity: "", price: "", image: "" });
        setProductDetails({ name: "", description: "", quantity: "", price: "", image: undefined });
    }

    const showAddProductModal = () => {
        clearform();
        setAddProductModal(true);
        setSelectedImg(undefined);
        setAddProductStatus(false);
    };

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

    const submitUserForm = async e => {
        e.preventDefault();
        if (process === false) {
            setProcess(true);
            setAddProductStatus(true);
            if (validateForm()) {
                const formData = new FormData();
                formData.append('file', image);
                const productInfo = {
                    price: +price,
                    quantity: +quantity,
                    name: name.trimEnd(),
                    description: description.trimEnd(),
                }
                formData.append('product_details', JSON.stringify(productInfo));
                const response = await createNewProduct(formData);
                const { status, message, new_product } = response.data;
                if (status) {
                    setAlertModal({ status: true, message: message, variant: "success" });
                    setProductList(prev_list => [new_product, ...prev_list])
                    setAddProductModal(false);
                } else if (status === false) {
                    setAddProductModal(false);
                    setAlertModal({ status: true, message: message, variant: "danger" });
                } else {
                    const newErrors = { name: message, description: "", price: "", quantity: "", image: "" };
                    setErrors(newErrors);
                }
            }
            setProcess(false);
            setAddProductStatus(false);
        }
    };

    return (
        <>
            <div className="container-fluid p-0">
                <div className="row">
                    <div className="col-12 px-3">
                        <h3 className='px-4 py-3'>Products</h3>
                    </div>
                    <div className="col-12 px-5">
                        <Alert1 alertModal={alertModal} setAlertModal={setAlertModal} />
                    </div>
                    <div className="col-12 d-flex justify-content-end px-5">
                        <button className="btn btn-success py-2 px-3 btn-sm" onClick={showAddProductModal}>
                            <small>Add product</small>
                        </button>
                    </div>
                    <div className="col-12 px-5 py-5">
                        <Suspense fallback={<div>loading.....</div>}>
                            <DataTable
                                alert={alertModal}
                                setAlert={setAlertModal}
                                productList={productList}
                                setProductList={setProductList}
                            />
                        </Suspense>
                    </div>
                </div>
            </div>
            <Suspense>
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
            </Suspense>
        </>
    )
}

export default Products