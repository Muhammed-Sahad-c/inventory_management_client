import SideBar from '../components/sidebar/SideBar'
import Customers from '../components/customers/Customers';
import { style1 } from '../constants/constant-variables.js';

function CustomersPage() {
  return (
    <div style={style1}>
      <SideBar current_tab={'customers'} />
      <Customers />
    </div>
  )
}

export default CustomersPage