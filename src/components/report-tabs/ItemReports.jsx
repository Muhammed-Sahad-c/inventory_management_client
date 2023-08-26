import Alert1 from '../alerts/Alert1';
import React, { useEffect, useState } from 'react';
import DataTableComponent from '../datatable/DataTable';
import CreateSaleModal from '../modals/CreateSaleModal';
import EmptyDataStatus from '../emptyitems/EmptyDataStatus';
import { ItemReport_colums } from '../../constants/data-table';
import { getItemsReport } from '../../services/reportServices';
// import NoResult from '../../assets/images/no-result-data-document-or-file-not-found-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-etc-vector-removebg-preview.png'


const ItemReports = () => {
    const error_obj = { customerName: "", quantity: "", product: "", date: "", paymentMethod: "" };
    const [process, setProcess] = useState(true);
    const [errors, setErrors] = useState(error_obj);
    const [showModal, setShowModal] = useState(false);
    const [itemReports, setItemReports] = useState([]);
    const [alertModal, setAlertModal] = useState({ status: false, message: "", variant: "" });
    const [fallbackDetails, setFallbackDetails] = useState({ message: "no records find", image: "" });
    const [salesDetails, setSalesDetails] = useState({ customerName: "", quantity: "", product: "", date: "", paymentMethod: "" });

    const openCreateSaleModal = () => {
        setShowModal(true);
        setErrors(error_obj);
        setSalesDetails(error_obj);
    }

    useEffect(() => {
        getItemsReport().then(({ data }) => {
            setItemReports(data.itemsReport);
            setProcess(false);
        }).catch(err => {
            setFallbackDetails({ message: "Something wen't wrong, try again!", image: "https://cdni.iconscout.com/illustration/premium/thumb/server-error-8580684-6763409.png?f=webp" })
            setItemReports([]);
            setProcess(false);
        })
    }, []);

    return (
        <>
            <div className="container-fluid p-0">
                <div className="row">
                    <div className="col-12 px-3">
                        <h3 className='px-4 py-3'>Item reports</h3>
                    </div>
                    <div className="col-12 px-5">
                        <Alert1 alertModal={alertModal} setAlertModal={setAlertModal} />
                    </div>
                    <div className="col-12 d-flex justify-content-end px-5">
                        <button className="btn btn-success py-2 px-3 btn-sm" onClick={openCreateSaleModal}>
                            <small>+</small>
                        </button>
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
                                        itemReports.length == 0 ?
                                            <EmptyDataStatus message={fallbackDetails.message} image={fallbackDetails.image} />
                                            :
                                            <DataTableComponent columns={ItemReport_colums} data={itemReports}  />
                                    }
                                </div>
                        }
                    </div>
                </div>
            </div>
            <CreateSaleModal
                errors={errors}
                show={showModal}
                setErrors={setErrors}
                setShow={setShowModal}
                itemReports={itemReports}
                salesDetails={salesDetails}
                setAlertModal={setAlertModal}
                setItemReports={setItemReports}
                setSalesDetails={setSalesDetails}
            />
        </>
    );
}

export default ItemReports;
