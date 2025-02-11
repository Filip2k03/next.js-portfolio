import React from 'react';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/Services.module.css';

const Services = () => {
    return (
        <div>
            <Header />
            <section className={styles.services}>
                <div className={styles.container}>
                    <h1>My<span> Services</span></h1>
                    <div className={styles.serviceGrid}>
                        <div className={styles.serviceCard}>
                            <Image src="/images/front.avif" alt="Front-End Development" width={300} height={200} />
                            <h3>Front-End Development</h3>
                            <p>Offering front-end development services to create visually appealing and user-friendly interfaces using the latest technologies.</p>
                        </div>
                        <div className={styles.serviceCard}>
                            <Image src="/images/wordpress.png" alt="WordPress Web Development" width={300} height={200} />
                            <h3>WordPress Web Development</h3>
                            <p>Creating custom WordPress websites tailored to your needs, ensuring a seamless user experience and responsive design.</p>
                        </div>
                        <div className={styles.serviceCard}>
                            <Image src="/images/cms.jpeg" alt="CMS Systems" width={300} height={200} />
                            <h3>CMS Systems</h3>
                            <p>Developing and managing content management systems to help you efficiently organize and publish your content.</p>
                        </div>
                        <div className={styles.serviceCard}>
                            <Image src="/images/online.jpeg" alt="Teaching Programming Languages Online" width={300} height={200} />
                            <h3>Teaching Programming Languages Online</h3>
                            <p>Providing online courses and tutorials to help you learn programming languages and improve your coding skills.</p>
                        </div>
                        <div className={styles.serviceCard}>
                            <Image src="/images/full.png" alt="Full Stack Development" width={300} height={200} />
                            <h3>Full Stack Development</h3>
                            <p>Offering full-stack development services, including front-end and back-end development, to build robust and scalable web applications.</p>
                        </div>
                        <div className={styles.serviceCard}>
                            <Image src="/images/uiux.webp" alt="UI/UX Design" width={300} height={200} />
                            <h3>UI/UX Design</h3>
                            <p>Designing intuitive and engaging user interfaces and experiences to enhance user satisfaction and interaction.</p>
                        </div>
                        <div className={styles.serviceCard}>
                            <Image src="/images/host.png" alt="Web Hosting" width={300} height={200} />
                            <h3>Web Hosting</h3>
                            <p>Providing reliable and secure web hosting services to ensure your website is always accessible and performs optimally.</p>
                        </div>
                        <div className={styles.serviceCard}>
                            <Image src="/images/domain.jpg" alt="Domain Buying" width={300} height={200} />
                            <h3>Domain Buying</h3>
                            <p>Assisting with the purchase and management of domain names to establish your online presence effectively.</p>
                        </div>
                        <div className={styles.serviceCard}>
                            <Image src="/images/pos.svg" alt="POS System" width={300} height={200} />
                            <h3>POS System</h3>
                            <p>Developing and implementing efficient POS systems to streamline your sales processes and improve customer experience.</p>
                        </div>
                        <div className={styles.serviceCard}>
                            <Image src="/images/portfolio.jpg" alt="Portfolio Website" width={300} height={200} />
                            <h3>Portfolio Website</h3>
                            <p>Creating professional portfolio websites to showcase your skills, projects, and achievements effectively.</p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Services;