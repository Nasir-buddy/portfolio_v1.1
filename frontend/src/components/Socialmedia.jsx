import React from 'react'
import { BsTwitter, BsInstagram } from 'react-icons/bs'
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";

import { FaFacebookF } from 'react-icons/fa'
const Socialmedia = () => {
  return (
    <div className='app__social'
      style={{
        position: 'fixed'
        , bottom: '0'
      }}
    >
      <div>
       <a href="https://github.com/Nasir-buddy"> <FaGithub /></a>
      </div>
      <div>
        <a href="https://www.linkedin.com/in/syednasirali17/"><FaLinkedinIn /></a>
      </div>
      <div>
        <a href="https://mail.google.com/mail/u/0/?hl=en/#inbox?compose=new"><BiLogoGmail /></a>
      </div>
    </div>
  )
}

export default Socialmedia