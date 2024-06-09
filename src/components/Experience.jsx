// Import necessary modules and components
import { VerticalTimeline, VerticalTimelineElement  } from "react-vertical-timeline-component";
import { motion } from "framer-motion";

// Import styles for the vertical timeline component
import 'react-vertical-timeline-component/style.min.css';

// Import custom styles, constants, higher-order components, and motion utilities
import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

// Define a functional component for individual experience cards
const ExperienceCard = ({ experience }) => (
  <VerticalTimelineElement
    // Customize the content style and arrow style
    contentStyle={{background: '#1d1836', color: '#fff'}}
    contentArrowStyle={{ borderRight: '7px solid #232631'}}
    date={experience.date} // Set the date for the experience
    iconStyle={{ background: experience.iconBg }} // Set the background of the icon
    icon={
      <div className="flex justify-center items-center w-full h-full">
        <img 
        src={experience.icon} 
        alt={experience.company_name}
        className="w-[60%] h-[60%] object-contain"
        />
      </div>
    }
  >
    <div>
      <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
      <p className="text-secondary text-[16px] font-semibold" style={{ margin: 0 }}>{experience.company_name}</p>
    </div>

    <ul className="mt-5 list-disc ml-5 space-y-2">
      {experience.points.map((point, index) => (
        <li
          key={`experience.points.${index}`}
          className="text-white-100 text-[14px] pl-1 tracking-wider"
        >
          {point}
        </li>
      ))}
    </ul>
  </VerticalTimelineElement>
)

// Define the main Experience component
const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I Have Done So Far</p>
        <h2 className={styles.sectionHeadText}>Work Experience.</h2>
      </motion.div>
      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience = {experience} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  )
}

// Export the Experience component wrapped with the SectionWrapper higher-order component
export default SectionWrapper(Experience, "work")