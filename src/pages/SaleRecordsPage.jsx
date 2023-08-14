import React, { Suspense } from 'react';
import LoadingComponent from '../components/placeholders/LoadingComponent';
const SalesReport = React.lazy(() => import("../components/report-tabs/SalesReport"));
import SideBar from '../components/sidebar/SideBar';
import { style1 } from '../constants/constant-variables';

const SaleRecordsPage = () => {
    return (
        <div style={style1}>
            <SideBar current_tab={'sales'} />
            <Suspense fallback={<LoadingComponent />}>
                <SalesReport />
            </Suspense>
        </div>
    );
}

export default SaleRecordsPage;
