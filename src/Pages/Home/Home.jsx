import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function Home() {
  const [showFirst, setShowFirst] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirst((prev) => !prev)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id='home' className='xl:right-52 lg:right-6 mt-28'>
      <div className="container">
        <div className='text gap-6 flex md:items-start flex-col'>
          <AnimatePresence mode="wait">
            {showFirst ? (
              <motion.h1
                key="heading1"
                className='text-white font-bold text-[3.5rem]'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5  }}
              >
                Welcome to your coding space
              </motion.h1>
            ) : (
              <motion.h1
                key="heading2"
                className='text-white font-bold text-[3.5rem]'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: .5 }}
              >
                One Keystroke at a time let's <br />
                <span className='md:flex'>make something great.</span>
              </motion.h1>
            )}
          </AnimatePresence>

          <motion.p
            className='bg-gradient-to-r from-[#08AEED] to-[#09E190] bg-clip-text text-transparent text-[1.3rem]  font-semibold'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Whether it's a bug fix or a bold idea, this is <br />
            <span className='md:flex'>where it begins.</span>
          </motion.p>

          <motion.div
            className="startButton pt-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
          >
            <NavLink
              to={'/login'}
              className=' start py-3 px-8   bg-gradient-to-r from-[#08AEED] to-[#09E190]  rounded-lg'
            >
              Start Now
            </NavLink>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
