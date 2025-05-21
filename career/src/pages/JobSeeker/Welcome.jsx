import React from 'react';
import '../../styles/pages/JobSeeker/Welcome.css';
import imageOne from '../../assets/image-1.jpg';
import imageTwo from '../../assets/man1.jpg';
import imageThree from '../../assets/man1.jpg';

import { useState, useEffect } from 'react';
import { motion, useScroll, useAnimation, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiCheckCircle, FiBell, FiBarChart2, FiStar, FiSun, FiMoon } from 'react-icons/fi';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';

const Welcome = () => {
    const [scrolled, setScrolled] = useState(false);
    const [theme, setTheme] = useState(() => {
        // Check if theme is stored in localStorage
        const savedTheme = localStorage.getItem('theme');
        // Check system preference if no saved theme
        if (!savedTheme) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return savedTheme;
    });
    const controls = useAnimation();
    const { scrollY } = useScroll();

    // Update theme when it changes
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        scrollY.onChange((latest) => {
            if (latest > 300) {
                controls.start("visible");
            }
        });
    }, [scrollY, controls]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    const testimonials = [
        {
            id: 1,
            name: "Jemal Hussen",
            role: "UX Designer",
            content: "CareerPlus helped me find my dream job in just 2 weeks! The AI recommendations were spot on.",
            avatar: imageTwo,
            rating: 5
        },
        {
            id: 2,
            name: "Telehaymanot Wale",
            role: "Software Engineer",
            content: "I was getting frustrated with traditional job boards. CareerPlus understands what I'm looking for.",
            avatar: imageThree,
            rating: 5
        },
        {
            id: 3,
            name: "Yosef Kasse",
            role: "Marketing Manager",
            content: "The real-time alerts saved me so much time.",
            avatar: imageTwo,
            rating: 5
        }
    ];

    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    return (
        <div className="careerplus">
            {/* Header */}
            <motion.header
                className={`careerplus__header ${scrolled ? 'scrolled' : ''}`}
                initial={{ backgroundColor: theme === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)' }}
                animate={{ 
                    backgroundColor: scrolled 
                        ? (theme === 'dark' ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)')
                        : (theme === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)')
                }}
                transition={{ duration: 0.3 }}
            >
                <div className="careerplus__header-container">
                    <motion.h1
                        className="careerplus__logo"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        CareerPlus
                    </motion.h1>

                    <nav className="careerplus__nav">
                        <a href="#home" className="careerplus__nav-link">Home</a>
                        <a href="#features" className="careerplus__nav-link">Features</a>
                        <a href="#testimonials" className="careerplus__nav-link">Testimonials</a>
                        <a href="#contact" className="careerplus__nav-link">Contact</a>
                        <a href="/login" className="careerplus__nav-link">Login</a>
                        <a href="/register" className="careerplus__nav-link careerplus__nav-link--register">Register</a>
                        <button 
                            className="careerplus__theme-toggle"
                            onClick={toggleTheme}
                            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
                        >
                            {theme === 'light' ? <FiMoon /> : <FiSun />}
                        </button>
                    </nav>
                </div>
            </motion.header>

            {/* Hero Section */}
            <section id="home" className="careerplus__hero"
                style={theme === 'dark' ? { background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' } : {}}>
                <div className="careerplus__hero-content">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="careerplus__hero-title"
                    >
                        Revolutionize Your Job Search with AI.
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="careerplus__hero-text"
                    >
                        Find your perfect job match, smarter and faster.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="careerplus__hero-buttons"
                    >
                        <button className="careerplus__hero-btn careerplus__hero-btn--primary">
                            Get Started <FiArrowRight />
                        </button>
                        <button className="careerplus__hero-btn careerplus__hero-btn--secondary">
                            Explore
                        </button>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="careerplus__hero-image"
                >
                    <img src={imageOne} alt="AI job search illustration" />
                </motion.div>
            </section>

            {/* Features Section */}
            <section id="features" className="careerplus__features">
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="careerplus__section-title"
                >
                    Why Choose CareerPlus?
                </motion.h3>

                <div className="careerplus__features-grid">
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        initial="hidden"
                        animate={controls}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="careerplus__feature-card"
                    >
                        <div className="careerplus__feature-icon">
                            <FiCheckCircle />
                        </div>
                        <h4 className="careerplus__feature-title">Personalized Recommendations</h4>
                        <p className="careerplus__feature-text">
                            Our AI learns your preferences to suggest jobs that truly match your skills and aspirations.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        initial="hidden"
                        animate={controls}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="careerplus__feature-card"
                    >
                        <div className="careerplus__feature-icon">
                            <FiBell />
                        </div>
                        <h4 className="careerplus__feature-title">Real-Time Job Alerts</h4>
                        <p className="careerplus__feature-text">
                            Get instant notifications when new jobs matching your profile are posted.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                        initial="hidden"
                        animate={controls}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="careerplus__feature-card"
                    >
                        <div className="careerplus__feature-icon">
                            <FiBarChart2 />
                        </div>
                        <h4 className="careerplus__feature-title">Data-Driven Insights</h4>
                        <p className="careerplus__feature-text">
                            Understand your market value and how you compare to other candidates.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="careerplus__testimonials">
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="careerplus__section-title"
                >
                    What Our Users Say
                </motion.h3>

                <div className="careerplus__testimonial-container">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={testimonials[currentTestimonial].id}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5 }}
                            className="careerplus__testimonial-card"
                        >
                            <div className="careerplus__testimonial-avatar">
                                <img
                                    src={testimonials[currentTestimonial].avatar}
                                    alt={testimonials[currentTestimonial].name}
                                />
                            </div>
                            <div className="careerplus__testimonial-rating">
                                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                    <FiStar key={i} className="careerplus__testimonial-star" />
                                ))}
                            </div>
                            <p className="careerplus__testimonial-content">
                                "{testimonials[currentTestimonial].content}"
                            </p>
                            <div className="careerplus__testimonial-author">
                                <h4>{testimonials[currentTestimonial].name}</h4>
                                <p>{testimonials[currentTestimonial].role}</p>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="careerplus__testimonial-dots">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                className={`careerplus__testimonial-dot ${index === currentTestimonial ? 'active' : ''}`}
                                onClick={() => setCurrentTestimonial(index)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="careerplus__cta">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="careerplus__cta-content"
                >
                    <h3 className="careerplus__cta-title">Ready to take the next step in your career?</h3>
                    <button className="careerplus__cta-btn">
                        Join Now <FiArrowRight />
                    </button>
                </motion.div>
            </section>

            {/* Footer */}
            <footer id="contact" className="careerplus__footer">
                <div className="careerplus__footer-container">
                    <div className="careerplus__footer-brand">
                        <h3 className="careerplus__logo">CareerPlus</h3>
                        <p className="careerplus__footer-text">
                            AI-powered job matching for the modern professional.
                        </p>
                    </div>

                    <div className="careerplus__footer-links">
                        <h4 className="careerplus__footer-heading">Quick Links</h4>
                        <a href="#home" className="careerplus__footer-link">Home</a>
                        <a href="#features" className="careerplus__footer-link">Features</a>
                        <a href="#testimonials" className="careerplus__footer-link">Testimonials</a>
                        <a href="#contact" className="careerplus__footer-link">Contact</a>
                    </div>

                    <div className="careerplus__footer-contact">
                        <h4 className="careerplus__footer-heading">Contact Us</h4>
                        <p className="careerplus__footer-text">hello@careerplus.com</p>
                        <p className="careerplus__footer-text">+251 (9) 123-456</p>
                    </div>

                    <div className="careerplus__footer-social">
                        <h4 className="careerplus__footer-heading">Follow Us</h4>
                        <div className="careerplus__social-icons">
                            <a href="#" className="careerplus__social-icon"><FaLinkedin /></a>
                            <a href="#" className="careerplus__social-icon"><FaTwitter /></a>
                            <a href="#" className="careerplus__social-icon"><FaGithub /></a>
                        </div>
                    </div>
                </div>

                <div className="careerplus__footer-bottom">
                    <p>&copy; {new Date().getFullYear()} CareerPlus. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Welcome;