import Alert1 from '../alerts/Alert1';
import React, { useState } from 'react';
import EmptyDataStatus from '../emptyitems/EmptyDataStatus';
import { useEffect } from 'react';
import { getSalesReport } from '../../services/reportServices';
import NoResult from '../../assets/images/no-result-data-document-or-file-not-found-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-etc-vector-removebg-preview.png'
import { salesReport_Columns } from '../../constants/data-table';
import DataTableComponent from '../datatable/DataTable';

const SalesReport = () => {
    const [process, setProcess] = useState(true)
    const [dataStatus, setDataStatus] = useState({ message: "No Records", image: NoResult });
    const [alertModal, setAlertModal] = useState({ status: false, message: "", variant: "" });
    const [salesList, setSalesList] = useState([]);

    useEffect(() => {
        getSalesReport().then(({ data }) => {
            setSalesList(data.details)
            setProcess(false);
        }).catch(err => {
            setDataStatus({ message: "asdfkjasdlkfjaslkddf", image: "https://cdni.iconscout.com/illustration/premium/thumb/server-error-8580684-6763409.png?f=webp" })
            setProcess(false);
        })
    }, []);

    return (
        <>
            <div className="container-fluid p-0">
                <div className="row">
                    <div className="col-12 px-3">
                        <h3 className='px-4 py-3'>Sales report</h3>
                    </div>
                    <div className="col-12 px-5">
                        <Alert1 alertModal={alertModal} setAlertModal={setAlertModal} />
                    </div>
                    <div className="col-12 px-5 py-5">
                        {
                            process ?
                                <div className="col-12 hided-overflow d-flex flex-column justify-content-center align-items-center ">
                                    loading...
                                </div>
                                :
                                <div>
                                    {
                                        salesList.length == 0 ?
                                            <EmptyDataStatus message={dataStatus.message} image={dataStatus.image} />
                                            :
                                            <DataTableComponent columns={salesReport_Columns} data={salesList} />
                                    }
                                </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default SalesReport;
