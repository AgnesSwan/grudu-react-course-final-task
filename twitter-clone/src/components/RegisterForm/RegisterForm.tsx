import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import _ from 'lodash';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authenticatedUserAtom, } from '../../recoil/atom';
import { User } from '../../types/user';
import './RegisterForm.css';

const RegisterForm: React.FC = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<User>({ criteriaMode: "all" });
    const [authenticatedUser, setauthenticatedUser] = useRecoilState(authenticatedUserAtom);
    const [isError, setIsError] = useState(false);

    const onSubmit = async (data: User) => {
        await axios.post('http://localhost:3001/users', data).then(res => {
            setauthenticatedUser({
                isAuthenticated: true,
                user: res.data
            })
        }).catch(err => setIsError(true))
        reset()
    }

    if (isError) {
        return <Navigate to='/error' />
    }

    if (authenticatedUser.isAuthenticated) {
        return <Navigate to='/tweets' />
    }

    return (
        <div className='login-form-container'>
            <form onSubmit={handleSubmit(onSubmit)} className='register-input'>
                <h2>Sign up</h2>
                <input
                    type='text'
                    {...register("email", {
                        required: 'This is required', pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: 'Invalid email'
                        }
                    })}
                    placeholder='Email'
                />
                <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ messages }) => {
                        return messages
                            ? _.entries(messages).map(([type, message]) => (
                                <p key={type} className='invalid-input'>{message}</p>
                            ))
                            : null;
                    }}
                />
                <input
                    type='password'
                    {...register("password", {
                        minLength: { value: 8, message: 'Password is too short' }, maxLength: { value: 256, message: 'Password is too long' }, required: 'This is required'
                    })}
                    placeholder='Password'
                />
                <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({ messages }) => {
                        return messages
                            ? _.entries(messages).map(([type, message]) => (
                                <p key={type} className='invalid-input'>{message}</p>
                            ))
                            : null;
                    }}
                />
                <input
                    type='text'
                    {...register("id", { required: 'This is required' })}
                    placeholder='Username'
                />
                <ErrorMessage
                    errors={errors}
                    name="id"
                    render={({ messages }) => {
                        return messages
                            ? _.entries(messages).map(([type, message]) => (
                                <p key={type} className='invalid-input'>{message}</p>
                            ))
                            : null;
                    }}
                />
                <input
                    type='text'
                    {...register("name", {
                        minLength: { value: 1, message: 'Tweet is too short' }, maxLength: { value: 512, message: 'Tweet is too long' }, required: "This is required."
                    })}
                    placeholder='Full name'
                />
                <ErrorMessage
                    errors={errors}
                    name="name"
                    render={({ messages }) => {
                        return messages
                            ? _.entries(messages).map(([type, message]) => (
                                <p key={type} className='invalid-input' id='last-input'>{message}</p>
                            ))
                            : null;
                    }}
                />
                <div className='button-register'>
                    <button type='submit'>Sign up</button>
                </div>
            </form>
            <p>Already have an account? <Link to='/'>Log in</Link></p>
        </div>
    );
};

export default RegisterForm;