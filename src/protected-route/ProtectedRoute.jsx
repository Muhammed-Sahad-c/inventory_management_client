import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { setUserDetails } from '../reducers/UserReducer.js';
import { getUserDetails } from '../services/UserAuthentication.js';
function ProtectedRoute({ route }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const state = useSelector(state => { return state });
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        getUserDetails().then(response => {
            console.log(response.data)
            const { userData, status, token } = response.data;
            if (status) {
                localStorage.setItem("inventory_user_token", token);
                dispatch(setUserDetails(userData));
                setAuth(true);
            } else {
                setAuth(false);
            }
        }).catch((err) => {
            setAuth(false);
        })
    }, []);


    if (auth == null) {
        return (
            <>
                <h1>loading...</h1>
            </>
        )
    }

    return auth ? <Outlet /> : navigate(route);
}

export default ProtectedRoute