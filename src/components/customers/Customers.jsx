import { useState } from 'react';
import Alert1 from '../alerts/Alert1';
import AddCustomers from '../modals/AddCustomers';
import { ListCustomers } from '../customers/ListCustomers'

export default function Customers() {

    const errorMessage_obj = { name: "", address: "", number: "" };
    const customerData_obj = { customerName: "", address: "", mobileNumber: "" };

    const [errors, setErrors] = useState(errorMessage_obj);
    const [customersList, setCustomersList] = useState([]);
    const [addCustomerModal, setAddCustomerModal] = useState(false);
    const [customerDetails, setCustomerDetails] = useState(customerData_obj);
    const [alertModal, setAlertModal] = useState({ status: false, message: "", variant: "" });

    const showAddCustomerModal = () => {
        setErrors(errorMessage_obj);
        setCustomerDetails(customerData_obj);
        setAddCustomerModal(true);
    }

    return (
        <>
            <div className="container-fluid p-0">
                <div className="row">
                    <div className="col-12 px-3">
                        <h3 className='px-4 py-3'>Customers</h3>
                    </div>
                    <div className="col-12 px-5">
                        <Alert1 alertModal={alertModal} setAlertModal={setAlertModal} />
                    </div>
                    <div className="col-12 d-flex justify-content-end px-5">
                        <button className="btn btn-success py-2 px-3 btn-sm" onClick={showAddCustomerModal}>
                            <small>+ Add customers</small>
                        </button>
                    </div>
                    <div className="col-12 px-5 py-5">
                        <ListCustomers
                            customersList={customersList}
                            setCustomersList={setCustomersList}
                        />
                    </div>
                </div>
            </div>

            <AddCustomers
                errors={errors}
                setErrors={setErrors}
                show={addCustomerModal}
                setShow={setAddCustomerModal}
                customersList={customersList}
                setSuccessAlert={setAlertModal}
                customerDetails={customerDetails}
                setCustomersList={setCustomersList}
                setCustomerDetails={setCustomerDetails}
            />
        </>
    )
}

