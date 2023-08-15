import { useEffect, useState } from 'react';
import { getdashboardinfo } from '../../services/reportServices';
import SideBar from '../sidebar/SideBar';

function DashBoard() {
    const style1 = { display: 'flex', height: '100vh', overflow: 'scroll initial' };
    const [state, setstate] = useState({ productCount: 0, salesCount: 0, customerCount: 0 });
    useEffect(() => {
        getdashboardinfo().then(({ data }) => {
            const { productCount, customerCount, salesCount } = data;
            setstate({ productCount, customerCount, salesCount })
        })
    }, []);

    console.log(state)
    return (
        <>
            <div style={style1}>
                <SideBar current_tab={'dashboard'} />
                <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                    <div className="row d-flex justify-content-center">
                        <div className="col-3 rounded py-3 d-flex text-center  justify-content-between align-items-center bg-primary my-3 p-3 mx-2 text-light flex-column">
                            <div className=""><h5>Total Products</h5></div>
                            <div className=""><h5>{state.productCount}</h5></div>
                        </div>
                        <div className="col-3 rounded py-3 d-flex  text-center justify-content-between align-items-center bg-secondary my-3 p-3 mx-2 text-light flex-column">
                            <div className=""><h5>Total Customers</h5></div>
                            <div className=""><h5>{state.customerCount}</h5></div>
                        </div>
                        <div className="col-3 rounded py-3 d-flex text-center  justify-content-between align-items-center bg-success my-3 p-3 mx-2 text-light flex-column">
                            <div className=""><h5>Total Sales</h5></div>
                            <div className=""><h5>{state.salesCount}</h5></div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default DashBoard