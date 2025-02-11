import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Contact = () => {
    return (
        <div>
            <Header />
            <section className="home">
                <div className="home-content">
                    <h1>Contact<span> Us</span></h1>
                    <h3 className="typing-text-1">For <span></span></h3>
                    <div className="social-icons">
                        <a href="#"><i className="fa-brands fa-linkedin"></i></a>
                        <a href="#"><i className="fa-brands fa-github"></i></a>
                        <a href="#"><i className="fa-brands fa-x-twitter"></i></a>
                        <a href="#"><i className="fa-brands fa-instagram"></i></a>
                    </div>
                </div>

                <div className="contact-form">
                    <form action="mailto:stephanfilip7@gmail.com" method="post" enctype="text/plain">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" required />
                        
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" required />
                        
                        <label htmlFor="message">Message:</label>
                        <textarea id="message" name="message" rows="4" required></textarea>
                        
                        <button type="submit" className="btn">Submit</button>
                    </form>
                </div>

                <div className="contact-buttons">
                    <a href="tel:+959954480806" className="btn"><i className="fa fa-phone"></i> Call Us</a>
                    <a href="mailto:stephanfilip7@gmail.com" className="btn"><i className="fa fa-envelope"></i> Email Us</a>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Contact;