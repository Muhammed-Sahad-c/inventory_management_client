import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { getAllBasicProductDetails, getIndividualProductDetails, removeASpecificProductFromList } from '../../services/ProductServices';
import ProductDetailsModal from '../modals/ProductDetailsModal';
import AlertModal from '../modals/AlertModal';

const DataTable = ({ alert, setAlert }) => {
    const [deleteId, setDeleteId] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [productList, setProductList] = useState([]);
    const [req_process, setReq_process] = useState(false);
    const [warningModal, setWarningModal] = useState(false);
    const [productDetails, setProductDetails] = useState({});
    const [viewProductModal, setViewProductModal] = useState(false);

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
            const { status, message } = response.data
            if (status) {
                setWarningModal(false);
                const updatedState = productList.filter(item => item._id !== deleteId._id)
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

    useEffect(() => {
        getAllBasicProductDetails().then(({ data }) => {
            setProductList(data.products);
        })
    }, []);


    return (
        <>
            <input
                type="text"
                value={searchTerm}
                placeholder="Search items by name"
                className='py-2 px-4 my-3'
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
                                    <button className='btn btn-sm text-success'><small>edit</small></button>
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

            {/* view product modal */}
            <ProductDetailsModal
                show={viewProductModal}
                setShow={setViewProductModal}
                productDetails={productDetails}
                setProductDetails={setProductDetails}
            />

            {/* delete product alert */}
            <AlertModal
                show={warningModal}
                setShow={setWarningModal}
                proceedFn={deleteASpecificProduct}
            />
        </>
    );
};

export default DataTable;