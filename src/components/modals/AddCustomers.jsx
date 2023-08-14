import React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { submitCustomerDetails } from '../../services/customerServices';
import Alert1 from '../alerts/Alert1';

export default function AddCustomers({ show, setShow, customerDetails, setCustomerDetails, errors, setErrors, customerList, setCustomersList, setSuccessAlert }) {

    const [process, setProcess] = useState(false);
    const [alertModal, setAlertModal] = useState({ status: false, message: "", variant: "" });

    const { customerName, address, mobileNumber } = customerDetails;

    const handleClose = () => setShow(false);

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerDetails(prevDetails => ({
            ...prevDetails,
            [name]: value.trimStart(),
        }));
    }

    const validateForm = () => {
        const newErrors = {};
        if (!customerName) {
            newErrors.name = "Name is empty"
        }

        if (!address) {
            newErrors.address = "Address is empty"
        }

        if (!mobileNumber) {
            newErrors.number = "Number is empty"
        } else if (mobileNumber.length !== 10) {
            newErrors.number = "Number should contain 10 digits"
        } else if (mobileNumber < 0) {
            newErrors.number = "Enter valid mobile number"
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            if (!process) {
                setProcess(true);
                if (validateForm()) {
                    const response = await submitCustomerDetails(customerDetails);
                    const { status, customer, message } = response.data;
                    if (status) {
                        setCustomersList(prevList => [customer, ...prevList]);
                        setShow(false);
                        setSuccessAlert({ status: true, message: "Customer created successfully", variant: "success" })
                    } else {
                        setErrors({
                            name: message,
                            address: "",
                            number: ""
                        });
                    }
                }
                setProcess(false);
            }
        } catch (error) {
            console.log(error)
            setAlertModal({ status: true, message: error.response.data.message, variant: "danger" });
            setProcess(false);
        }
    }

    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add customer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                autoFocus
                                type="text"
                                placeholder="Name"
                                name='customerName'
                                value={customerName}
                                onChange={onInputChange}
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
                                name='address'
                                value={address}
                                placeholder="Address"
                                onChange={onInputChange}
                                className={`${errors.address ? "border-danger" : ""}`}
                            />
                            <small className="text-danger">{errors.address}</small>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Control
                                autoFocus
                                type="number"
                                name='mobileNumber'
                                value={mobileNumber}
                                onChange={onInputChange}
                                placeholder="Mobile Number"
                                className={`${errors.number ? "border-danger" : ""}`}
                            />
                            <small className="text-danger">{errors.number}</small>
                        </Form.Group>
                        <Alert1 alertModal={alertModal} setAlertModal={setAlertModal} />
                    </Form>
                </Modal.Body>
                <Modal.Footer className='py-4'>
                    <Button variant="" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={onSubmitForm} disabled={process}>
                        {process ? "loading...." : "Create"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

