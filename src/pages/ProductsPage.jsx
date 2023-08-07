import React from 'react'
import Products from '../components/Products/Products';
import SideBar from '../components/sidebar/SideBar';

function ProductsPage() {
    const style1 = { display: 'flex', height: '100vh', overflow: 'scroll initial' };

    return (
        <>
            <div style={style1}>
                <SideBar current_tab={'products'} />
                <Products />
            </div>
        </>
    )
}

export default ProductsPage