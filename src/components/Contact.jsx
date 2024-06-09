// Import necessary modules and components
import { useState, useRef } from "react"; 
import { motion } from "framer-motion"; 
import emailjs from '@emailjs/browser'; 

import { styles } from "../styles"; 
import { EarthCanvas } from "./canvas"; 
import { SectionWrapper } from "../hoc"; 
import { slideIn } from "../utils/motion"; 

const Contact = () => {
  // Create a reference to the form element
  const formRef = useRef(); 

  // Define state variables for the form data and loading status
  const [form, setForm] = useState({
    name: "", 
    email: "", 
    message: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target; 
    setForm({ ...form, [name]: value });
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); 
    setLoading(true);

    // Send email using emailjs service
    emailjs.send(
      'service_0ge6eq4',  // Service ID
      'template_p4e3tdf', // Template ID
      {
        from_name: form.name, 
        to_name: 'Ivan',
        from_email: form.email, 
        to_email: 'ivanrazo745@gmail.com',
        message: form.message,
      },   
      'omYUnYGFasCAo54Sb' // Public key
    )
    .then((result) => {
      setLoading(false);
      alert('Thank you. I will get back to you as soon as possible.');

      // Reset form fields
      setForm({
        name: "", 
        email: "", 
        message: "",
      });
    }, (error) => {
      setLoading(false);
      console.log(error);
      alert('Something went wrong.');
    });
  }

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      {/* Form section */}
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form 
          ref={formRef} 
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          {/* Name input field */}
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input 
              type="text" 
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
            />
          </label>
          
          {/* Email input field */}
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input 
              type="email" 
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
            />
          </label>
          
          {/* Message input field */}
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows="7"       
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
            />
          </label>

          {/* Submit button */}
          <button
            type='submit'
            className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </motion.div>

      {/* Canvas section */}
      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
}

// Export the Contact component wrapped in the SectionWrapper HOC
export default SectionWrapper(Contact, "contact");
