import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { AppWrap, MotionWrap } from '../../wrapper'
import { urlFor, client } from '../../client'

import './Skills.scss'
const Skills = () => {
  const [experiences, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    const query = '*[_type == "experiences"]';
    const skillsQuery = '*[_type == "skills"]'
    // Fetch experiences
    client.fetch(query)
      .then((data) => {
        setExperience(data);
      })
      .catch((error) => {
        console.log("Error fetching experiences:", error);
      });

    // Fetch skills
    client.fetch(skillsQuery)
      .then((skillsData) => {
        setSkills(skillsData);
      })
      .catch((error) => {
        console.log("Error fetching skills:", error);
      });

  }, []);
  return (
    <>
      <h2 className='head-text'>
        Skills & Experience
      </h2>

      <div className='app__skills-container'>
        <motion.div className='app__skills-list'>
          {skills?.map((skill, index) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className='app__skills-item app__flex'
              key={skill.name}
              
            >
              <div className='app__flex' style={{ backgroundColor: skill.bgColor }}>
                <img src={urlFor(skill.icon)} alt={skill.name} />
              </div>
              <p className='p-text'>
                {skill.name}
              </p>
            </motion.div>
          ))}
        </motion.div>


        <motion.div
          className='app__skills-exp'
        >
          {experiences?.map((experiences, index) => (
            <motion.div
              className='app__skills-exp-item'
              key={experiences.year}
            >
              <div key={index} className='app__skills-exp-year'>
                <p className='bold-text'>{experiences.year}</p>
              </div>
              <motion.div className='app__skills-exp-works'
              >
                {experiences.works.map((work) => (
                  <>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className='app__skills-exp-work'
                      data-tip='tooltip'
                      data-for={work.name}
                      key={work.name}
                    >
                      <h4 className='bold-text'>
                        {work.name}
                      </h4>
                      <p className='p-text'>{work.company}</p>
                    </motion.div>
                    <ReactTooltip
                      id={work.name}
                      effect="solid"
                      arrowColor="#fff"
                      className='skills-tooltip'
                    >
                      {work.desc}
                    </ReactTooltip>
                  </>
                ))}
              </motion.div>
            </motion.div>
          ))}

        </motion.div>

      </div>
    </>
  )
}

export default AppWrap(
  MotionWrap(Skills, 'app__skills'), 
  'skills', 
  'app__whitebg'
);