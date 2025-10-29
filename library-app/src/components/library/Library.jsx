import { useState, useEffect } from "react";
import Nav from "../nav";
import '../../Styles/library.css';
import { motion } from 'framer-motion';
import {BookOpen, RotateCcw, Smartphone, Star} from 'lucide-react';

const Library = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <>
      <Nav />
      
      {/* Hero Section */}
      <motion.section 
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-overlay" />
        <motion.div 
          className="hero-content"
          style={{ y: scrollY * 0.5 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hero-title"
          >
            Welcome to Our Library
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="hero-subtitle"
          >
            Discover, rent, and explore thousands of books at your fingertips
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
        </motion.div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        id="about-section"
        className="about-section"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="about-container">
          <motion.div className="about-content" variants={fadeInUp}>
            <h2>About Our Library System</h2>
            <p>
              Our modern library management system revolutionizes the way you discover 
              and access books. With an extensive digital catalog and seamless rental 
              process, we make reading more accessible than ever before.
            </p>
          </motion.div>

          <motion.div className="features-grid" variants={staggerContainer}>
            <motion.div className="feature-card" variants={fadeInUp}>
              <div className="feature-icon">
                <BookOpen size={48} color='black'/>
              </div>
              <h3>Extensive Catalog</h3>
              <p>Browse through thousands of books across all genres and categories</p>
            </motion.div>

            <motion.div className="feature-card" variants={fadeInUp}>
              <div className="feature-icon">
                <RotateCcw size={48} color='black'/>
              </div>
              <h3>Easy Rentals</h3>
              <p>Rent books with just a few clicks and manage your reading list effortlessly</p>
            </motion.div>

            <motion.div className="feature-card" variants={fadeInUp}>
              <div className="feature-icon">
                <Smartphone size={48} color='black' />
              </div>
              <h3>Digital Access</h3>
              <p>Access your account and manage rentals from any device, anywhere</p>
            </motion.div>

          </motion.div>

         
        </div>
      </motion.section>
    </>
  );
};

export default Library;