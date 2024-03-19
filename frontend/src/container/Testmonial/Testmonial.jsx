import React, { useEffect, useState } from 'react'

import { motion } from 'framer-motion'
import { HiChevronLeft, HiChevronRight} from 'react-icons/hi'

import { AppWrap, MotionWrap } from '../../wrapper'
import { urlFor, client } from '../../client'
import './Testmonial.scss'
import Autotype from '../Header/Autotype'

const Testmonial = () => {
  const [brands, setBrands] = useState([]);
  const [testmonials, setTestmonials] = useState([]);
  const [currentindex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const query = '*[_type == "testmonial"]';
    const skillsQuery = '*[_type == "brands"]'
    // Fetch experiences
    client.fetch(query)
      .then((data) => {
        setTestmonials(data);
      })
      .catch((error) => {
        console.log("Error fetching experiences:", error);
      });

    // Fetch skills
    client.fetch(skillsQuery)
      .then((skillsData) => {
        setBrands(skillsData);
      })
      .catch((error) => {
        console.log("Error fetching skills:", error);
      });

  }, []);

  const handleClick = (index) => {
      setCurrentIndex(index)
  }
  const test = testmonials[currentindex];
  return (
    <>
    <h2 className='head-text'><span>Testi</span>monial On<br /> <span> <Autotype strings={['Degree', 'Collage', 'University' ]}/> </span></h2>
      {testmonials.length && (
        <>
          <div className='app__testimonial-item app__flex'>
            <img src={urlFor(test.imageurl)} alt="testmonial" />
            <div className='app__testmonial-content'>
                <p className='p-text'>
                  {test.feedback}
                </p>
                <div>
                  <h4 className='bold-text'>{test.name}</h4>
                  <h5 className='p-text'>{test.company}</h5>
                </div>
            </div>
          </div>
          <div className='app__testimonial-btns app__flex'>
            <div className='app__flex'
            onClick={() => handleClick(currentindex === 0 ? testmonials.length - 1 : currentindex - 1)}>
              <HiChevronLeft />
            </div>
            <div className='app__flex'
            onClick={() => handleClick(currentindex === testmonials.length - 1 ? 0 : currentindex + 1)}>
              <HiChevronRight />
            </div>
          </div>
        </>
      )}

      <div className='app__testimonial-brands app__flex'>
        {brands.map((brand)=>(
          <motion.div 
          whileInView={{ opacity: [0, 1]}}
          transition={{ duration: 0.5, type: 'tween'}}
          key={brand._id}
          >
          <img src={urlFor(brand.imgUrl)} alt={brand.name} />  
          </motion.div>
        ))}
      </div>
    </>
  )
}

export default AppWrap(
  MotionWrap(Testmonial, 'app__testimonial'), 
  'testimonial', 
  'app__primarybg'
);