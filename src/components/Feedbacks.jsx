import { motion } from "framer-motion"

import { styles } from "../styles"
import { SectionWrapper } from "../hoc"
import { fadeIn, textVariant } from "../utils/motion"
import { testimonials } from "../constants"

// FeedbackCard component to display individual testimonial details
const FeedbackCard = ({ index, testimonial, name, designation, company, image }) => (
  // Motion div for animation
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className="bg-black-200 p-10 rounded-3xl xs:w-[320px] w-full"
  >
    {/* Quotation mark */}
    <p className="text-white font-black text-[48px]">"</p>
    
    <div className="mt-1">
      {/* Testimonial text */}
      <p className="text-white tracking-wider text-[18px]">{testimonial}</p>

      <div className="mt-7 flex justify-between items-center gap-1">
        <div className="flex-1 flex flex-col">
          {/* Name of the person giving the testimonial */}
          <p className="text-white font-medium text-[16px]">
            <span className="blue-text-gradient">@</span> {name}
          </p>
          {/* Designation and company */}
          <p className="mt-1 text-secondary text-[12px]">
            {designation} of {company}
          </p>
        </div>
        {/* Image of the person giving the testimonial */}
        <img 
          src={image} 
          alt={`feedback-by-${name}`} 
          className="w-10 h-10 rounded-full object-cover" 
        />
      </div>
    </div>
  </motion.div>
)

// Feedbacks component to display a list of testimonials
const Feedbacks = () => {
  return (
    <div className="mt-12 bg-black-100 rounded-[20px]">
      {/* Section header with animations */}
      <div className={`${styles.padding} bg-tertiary rounded-2xl min-h-[300px]`}>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>What others say</p>
          <h2 className={styles.sectionHeadText}>Testimonials.</h2>
        </motion.div>
      </div>
      {/* Container for the feedback cards */}
      <div className={`${styles.paddingX} -mt-20 pb-14 flex flex-wrap gap-7`}>
        {/* Render a list of FeedbackCard components */}
        {testimonials.map((testimonial, index) => (
          <FeedbackCard
            key={testimonial.name}
            index={index}
            {...testimonial}
          />
        ))}
      </div>
    </div>
  )
}

// Wrap the Feedbacks component with SectionWrapper for additional styling and functionality
export default SectionWrapper(Feedbacks, "");
