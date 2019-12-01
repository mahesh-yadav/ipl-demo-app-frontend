import React, { useState } from 'react';
import useForm from 'react-hook-form';
import { signin } from '../api/users';
import { Redirect } from 'react-router-dom';

function SignIn(props) {
  const [serverValidationErrors, setErrors] = useState(null);
  const [serverError, setServerError] = useState(null);

  const onSignIn = async (data, e) => {
    e.preventDefault();

    try {
      let result = await signin(data);
      setErrors(null);
      setServerError(null);
      props.setAccessToken(result);
      props.history.push('/user');
    } catch (error) {
      if (error.statusCode === 422) {
        setErrors(error);
      } else if (error.statusCode === 500 || error.statusCode === 401) {
        setServerError(error);
      } else {
        console.log(error);
      }
    }
  };

  const { register, handleSubmit, errors } = useForm();

  if (props.accessToken) {
    return <Redirect to='/user'></Redirect>;
  } else {
    return (
      <div className='container'>
        <div className='row justify-content-center p-2'>
          <div className='col-12 col-md-8 col-lg-6 col-xl-4'>
            <div className='card'>
              <div
                className='card-header text-center text-white font-weight-bold'
                style={{ backgroundColor: props.themeColor }}
              >
                <p>Login into your account</p>
              </div>
              {serverValidationErrors && (
                <div className='p-3 border border-danger mt-2 text-danger mx-2'>
                  <h3 className='text-center'>{serverValidationErrors.name}</h3>
                  <ul>
                    {serverValidationErrors.errors.map((error, index) => {
                      return <li key={index}>{error.msg}</li>;
                    })}
                  </ul>
                </div>
              )}
              {serverError && (
                <div className='p-3 border mt-2 text-danger mx-2'>
                  <p className='text-center'>
                    <span className='font-weight-bold'>{serverError.name}</span>
                    {': '}
                    {serverError.message}
                  </p>
                </div>
              )}
              <form onSubmit={handleSubmit(onSignIn)} className='card-body'>
                <div className='form-group px-2'>
                  <label htmlFor='email'>Email: </label>
                  <input
                    id='email'
                    type='email'
                    className='form-control'
                    ref={register({ required: true })}
                    name='email'
                  ></input>
                  {errors.email && (
                    <small className='form-text text-danger'>
                      Email is required.
                    </small>
                  )}
                </div>
                <div className='form-group px-2'>
                  <label htmlFor='password'>Password: </label>
                  <input
                    id='password'
                    type='password'
                    className='form-control'
                    ref={register({ required: true })}
                    name='password'
                  ></input>
                  {errors.password && (
                    <small className='form-text text-danger'>
                      Password is required.
                    </small>
                  )}
                </div>

                <div className='form-group text-center mt-4'>
                  <button
                    type='submit'
                    className='btn btn-outline-secondary px-4'
                    style={{
                      color: props.themeColor,
                      borderColor: props.themeColor,
                    }}
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
