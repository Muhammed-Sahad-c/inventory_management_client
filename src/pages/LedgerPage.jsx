import CustomerLedger from '../components/customers/CustomerLedger';
import SideBar from '../components/sidebar/SideBar';
import { style1 } from '../constants/constant-variables';

const LedgerPage = () => {
    return (
        <>
            <div style={style1}>
                <SideBar current_tab={'ledger'} />
                <CustomerLedger />
            </div>
        </>
    );
}

export default LedgerPage;
