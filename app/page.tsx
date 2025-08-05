'use client'
import React from 'react'
import { toast } from 'sonner'

function Homepage() {
  return (
    <>
    <div className=''>Homepage</div>
    <button
      onClick={() => toast('Hello from Sonner!')}
      className="bg-blue-500 text-white px-4 py-2 rounded">
        Click me
      </button>
</>
  )
}

export default Homepage