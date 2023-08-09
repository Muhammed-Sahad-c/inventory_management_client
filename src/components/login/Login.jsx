import { useState } from 'react';
import '../../assets/styles/login.css';
import { useNavigate } from 'react-router-dom';
import { validateLoginDetails } from '../../services/UserAuthentication';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';

function Login() {
  const navigate = useNavigate();
  const [process, setProcess] = useState(false);
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" })

  const { email, password } = loginDetails;

  const onInputChange = e => {
    const { name, value } = e.target;
    setLoginDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const validateFormDetails = () => {
    const newErrors = {};
    if (email.trim() === "") {
      newErrors.password = "Email cannot be empty"
    }

    if (password.trim() === "") {
      newErrors.email = "Password cannot be empty"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0;
  }

  const submitLoginDetails = async e => {
    e.preventDefault();
    if (process === false) {
      setErrors({ email: "", password: "" });
      setProcess(true);
      if (validateFormDetails()) {
        const validate = await validateLoginDetails({ email, password });
        const { status, message, token } = validate.data;
        if (status) {
          localStorage.setItem("inventory_user_token", token);
          setErrors({ email: "", password: "" });
          navigate("/");
        } else {
          setErrors({ email: message, password: message });
        }
      }
      setProcess(false);
    }
  }

  return (
    <>
      <MDBContainer fluid className='p-3' >
        <MDBRow className='text-center d-flex justify-content-center align-items-center '>
          <MDBCol md='4'>
            <MDBCard className='my-5'>
              <MDBCardBody className='p-5'>
                <div className="text-start py-3 ">
                  <h2 style={{ overflow: "hidden" }}>Welcome back</h2>
                </div>
                <MDBInput wrapperClass='' placeholder='Email' id='email' type='email' size='lg' name='email' className={`rounded-0 ${errors.email ? "border-danger" : ""}`} onChange={onInputChange} />
                <div className="text-start">
                  <small className='text-danger'>{errors.email}</small>
                </div>
                <MDBInput wrapperClass='pt-4' placeholder='Password' id='password' type='password' name='password' size='lg' className={`rounded-0 ${errors.password ? "border-danger" : ""}`} onChange={onInputChange} />
                <div className="text-start pb-4">
                  <small className='text-danger'>{errors.password}</small>
                </div>
                <button className="rounded-0 w-100 py-3 border-0 bg-primary text-white rounded" onClick={submitLoginDetails}>
                  {
                    process ? "Loading...." : "login"
                  }
                </button>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  )
}

export default Login