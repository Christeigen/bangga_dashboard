import React from 'react'

export default function Button({ styles }) {
  return (
    <button type = "button" className = {`rounded-full py-3 px-6 bg-amber-400 font-poppins font-medium text-[18px] text-primary outline-none ${styles}`}>
        Lihat lebih detail
    </button>
  )
}
