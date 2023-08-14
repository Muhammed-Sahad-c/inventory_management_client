import SideBar from '../components/sidebar/SideBar'
import { style1 } from '../constants/constant-variables.js';
import ItemReports from '../components/report-tabs/ItemReports';

const ItemReportsPage = () => {
    return (
        <>
            <div style={style1}>
                <SideBar current_tab={'items'} />
                <ItemReports />
            </div>
        </>
    );
}

export default ItemReportsPage;
