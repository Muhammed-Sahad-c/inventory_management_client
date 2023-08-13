import React, { useEffect, useState } from 'react';
const Table = React.lazy(() => import("react-bootstrap/Table"));
const AlertModal = React.lazy(() => import("../modals/AlertModal"));
const EditProductModal = React.lazy(() => import("../modals/EditProductModal"));
const ProductDetailsModal = React.lazy(() => import("../modals/ProductDetailsModal"));

import { getAllBasicProductDetails, getIndividualProductDetails, removeASpecificProductFromList } from '../../services/ProductServices';

const DataTable = ({ alert, setAlert, productList, setProductList }) => {
    const [deleteId, setDeleteId] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [req_process, setReq_process] = useState(false);
    const [warningModal, setWarningModal] = useState(false);
    const [editProDetails, setEditProDetails] = useState({});
    const [productDetails, setProductDetails] = useState({});
    const [editProdModal, setEditProdModal] = useState(false);
    const [viewProductModal, setViewProductModal] = useState(false);
    const [initialProductDetails, setInitialProductDetails] = useState({});

    const filteredData = productList.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const viewFullProductDetails = async prod_id => {
        setProductDetails({});
        if (req_process === false) {
            setReq_process(true);
            const prod_details = await getIndividualProductDetails(prod_id);
            console.log(prod_details)
            const { status, message, fullDetails } = prod_details.data;
            if (status === true) {
                setProductDetails(fullDetails);
                setViewProductModal(true);
            } else {
                setAlert({ status: true, message: message, variant: "danger" })
            }
            setReq_process(false);
        }
    }

    const deleteASpecificProduct = async () => {
        if (req_process === false) {
            setReq_process(true);
            const response = await removeASpecificProductFromList(deleteId._id);
            const { status, message } = response.data;
            if (status) {
                setWarningModal(false);
                const updatedState = productList.filter(item => item._id !== deleteId._id);
                setProductList(updatedState);
                setAlert({ status: true, message: message, variant: "success" });
            } else {
                setAlert({ status: true, message: message, variant: "danger" });
            }
            setDeleteId({});
            setReq_process(false);
        }
    }

    const showWarningBeforeDelete = prodDetails => {
        setWarningModal(true);
        setDeleteId(prodDetails);
    }

    const editProductDetails = async prod_id => {
        const prod_details = await getIndividualProductDetails(prod_id);
        if (prod_details.data.status) {
            setInitialProductDetails(prod_details.data.fullDetails)
            setEditProDetails(prod_details.data.fullDetails);
            setEditProdModal(true);
        } else {
            // some error occurred
        }
    }

    useEffect(() => {
        getAllBasicProductDetails().then(({ data }) => {
            if (data.products.length !== 0) {
                setProductList(data.products);
            }
        })
    }, []);


    return (
        <>
            {
                productList == 0 ?
                    <div className="col-12 px-5 py-5 text-center emptyProduts">
                        <img src="https://cdni.iconscout.com/illustration/premium/thumb/no-product-8316266-6632286.png" alt="" />
                        <h6 className='text-muted'>No Products</h6>
                    </div>
                    :
                    <div>
                        <input
                            type="text"
                            value={searchTerm}
                            className='py-2 px-4 my-3'
                            placeholder="Search items by name"
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <small>{item.name}</small>
                                            <div className='d-flex gap-1 pt-4 justify-content-end'>
                                                <button className='btn btn-sm text-primary' onClick={() => viewFullProductDetails(item._id)}><small>view</small></button>
                                                <button className='btn btn-sm text-success' onClick={() => editProductDetails(item._id)}><small>edit</small></button>
                                                <button className='btn btn-sm text-danger' onClick={() => showWarningBeforeDelete(item)}><small>delete</small></button>
                                            </div>
                                        </td>
                                        <td>{item.price}</td>
                                        <td>
                                            <img src={item.imageUrl} alt={""} style={{ width: '50px', height: '50px', objectFit: "contain" }} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
            }

            <ProductDetailsModal
                show={viewProductModal}
                setShow={setViewProductModal}
                productDetails={productDetails}
                setProductDetails={setProductDetails}
            />

            <AlertModal
                show={warningModal}
                setShow={setWarningModal}
                proceedFn={deleteASpecificProduct}
            />

            <EditProductModal
                show={editProdModal}
                productLIst={productList}
                setShow={setEditProdModal}
                setProductList={setProductList}
                currentProductDetails={editProDetails}
                setCurrentProductDetails={setEditProDetails}
                initialProductDetails={initialProductDetails}
            />
        </>
    );
};

export default DataTable;
