import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { getProductAndCustomerDetails, submitSalesDetails } from '../../services/reportServices';
import Alert1 from '../alerts/Alert1';

const CreateSaleModal = ({ show, setShow, salesDetails, setSalesDetails, errors, setErrors, setItemReports, itemReports, setAlertModal }) => {
    const alertObj = { status: false, message: "", variant: "" };

    const [products, setProducts] = useState([]);
    const [process, setProcess] = useState(false)
    const [customers, setCustomers] = useState([]);
    const [alert, setAlert] = useState(alertObj);

    const { customerName, quantity, product, date, paymentMethod } = salesDetails;

    const handleClose = () => {
        if (!process) {
            setShow(false);
            setAlert(alertObj)
        }
    };

    const handleInputChange = event => {
        const { name, value } = event.target;
        setSalesDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!customerName) {
            newErrors.customerName = "Customer name is required.";
        }
        if (!quantity) {
            newErrors.quantity = "Quantity is required.";
        } else {
            const selectedProductObj = products.find(productObj => productObj._id === product)
            if (Number(quantity) <= 0) {
                newErrors.quantity = "Quantity must be greater than 0.";
            } else if (selectedProductObj && Number(quantity) > selectedProductObj.quantity) {
                newErrors.quantity = "Quantity exceeds available product quantity.";
            }
        }

        if (!product) {
            newErrors.product = "Product selection is required.";
        }
        if (!date) {
            newErrors.date = "Date is required.";
        }
        if (!paymentMethod) {
            newErrors.paymentMethod = "Choose method";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmitForm = async () => {
        if (!process) {
            setProcess(true);
            if (validateForm()) {
                try {
                    const response = await submitSalesDetails(salesDetails);
                    const { updatedDataObj } = response.data;
                    console.log(updatedDataObj);
                    const updatedList = itemReports.map((item) => item._id === updatedDataObj._id ? updatedDataObj : item)
                    setItemReports(updatedList);
                    setShow(false);
                    setAlertModal({ status: true, message: "created successfully", variant: "success" });
                } catch (error) {
                    setAlert({ status: true, message: "Something went wrong try again!", variant: "danger" });
                }
            }
            setProcess(false);
        }
    }

    useEffect(() => {
        getProductAndCustomerDetails().then(({ data }) => {
            setCustomers(data.customers);
            setProducts(data.products);
        }).catch(err => {
            setAlert({ status: true, message: "Something went wrong try again!", variant: "danger" });
        })
    }, []);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sales Record Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Select aria-label="Default select example" name='customerName' value={customerName} onChange={handleInputChange}>
                                <option>Select customer</option>
                                {customers.map(customer => (
                                    <option key={customer._id} value={customer._id}>
                                        {customer.customerName}
                                    </option>
                                ))}
                            </Form.Select>
                            <small className="text-danger">{errors.customerName}</small>
                        </Form.Group>
                        <div className="row">
                            <div className="col-4">
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Control
                                        type="number"
                                        name="quantity"
                                        placeholder='Quantity'
                                        value={quantity}
                                        onChange={handleInputChange}
                                    />
                                    <small className="text-danger">{errors.quantity}</small>
                                </Form.Group>
                            </div>
                            <div className="col-4">
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Control
                                        type="date"
                                        name="date"
                                        value={salesDetails.date}
                                        onChange={handleInputChange}
                                    />
                                    <small className="text-danger">{errors.date}</small>
                                </Form.Group>
                            </div>
                            <div className="col-4"><Form.Select aria-label="Default select example" name="paymentMethod"
                                value={paymentMethod}
                                onChange={handleInputChange}>
                                <option>payment type</option>
                                <option value="credit card">Credi card</option>
                                <option value="cash">cash</option>
                            </Form.Select>
                                <small className="text-danger">{errors.paymentMethod}</small></div>
                        </div>
                        <Form.Select
                            aria-label="Default select example"
                            name="product"
                            value={salesDetails.product}
                            onChange={handleInputChange}
                        >
                            <option>Select product</option>
                            {products.map(product => (
                                <option key={product._id} value={product._id}>
                                    {product.name}
                                </option>
                            ))}
                        </Form.Select>
                        <small className="text-danger">{errors.product}</small>
                    </Form>
                    <div className="py-5">
                        <Alert1 setAlertModal={setAlert} alertModal={alert} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={onSubmitForm} disabled={process}>
                        {process ? "creating .." : "Proceed"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CreateSaleModal;
