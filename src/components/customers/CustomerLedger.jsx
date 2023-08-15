import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import DataTableComponent from '../datatable/DataTable';
import EmptyDataStatus from '../emptyitems/EmptyDataStatus';
import { getTransactionDetails } from '../../services/customerServices';
import EmptyTransactions_Img from '../../assets/images/no customers image.png';
import { customerTransactions_Columns } from '../../constants/data-table';

const CustomerLedger = () => {
    const [process, setProcess] = useState(true);
    const [transactionList, setTransactionList] = useState([]);
    const [customerList, stCustomerList] = useState([]);
    const [filteredTransactionList, setFilteredTransactionList] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [fallbackDetalis, setFallBackDetails] = useState({ message: "sdafasdfasdf", image: EmptyTransactions_Img })

    const handleInputChange = (e) => {
        setSelectedCustomer(e.target.value);
    }

    useEffect(() => {
        getTransactionDetails().then(({ data }) => {
            setTransactionList(data.transactionIist);
            setFilteredTransactionList(data.transactionIist)
            stCustomerList(data.customers);
            setProcess(false);
        }).catch(err => {
            setFallBackDetails({ message: "Something wen't wrong, try again!", image: "https://cdni.iconscout.com/illustration/premium/thumb/server-error-8580684-6763409.png?f=webp" })
            setProcess(false);
        })

    }, []);

    useEffect(() => {
        if (selectedCustomer && selectedCustomer !== "Select customer") {
            const filteredData = transactionList.filter(item => item.customerName._id === selectedCustomer);
            setFilteredTransactionList(filteredData);
        } else {
            setFilteredTransactionList(transactionList);
        }
    }, [selectedCustomer]);


    return (
        < >
            <div className="container-fluid p-0">
                <div className="row">
                    <div className="col-12 px-3">
                        <h3 className='px-4 py-3'>Customers</h3>
                    </div>
                    <div className="col-12 d-flex justify-content-center">
                        {
                            process == true ?
                                <div className="col-12 hided-overflow d-flex flex-column justify-content-center align-items-center ">
                                    loading...
                                </div>
                                :
                                <div className='px-4 py-4'>
                                    {
                                        transactionList.length == 0 ?
                                            <EmptyDataStatus message={fallbackDetalis.message} image={fallbackDetalis.image} />
                                            :
                                            <div>
                                                <div className="py-3">
                                                    <Form.Select aria-label="Default select example" name="customerid" className='w-100'
                                                        onChange={handleInputChange}
                                                    >
                                                        <option>Select customer</option>
                                                        {
                                                            customerList.map(item => (
                                                                <option value={item._id}>{item.customerName}</option>
                                                            ))
                                                        }

                                                    </Form.Select>
                                                </div>
                                                <DataTableComponent columns={customerTransactions_Columns} data={filteredTransactionList} />
                                            </div>
                                    }
                                </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default CustomerLedger;
