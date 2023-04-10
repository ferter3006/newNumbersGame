import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { API_ENDPOINT_LOGIN, API_ENDPOINT_REGISTER } from '../Api'
import InputForm from '../Components/InputForm'
import { setPlayer } from '../Redux/gameSlice'

function Login() {

  const [register, setRegister] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password_confirmation, setPasswordConfirmation] = useState('')
  const [someError, setSomeError] = useState('')
  const [showError, setShowError] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = () => {
    if (register) {
      // registro
      fetch(API_ENDPOINT_REGISTER, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation
        })
      })
        .then(response => response.json())
        .then(JsonResponse => {
          if (JsonResponse.status !== 1) {
            if (JsonResponse.message) {
              setSomeError(JsonResponse.message)
            } else {
            }
            setShowError(true)
            setTimeout(() => {
              setShowError(false)
            }, 3000);
          } else {
            // Register Correcto
            console.log(JsonResponse);
            alert('correcto, ahora tiene que iniciar sesión')
            setRegister(false)
          }
        })
        .catch((err) => {
          setSomeError("Servidor temporalmente Offline")
          setShowError(true)
          setTimeout(() => {
            setShowError(false)
          }, 3000);
        })
    } else {
      // login
      fetch(API_ENDPOINT_LOGIN, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          password,
          email
        })
      })
        .then(response => response.json())
        .then(JsonResponse => {
          if (JsonResponse.status !== 1) {
            setSomeError(JsonResponse.message)
            setShowError(true)
            setTimeout(() => {
              setShowError(false)
            }, 3000);
          } else {
            // Login Correcto
            console.log(JsonResponse);
            dispatch(setPlayer(JsonResponse.player))
            navigate('/home')
          }
        })
        .catch((err) => {
          setSomeError("Servidor temporalmente Offline")
          setShowError(true)
          setTimeout(() => {
            setShowError(false)
          }, 3000);
        })
    }
  }

  return (
    <div className='d-flex justify-content-center' style={{ backgroundColor: 'black', width: '100vw', height: '100vh', paddingTop: '30vh' }}>
      <div className='text-center'>
        <h1 style={{ color: 'white', fontSize: 23 }}>Welcome to<span style={{ color: 'orange' }}>Suujigemu</span></h1>
        <div className='btn ' onClick={() => setRegister(prev => !prev)} style={{ borderTop: '1px solid orange' }}>
          <h3 style={{ color: 'white', fontSize: 15 }}><span className='align-middle' style={{ color: register ? 'darkorange' : 'white', marginRight: '5px' }} >Register</span> <span className='align-middle' style={{ color: register ? 'white' : 'darkorange', marginLeft: '5px' }}>Login</span></h3>
        </div>
        <div style={{ color: 'white', border: '1px solid orange', padding: '15px', borderRadius: '15px' }}>

          {register ?
            <>
              <InputForm name={'Name'} value={name} setValue={setName} handlesubmit={handleSubmit} />
              <InputForm name={'Email'} value={email} setValue={setEmail} handlesubmit={handleSubmit} />
              <InputForm name={'Password'} type={'password'} value={password} setValue={setPassword} handlesubmit={handleSubmit} />
              <InputForm name={'RepeatPassword'} type={'password'} value={password_confirmation} setValue={setPasswordConfirmation} handlesubmit={handleSubmit} />
            </>
            :
            <>
              <InputForm name={'email'} value={email} setValue={setEmail} handlesubmit={handleSubmit} />
              <InputForm name={'password'} type={'password'} value={password} setValue={setPassword} handlesubmit={handleSubmit} />
            </>
          }
        </div>
        <button className='btn btn-warning m-2' onClick={handleSubmit}>{register ? 'Register' : 'Login'}</button>
        {showError && <div style={{ color: 'white', fontWeight: '600', borderRadius: '10px', border: '1px solid red', padding: '5px' }}>{someError}</div>}
      </div>


    </div>
  )
}

export default Login