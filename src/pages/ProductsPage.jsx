import React, { Suspense } from 'react'
import SideBar from '../components/sidebar/SideBar';
import { style1 } from '../constants/constant-variables.js';
import LoadingComponent from '../components/placeholders/LoadingComponent';
const Products = React.lazy(() => import('../components/Products/Products'));

function ProductsPage() {
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