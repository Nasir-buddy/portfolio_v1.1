import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
// import { Tooltip as ReactTooltip } from 'react-tooltip';
import { AppWrap, MotionWrap } from '../../wrapper'
import { client } from '../../client'

import './Skills.scss'
const Skills = () => {
  const [experiences, setExperience] = useState([]);
  const [, setSkills] = useState([]);
  useEffect(() => {
    const query = '*[_type == "experiences"]';
    const skillsQuery = '*[_type == "skills"]'
    // Fetch experiences
    client.fetch(query)
      .then((data) => {
        // Helper to parse date strings
        const parseDate = (dateStr) => {
          if (!dateStr) return new Date(0);
          if (dateStr.toLowerCase().includes('present')) return new Date(3000, 0, 1); // Far future for 'Present'
          // Try to parse month and year
          const match = dateStr.match(/([A-Za-z]+)?\s*(\d{4})/);
          if (match) {
            const month = match[1] ? new Date(`${match[1]} 1, ${match[2]}`) : new Date(`${match[2]}`);
            return month;
          }
          return new Date(dateStr);
        };

        // Sort by end date (Present first), then by start date
        const sortedData = data.sort((a, b) => {
          const aEndRaw = a.endDate || a.year || '';
          const bEndRaw = b.endDate || b.year || '';
          const aStartRaw = a.startDate || a.year || '';
          const bStartRaw = b.startDate || b.year || '';
          const aEnd = parseDate(aEndRaw);
          const bEnd = parseDate(bEndRaw);
          const isAPresent = aEndRaw.toLowerCase().includes('present');
          const isBPresent = bEndRaw.toLowerCase().includes('present');

          if (isAPresent && isBPresent) {
            // Both are 'Present', sort by latest start date
            const aStart = parseDate(aStartRaw);
            const bStart = parseDate(bStartRaw);
            return bStart - aStart;
          }
          if (isBPresent) return 1;
          if (isAPresent) return -1;
          // Otherwise, sort by end date, then start date
          if (bEnd - aEnd !== 0) return bEnd - aEnd;
          const aStart = parseDate(aStartRaw);
          const bStart = parseDate(bStartRaw);
          return bStart - aStart;
        });
        setExperience(sortedData);
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
      <h2 className='head-text'
        style={{ marginTop: 20 }}
      >
        <span>Skills</span> & Experience
      </h2>

      <div className='app__skills-container'>
        <motion.div
          className='app__skills-exp'
        >
          {experiences?.map((experiences, index) => (
            <motion.div
              className='app__skills-exp-item  mx-auto'
              key={experiences.year}
            >
              <div key={index} className='app__skills-exp-year'>
                <p className='bold-text'>{experiences.year}</p>
              </div>
              <motion.div className='app__skills-exp-works'>
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
                      <div className="work-info" style={{ backgroundColor: '#edf2f8' }}>
                        <h4 className='bold-text'>{work.name}</h4>
                        <p className='p-text company-name'>{work.company}</p>
                        <p className='p-text work-desc'>{work.desc}</p>
                      </div>
                    </motion.div>
                  </>
                ))}
              </motion.div>
            </motion.div>
          ))}

        </motion.div>
        {/* <motion.div className='app__skills-list'>
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
        </motion.div> */}
      </div>
    </>
  )
}

export default AppWrap(
  MotionWrap(Skills, 'app__skills'),
  'skills',
  'app__whitebg'
);