import React, { useEffect, useState } from 'react'
import './About.scss'
import { motion } from 'framer-motion'

import { client, urlFor } from '../../client'
import { AppWrap } from '../../wrapper'

const About = () => {

  const [about, setAbout] = useState([]);

  useEffect(() => {
    client.fetch(`*[_type == "abouts"]`)
    .then((data) => {
      setAbout(data);
    })
    .catch((error)=>{
      console.log(error);
    })
  }, [])



  return (
    <>
      <h2 style={{marginTop: 50}} className='head-text'>I know that <span> Good Development </span> <br /> means <span> Good Business </span></h2>
      <div className='app__profiles'>
        {about.map((item, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: 'tween' }}
            className='app__profile-item'
            key={item.title + index}
          >
            <img src={urlFor(item.imgUrl)} alt={item.title} />
            <h2 className='bold-text' style={{ marginTop: 20 }}>{item.title}</h2>
            <p className='p-text' style={{ marginTop: 10 }}>{item.description}</p>
          </motion.div>
        ))}
      </div>
    </>
  )
}

export default AppWrap(About, 'about');