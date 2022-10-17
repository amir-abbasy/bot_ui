import Link from 'next/link'
import React from 'react'
import { Header } from '../components'

export default function Profile() {
  return (
    <>
      <Header />
      <div class="px-40 py-20">
        <button class="flex items-center m-auto border rounded-lg px-4 py-2">
          <Link href="/Login">
            <p class="text-red-400">Logout</p>
          </Link>
          <span class="material-symbols-outlined ml-5">logout</span>
        </button>
      </div>
    </>
  )
}
