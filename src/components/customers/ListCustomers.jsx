// import Table from 'react-bootstrap/Table';
import React, { useEffect, useState } from 'react'
import EmptyDataStatus from '../emptyitems/EmptyDataStatus';
const Table = React.lazy(() => import('react-bootstrap/Table'));
import { getCustomerList } from '../../services/customerServices';
import EmptyCustomersImage from '../../assets/images/no customers image.png';

export const ListCustomers = ({ customersList, setCustomersList }) => {
    const [process, setProcess] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredData = customersList.filter(item =>
        item.customerName.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    useEffect(() => {
        getCustomerList().then(({ data }) => {
            setCustomersList(data.customerList ? data.customerList : []);
            setProcess(false);
        }).catch(err => {
            setCustomersList([]);
            setProcess(false);
        });
    }, []);


    return (
        <>
            {
                process ?
                    <div className="col-12 hided-overflow d-flex flex-column justify-content-center align-items-center ">
                        loading...
                    </div>

                    :

                    <div>
                        {
                            customersList.length === 0 ?
                                <div>
                                    <EmptyDataStatus message={"No customers"} image={EmptyCustomersImage} />
                                </div>
                                :
                                <div>
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        className='py-1 px-4 my-3'
                                        placeholder="Search customers........"
                                        onChange={e => setSearchTerm(e.target.value)}
                                    />
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Address</th>
                                                <th>Mobile</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                filteredData.map((item) => (
                                                    <tr key={item._id}>
                                                        <td>
                                                            <small>{item.customerName}</small>
                                                        </td>
                                                        <td>
                                                            <small>{item.address}</small>
                                                        </td>
                                                        <td >
                                                            <small>+91 {item.mobileNumber}</small>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </Table>
                                </div>
                        }
                    </div>
            }
        </>
    )
}

