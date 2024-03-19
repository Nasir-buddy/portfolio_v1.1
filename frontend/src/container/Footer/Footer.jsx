import React, { useState } from 'react'

import './Footer.scss'
import { images } from '../../constants'
import { client } from '../../client'
import { AppWrap, MotionWrap } from '../../wrapper'
const Footer = () => {
  const [formData, setFormData] = useState({ name: '', emai: '', message: '' })
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }
  const handleSumbut = (e) => {
    setLoading(true);

    const contact = {
      _type: 'contact',
      name: name,
      email: email,
      message: message
    }

    client.create(contact)
      .then(() => {
        setLoading(false);
        setIsFormSubmitted(true);
      })
  }

  return (
    <>
      <h2 className='head-text'>
        Take a coffee & chat with me
      </h2>
      <div className='app__footer-cards'>
        <div className='app__footer-card'>
          <img src={images.email} alt="email" />
          <a href="mailto:hello@ex.com" className='p-text'>hello@ex.com</a>
        </div>
        <div className='app__footer-card'>
          <img src={images.mobile} alt="mobile" />
          <a href="tel: +91 (xxx)(xxx)xxxx" className='p-text'>+91 (xxx)(xxx)xxxx</a>
        </div>
      </div>

      {!isFormSubmitted ?
        <div className='app__footer-form app__flex'>
          <div className='app__flex'>
            <input className='p-text'
              type="text"
              placeholder='Your Name'
              value={name}
              name='name'
              onChange={handleChangeInput} />
          </div>
          <div className='app__flex'>
            <input className='p-text'
              type="email"
              placeholder='Your email'
              value={email}
              name='email'
              onChange={handleChangeInput} />
          </div>
          <div className=''>
            <textarea className='p-text'
              placeholder='Your Message'
              value={message}
              name='message'
              onChange={handleChangeInput}
            />
          </div>
          <button type='button' className='p-text' onClick={handleSumbut}>
            {loading ? 'sending' : 'Send Message'}
          </button>
        </div> : <div>
          <h3 className='head-text'>Thank you for getting in touch</h3>
        </div>
      }
    </>
  )
}

export default AppWrap(
  MotionWrap(Footer, 'app__footer'),
  'contact',
  'app__whitebg'
)