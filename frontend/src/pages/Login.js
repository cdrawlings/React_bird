import React from 'react';
import {useState, useEffect} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {FaSignInAlt} from "react-icons/fa";
import {useSelector, useDispatch} from "react-redux";
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth)

    const { email, password} = formData


    useEffect(() => {
            if (isError){
                toast.error(message)
            }

            if(isSuccess || user) {
                navigate('/')
            }

            dispatch(reset())
        },
        [isLoading, isSuccess, isError, message, navigate, dispatch, user]
    )


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

    if (isLoading) {
        return <Spinner />
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