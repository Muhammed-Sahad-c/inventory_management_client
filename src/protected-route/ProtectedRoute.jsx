import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { setUserDetails } from '../reducers/UserReducer.js';
import { getUserDetails } from '../services/UserAuthentication.js';
import BorderSpinner from '../components/spinner/BorderSpinner.jsx';

function ProtectedRoute({ route }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [auth, setAuth] = useState(null);

    const redirect_path = route;

    useEffect(() => {
        getUserDetails().then(response => {
            const { userData, status, token } = response.data;
            if (status) {
                localStorage.setItem("inventory_user_token", token);
                dispatch(setUserDetails(userData));
                setAuth(true);
            } else {
                setAuth(false);
            }
        }).catch(() => {
            setAuth(false);
        })
    }, []);


    if (auth == null) {
        return (
            <>
                <div className="background_loading">
                    <BorderSpinner />
                </div>
            </>
        )
    }

    return auth ? <Outlet /> : navigate(redirect_path);
}

export default ProtectedRoute