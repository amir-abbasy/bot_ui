import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Alert, Header, Input } from '../components'
import config from '../global/config'

export default function Login() {
  const [showPassword, setShowPassword] = useState()
  const [form, setForm] = useState()
  const [alert, setAlert] = useState()

  const router = useRouter()

  const login = () => {
    router.push('Home')
  }
    const login_ = async () => {
    axios
      .post(config.api_url+'/login', {
        user_id: form.username,
        password: form.password,
      })
      .then(function (response) {
        console.log('-', response)
          if(response.status){
            router.push('Home')
          }else{
            setAlert({
              show: true,
              title: 'Login Faild',
              type: 'error',
              message:  response.data.message,
            })
          }
      
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <>
      {alert && (
        <Alert {...alert} onClose={() => setAlert({ ...alert, show: false })} />
      )}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
      />
      <div class="w-5/12 m-auto relative mt-32">
        <div
          class={`scale-150 absolute -z-10 right-20 transition duration-200 ${
            showPassword ? 'translate-y' : '-translate-y-4'
          }`}
        >
          <span class={`material-symbols-outlined scale-150  `}>
            flutter_dash
          </span>
        </div>
        <div class="m-auto border-4 border-blue-50 px-10 shadow-xl shadow-blue-100 bg-white">
          <h1 class="text-3xl mt-10">Login</h1>
          <Input
            type="text"
            class="my-0"
            placeholder="Username"
            onFocus={() => setShowPassword(false)}
            // onBlur={() => setShowPassword(false)}
            onChange={(val) => {
              setAlert({
                show: false,
              })
              setForm({ ...form, username: val })
            }}
          />
          <Input
            type="password"
            class={`my-0 ${form?.password && 'text-4xl p-1'}`}
            placeholder="Password"
            onFocus={() => setShowPassword(true)}
            onBlur={() => setShowPassword(false)}
            onChange={(val) => {
              setAlert({
                show: false,
              })
              setForm({ ...form, password: val })
            }}
          />
          <p class="text-sm mb-5">
            <a href="#" class="text-blue-400 hover:font-bold">
              Forgot password
            </a>
          </p>
          <div class="flex justify-between items-center">
            <button
              class="bg-blue-600 text-white p-3 px-16 mb-10 flex hover:bg-blue-500  hover:scale-105  hover:font-bold"
              onClick={() => {
             
                if (
                  form?.username == '' ||
                  form?.password == '' ||
                  !form?.username ||
                  !form?.password
                ) {
                  setAlert({
                    show: true,
                    title: 'Enter Username & Password',
                    type: 'error',
                    message: 'Check fileds',
                  })
                } else {
                  login()
                }
              }}
            >
              Log in
            </button>
            <p class="text-sm mb-5">
              <a
                href="#"
                class="text-blue-400 hover:font-bold"
                onClick={() => router.push('/CreateAccount')}
              >
                Create new account
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
