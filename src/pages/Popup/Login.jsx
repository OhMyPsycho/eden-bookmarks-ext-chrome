import React, { useState, useTransition } from 'react'
import './login.scss';
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import Input from '../../containers/Input/Input';
import Button from '../../containers/button/Button';
import BackHeader from '../../containers/header/BackHeader';
import { post } from '../../libs/api';
import useAuthStore from '../../stores/auth';

const LoginSchema = zod.object({
  email: zod.string().email({message: 'Invalid email'}),
  password: zod.string().min(6, {message: 'Password must be at least 6 characters'})
})

function Login() {
  const login = useAuthStore(state => state.login)

  const [isPending, startTransition] = useTransition()
  const [responseError, setError] = useState("");
  
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: {errors}
  } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = (data) => {
    console.log(data)
    // setError('')

    startTransition(() => {
      post('/auth/login', data)
      .then(response => {
        console.log(response)
        if(!response.ok) {
          setError(response.message)
        } else {
          login(response.data)
          reset()
          navigate('/')
        }
      })
      .catch(error => {
        setError(error.message || 'An error occurred')
      })
    })
  }

  return (
    <div className='login_container'>
      <BackHeader />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller 
        control={control}
        name='email'
        render={({field: {onChange, onBlur, value}}) => (
          <Input 
          label='Email'
          type="email" 
          placeholder="Enter your Email"
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          errorMessage={errors.email?.message} />
        )} />

<Controller 
        control={control}
        name='password'
        render={({field: {onChange, onBlur, value}}) => (
          <Input 
          label='Password'
          type="password" 
          placeholder="Enter your password"
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          errorMessage={errors.password?.message} />
        )} />

        {responseError && <p className='error'>{responseError}</p>}

        <Button loading={isPending} type='submit'>Login</Button>
        <Link className='registe-link' to='/register'>Register</Link>
      </form>
    </div>
  )
}

export default Login