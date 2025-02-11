import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaLinkedin, FaGithub, FaFacebook, FaInstagram } from 'react-icons/fa';
import styles from '../styles/Contact.module.css';

const Contact = () => {
    return (
        <div>
            <Header />
            <section className={styles.contactSection}>
                <div className={styles.contactContent}>
                    <h1>Contact<span> Us</span></h1>
                    <h3 className={styles.typingText}>For <span>Inquiries</span></h3>
                    <div className={styles.socialIcons}>
                        <a href="https://www.linkedin.com/in/thu-ya-kyaw-5a606732b"><FaLinkedin /></a>
                        <a href="https://github.com/Filip2k03"><FaGithub /></a>
                        <a href="#"><FaFacebook /></a>
                        <a href="#"><FaInstagram /></a>
                    </div>
                </div>

                <div className={styles.contactForm}>
                    <form action="mailto:stephanfilip7@gmail.com" method="post" enctype="text/plain">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" required />
                        
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required />
                        
                        <label htmlFor="message">Message:</label>
                        <textarea id="message" name="message" rows="4" required></textarea>
                        
                        <button type="submit" className={styles.btn}>Submit</button>
                    </form>
                </div>

                <div className={styles.contactButtons}>
                    <a href="tel:+959954480806" className={styles.btn}><i className="fa fa-phone"></i> Call Us</a>
                    <a href="mailto:stephanfilip7@gmail.com" className={styles.btn}><i className="fa fa-envelope"></i> Email Us</a>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Contact;