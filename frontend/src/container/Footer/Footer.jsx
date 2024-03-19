import React, { useState, useRef } from 'react'
import emailjs from '@emailjs/browser';
import './Footer.scss'
import { images } from '../../constants'
import { client } from '../../client'
import { AppWrap, MotionWrap } from '../../wrapper'
import Autotype from '../Header/Autotype';
const Footer = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Real time gamil messageing
  const form = useRef();
  const sendEmail = (e) => {
    setLoading(true);
    e.preventDefault();

    emailjs
      .sendForm('service_jsxkcpd', 'template_3ch1hyx', form.current, {
        publicKey: 'i0XKNk3SjvJagL1Bd',
      })
      .then(
        () => {
          setLoading(false);
          setIsFormSubmitted(true);
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };
  return (
    <>
      <h2 className='head-text'
      style={{ marginTop: 20}}
      >
        Take a <span>Coffee</span> & chat with me <br /><span> in <Autotype strings={['Real Time']}/></span>
      </h2>
      <div className='app__footer-cards'>
        <div className='app__footer-card'>
          <img src={images.email} alt="email" />
          <a href="mailto:hello@ex.com" className='p-text'>hello@ex.com</a>
        </div>
        <div className='app__footer-card'>
          <img src={images.mobile} alt="mobile" />
          <a href="tel: +91 7633014163" className='p-text'>Click to call me 📞<div className=""></div></a>
        </div>
      </div>

      {!isFormSubmitted ?
        <div className='app__footer-form app__flex'>
          <form ref={form}
            onSubmit={sendEmail}
            className='app__footer-form app__flex'
          >
            <div className='app__flex'>
              <input className='p-text'
                type="text"
                placeholder='Your Name'
                name="from_name"
                required
              />
            </div>
            <div className='app__flex'>
              <input className='p-text'
                type="email"
                placeholder='Your email'
                name="from_name"
                required
              />
            </div>
            <div className=''>
              <textarea className='p-text'
                placeholder='Your Message'
                name="message"
                required
              />
            </div>
            <button type="submit" value="Send" >
              {loading ? 'sending' : 'Send Message'}
            </button>
          </form>
        </div> :
        <div>
          <h3 className='head-text'><span>Thanks</span> you for getting in touch.
            <br /> Your message was received at <span>Nasir's</span> mail. 
          </h3>
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