import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import _ from 'lodash';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import './LoginForm.css';
import { User } from '../../types/user';
import { authenticatedUserAtom } from '../../recoil/atom';

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<User>({ criteriaMode: "all" });
  const [authenticatedUser, setAuthenticatedUser] = useRecoilState(authenticatedUserAtom)
  const [isError, setIsError] = useState(false);
  const [isError404, setIsError404] = useState(false);

  async function checkAuth(id: string, password: string) {
    try {
      const res = await axios.get('http://localhost:3001/users/' + id);
      const user = res.data;
      if (user && user.password === password) {
        setAuthenticatedUser({
          isAuthenticated: true,
          user: user
        })
      }
      else {
        setIsError404(true);
        setTimeout(() => {
          setIsError404(false);
        }, 3000);
      }
    }
    catch (error: any) {
      if (error.response.status === 404) {
        setIsError404(true);
        setTimeout(() => {
          setIsError404(false);
        }, 3000);
      }
      else {
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 3000);
      }
    }
  }

  const onSubmit = async (data: User) => {
    checkAuth(data.id, data.password)
  }

  if (authenticatedUser.isAuthenticated) {
    return <Navigate to='/tweets' />
  }

  if (isError) {
    return <Navigate to='/error' />
  }

  return (
    <div className='login-form-container'>
      <form onSubmit={handleSubmit(onSubmit)} className='login-form'>
        <h2>Log in</h2>
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
          type='password'
          {...register("password", { required: 'This is required' })}
          placeholder='Password'
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ messages }) => {
            return messages
              ? _.entries(messages).map(([type, message]) => (
                <p key={type} className='invalid-input' id='last-input'>{message}</p>
              ))
              : null;
          }}
        />

        {isError404 && <p className='invalid-input'>Invalid email or password</p>}
        <div className='button-login'>
          <button type='submit'>Login</button>
        </div>
      </form>
      <p>Don't have an account? <Link to='/register'>Sign up</Link></p>
    </div>
  );
};

export default LoginForm;