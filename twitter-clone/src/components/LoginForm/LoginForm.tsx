import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import _ from 'lodash';
import { ErrorMessage } from '@hookform/error-message';
import { User } from '../../types/user';
import { authenticatedUserAtom, Error404Atom, ErrorAtom } from '../../recoil/atom';
import { useAuth } from '../../utils/authentication-hook';
import './LoginForm.css';

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<User>({ criteriaMode: "all" });
  const { isAuthenticated } = useRecoilValue(authenticatedUserAtom)
  const isError = useRecoilValue(ErrorAtom)
  const isError404 = useRecoilValue(Error404Atom)
  const authentication = useAuth();

  const onSubmit = async (data: User) => {
    authentication.checkAuth(data.id, data.password)
  }

  if (isAuthenticated) {
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