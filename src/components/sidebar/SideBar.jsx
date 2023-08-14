import '../../assets/styles/sidebar.css';
import { NavLink } from 'react-router-dom';
import { CDBSidebar, CDBSidebarContent, CDBSidebarFooter, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem } from 'cdbreact';


function SideBar({ current_tab }) {
    const sidebar_active = `bg-primary text-white`;
    return (
        <>
            <CDBSidebar className='sidebarbody'>
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <NavLink exact to="/" className="text-decoration-none text-dark" >
                        <img src="../../../public/brandLogo.png" alt="logo (not found)" className='sidebar-logo' />
                        <span className='px-3'>InventoSync</span>
                    </NavLink>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content text-dark">
                    <CDBSidebarMenu>
                        <NavLink exact to="/" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="columns" className={`sidebar-items rounded ${current_tab === 'dashboard' ? sidebar_active : ""}`}>Dashboard</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/products" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="box" className={`sidebar-items rounded ${current_tab === 'products' ? sidebar_active : ""}`}>Products</CDBSidebarMenuItem>
                        </NavLink>
                        <NavLink exact to="/customers" activeClassName="activeClicked">
                            <CDBSidebarMenuItem icon="user" className={`sidebar-items rounded ${current_tab === 'customers' ? sidebar_active : ""}`}>Customers</CDBSidebarMenuItem>
                        </NavLink>
                    </CDBSidebarMenu>
                </CDBSidebarContent>
                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                </CDBSidebarFooter>
            </CDBSidebar>
        </>
    )
}

export default SideBar