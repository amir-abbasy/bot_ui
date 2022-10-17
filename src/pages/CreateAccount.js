import { useRouter } from 'next/router'
import axios from 'axios'
import React, { useState } from 'react'
import { Alert, Header, Input } from '../components'
import config from '../global/config'

export default function CreateAccount() {
  const [showPassword, setShowPassword] = useState()
  const [form, setForm] = useState()
  const [alert, setAlert] = useState()

  const router = useRouter()

  const login = async () => {
    axios
      .post(config.api_url + '/entry/register', {
        username: form.username,
        password: form.password,
      })
      .then(function (response) {
        if (response.status == 200) {
          if (response.data.status) {
            // console.log('-', response.data.status)
            setAlert({
              show: true,
              title: 'Account created successsfully ',
              type: 'error',
              message: "Welcome "+ form.username,
            })
            router.push('Login')

          } else {
            setAlert({
              show: true,
              title: 'Login Faild',
              type: 'error',
              message: response.data.message,
            })
          }
        } else {
          console.log('err')
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
      <div class="w-5/12 m-auto relative mt-10">
        <div class="m-auto border-4 border-blue-50 px-10 shadow-xl shadow-blue-100 bg-white">
          <span
            class="material-symbols-outlined my-5 cursor-pointer"
            onClick={() => router.back()}
          >
            arrow_back
          </span>
          <h1 class="text-3xl mb-10">Create Account</h1>
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
            type="text"
            class="my-0"
            placeholder="Email"
            onFocus={() => setShowPassword(false)}
            // onBlur={() => setShowPassword(false)}
            onChange={(val) => {
              setAlert({
                show: false,
              })
              setForm({ ...form, email: val })
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
          <Input
            type="password"
            class={`my-0 ${form?.confirm_password && 'text-4xl p-1'}`}
            placeholder="Confirm Password"
            onFocus={() => setShowPassword(true)}
            onBlur={() => setShowPassword(false)}
            onChange={(val) => {
              setAlert({
                show: false,
              })
              setForm({ ...form, confirm_password: val })
            }}
          />

          <p class="text-sm mb-5 mt-10">
            <a
              href="#"
              class="text-blue-400 hover:font-bold "
              onClick={() => router.push('/Login')}
            >
              Already have an account?
            </a>
          </p>
          <div class="flex justify-between items-center">
            <button
              class="bg-blue-600 text-white p-3 px-16 mb-10 flex hover:bg-blue-500  hover:scale-105  hover:font-bold "
              onClick={() => {
                if (
                  form?.username == '' ||
                  form?.password == '' ||
                  form?.email == '' ||
                  form?.confirm_password == '' ||
                  form?.confirm_password != form?.password ||
                  !form?.username ||
                  !form?.email ||
                  !form?.password ||
                  !form?.confirm_password
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
              Create Account
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
