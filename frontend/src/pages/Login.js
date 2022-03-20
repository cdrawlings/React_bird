import React from 'react';
import {useState} from "react";
import {toast} from "react-toastify";
import {FaSignInAlt} from "react-icons/fa";
import {useSelector, useDispatch} from "react-redux";
import {login, register} from '../features/auth/authSlice'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const dispatch = useDispatch();

    const {user, isLoading, isSuccess, message} = useSelector(state => state.auth)

    const { email, password} = formData

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
                email,
                password
        }

        dispatch(login(userData))

    }

    return (
        <>
            <section className='header-title'>
                <h1><FaSignInAlt /> Login</h1>
            </section>
            <section>
                <form onSubmit={onSubmit} className='form-group'>
                    <input className='form-control' type="email" name="email" id="email" value={email} onChange={onChange} placeholder='Email' required />
                    <input className='form-control' type="password" name="password" id="password" value={password} onChange={onChange} placeholder='Password' required />
                    <div className="form-group">
                        <button type='submit' className='btn btn-register'>Submit</button>
                    </div>
                </form>
            </section>

        </>
    );
}

export default Login;