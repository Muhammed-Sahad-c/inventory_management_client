import React, { Suspense } from 'react'
import LoadingComponent from '../components/placeholders/LoadingComponent';
import SideBar from '../components/sidebar/SideBar';
const Products = React.lazy(() => import('../components/Products/Products'));

function ProductsPage() {
    const style1 = { display: 'flex', height: '100vh', overflow: 'scroll initial' };

    return (
        <>
            <div style={style1}>
                <SideBar current_tab={'products'} />
                <Suspense fallback={<LoadingComponent />}>
                    <Products />
                </Suspense>
            </div>
        </>
    )
}

export default ProductsPage