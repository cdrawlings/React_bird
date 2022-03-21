import React from 'react';
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useSelector, useDispatch} from "react-redux";
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password2: '',
    })

    const {firstname, lastname, email, password, password2} = formData

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

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

        if (password !== password2) {
            toast.error('Passwords do not match')
        } else {
            const userData = {
                firstname,
                lastname,
                email,
                password
            }
            dispatch(register(userData))
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className='header-title'>
                <h1>Register</h1>
                <p>Create an account and start tracking the birds you see!</p>
            </section>
            <section>
                <form onSubmit={onSubmit} className='form-group'>
                    <input className='form-control' type="text" name="firstname" id="firstname" value={firstname}
                           onChange={onChange} placeholder='First name' required/>
                    <input className='form-control' type="text" name="lastname" id="lastname" value={lastname}
                           onChange={onChange} placeholder='Last name' required/>
                    <input className='form-control' type="email" name="email" id="email" value={email}
                           onChange={onChange} placeholder='Email' required/>
                    <input className='form-control' type="password" name="password" id="password" value={password}
                           onChange={onChange} placeholder='Password' required/>
                    <input className='form-control' type="password" name="password2" id="password2" value={password2}
                           onChange={onChange} placeholder='Confirm password' required/>
                    <div className="form-group">
                        <button type='submit' className='btn btn-register'>Submit</button>
                    </div>
                </form>
            </section>

        </>
    );
}

export default Register;