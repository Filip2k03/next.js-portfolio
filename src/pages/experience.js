import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Experience = () => {
    return (
        <div>
            <Header />
            <section className="home">
                <div className="achievements">
                    <div className="container">
                        <div className="card">
                            <h3>Key Achievements</h3>
                            <ul>
                                <li>Designed and developed UI/UX for two websites, including one for Digizens Alliance (https://digizensalliance.org/), ensuring an optimal user experience and seamless functionality.</li>
                                <li>Collaborated on another website project, delivering a comprehensive interface, though currently not hosted on a domain.</li>
                                <li>Built dynamic and interactive components using React and styled them effectively with Tailwind CSS and Bootstrap.</li>
                                <li>Developed secure and scalable backend systems using PHP and MySQL, including user authentication and data management features.</li>
                            </ul>
                        </div>
                        <div className="card">
                            <h3>Additional Professional Experience</h3>
                            <ul>
                                <li>Completed two seaman contracts as a cadet, gaining valuable skills in teamwork, discipline, and project execution in high-pressure environments.</li>
                                <li>Acquired a deep understanding of logistics, operational processes, and problem-solving in dynamic, fast-paced conditions.</li>
                            </ul>
                        </div>
                        <div className="card">
                            <h3>React Experience</h3>
                            <ul>
                                <li>Developed multiple single-page applications (SPAs) using React.js.</li>
                                <li>Implemented state management using Redux and Context API.</li>
                                <li>Created reusable components and hooks to streamline development.</li>
                                <li>Integrated RESTful APIs to fetch and display data dynamically.</li>
                            </ul>
                        </div>
                        <div className="card">
                            <h3>Education</h3>
                            <ul>
                                <li>Diploma in Business Information Technology – Solid foundation in IT principles, web development, and business systems.</li>
                                <li>Diploma in Human Resources and Project Management – Enhanced understanding of project coordination, team collaboration, and business operations.</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <h3>Projects</h3>
                    <ul>
                        <li><a href="https://chatapp.talkprivate.au.tempcloudsite.com/" target="_blank" rel="noopener noreferrer">ChatApp</a> - A private chat application allowing users to communicate securely in real-time.</li>
                    </ul>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Experience;