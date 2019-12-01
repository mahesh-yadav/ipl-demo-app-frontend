import React, { useState } from 'react';
import useForm from 'react-hook-form';
import { createUser } from '../api/users';

function SignUp(props) {
  const [serverValidationErrors, setErrors] = useState(null);
  const [serverError, setServerError] = useState(null);

  const onSignUp = async (data, e) => {
    e.preventDefault();

    try {
      await createUser(data);
      setErrors(null);
      setServerError(null);
      props.history.push('/signin');
    } catch (error) {
      if (error.statusCode === 422) {
        setErrors(error);
      } else if (error.statusCode === 500) {
        setServerError(error);
      } else {
        console.log(error);
      }
    }
  };
  const { register, errors, handleSubmit } = useForm();

  return (
    <div className='container'>
      <div className='row justify-content-center p-2'>
        <div className='col-12 col-md-8 col-lg-6 col-xl-4'>
          <div className='card'>
            <div
              className='card-header text-center text-white font-weight-bold'
              style={{ backgroundColor: props.themeColor }}
            >
              <p>Create an account</p>
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
            <form onSubmit={handleSubmit(onSignUp)} className='card-body'>
              <div className='form-group px-2'>
                <label htmlFor='name'>Username: </label>
                <input
                  id='name'
                  type='text'
                  className='form-control'
                  ref={register({ required: true, minLength: 6 })}
                  name='name'
                ></input>
                {errors.name && errors.name.type === 'required' && (
                  <small className='form-text text-danger'>
                    Name is required.
                  </small>
                )}
                {errors.name && errors.name.type === 'minLength' && (
                  <small className='form-text text-danger'>
                    Name must be atleast 6 characters long
                  </small>
                )}
              </div>
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
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
