import React, { useState } from 'react'
import './Navbar.scss'
import { images } from '../../constants'
import { HiMenuAlt4 } from "react-icons/hi";
import { HiX } from "react-icons/hi";
import { motion } from 'framer-motion'
const Navbar = () => {

  const [toggle, setToggle] = useState();
  return (
    <nav className='app__navbar'>
      <div className='app__navbar-logo'>
        <img src={images.logo} alt="" />
      </div>
      <ul className='app__navbar-links'>
        {['home', 'about', 'work', 'skills','testimonial', 'contact'].map((item, index) => (
          <li className='app__flex p-text ' key={`link-${item}`}>
            <div />
            <a href={`#${item}`}>{item}</a>
          </li>
        ))}
      </ul>
      <div className='app__navbar-menu'>
        <HiMenuAlt4 onClick={() => setToggle(true)} />
        {
          toggle && (
            <motion.div
              whileInView={{ x: [300, 0] }}
              className="box"
              transition={{
                duration: 0.6,
                type: "spring",
                damping: 10,
                stiffness: 60,
                restDelta: 0.001
              }}
            >
              <HiX onClick={() => setToggle(false)} />
              <ul>
                {['home', 'about', 'work', 'skills','testimonial', 'contact'].map((item, index) => (
                  <li key={item}>
                    <a href={`#${item}`} onClick={() => setToggle(false)}>{item}</a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
      </div>
    </nav>
  )
}

export default Navbar