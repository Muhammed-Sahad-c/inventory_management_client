import { useState } from 'react';
import '../../assets/styles/login.css';
import { validateLoginDetails } from '../../services/UserAuthentication';

function Login() {
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [process, setProcess] = useState(false);

  const { email, password } = loginDetails;

  const onInputChange = e => {
    const { name, value } = e.target;
    setLoginDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const submitLoginDetails = async e => {
    e.preventDefault();
    if (process === false) {
      setProcess(true);
      const validate = await validateLoginDetails({ email, password });
      const { status, message, token } = validate.data;
      if (status) {
        localStorage.setItem("inventory_user_token", token);
      } else {
        console.log(`sometign went wrong`);
      }
      setProcess(false);
    }
  }

  return (
    <>
      <form action="" onSubmit={submitLoginDetails}>
        <input type="email" placeholder='email' name='email' value={email} onChange={onInputChange} /> <br />
        <input type="password" placeholder='password' name='password' value={password} onChange={onInputChange} /> <br />
        <button type='submit'>login</button>
      </form>
    </>
  )
}

export default Login