
import Header from '@/components/base/Header'
import Stars from '@/components/base/Stars'
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
   
    const [starColor, setStarColor] = useState("#98e3ac");

    useEffect(() => {
        setStarColor("#98e3ac");
    }, []);
  return (
    <>
    <div className="absolute inset-0 z-0">
        <Stars color={starColor} />
    </div>
    <Header />
    <div className="relative z-10">
        <Outlet />
    </div>

</>
  )
}

export default RootLayout