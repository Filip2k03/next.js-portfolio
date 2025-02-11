import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaLinkedin, FaGithub, FaFacebook, FaInstagram } from 'react-icons/fa';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Portfolio Website</title>
        <meta name="description" content="Welcome to my portfolio website." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section className="home">
        <div className="home-img">
          <img src="/images/codecraft.jpg" alt="CodeCraft" className="rounded-img" />
        </div>
        <div className="home-content">
          <h1>Hi, It's <span>ThuYaKyaw</span></h1>
          <h3 className="typing-text">I'm a <span></span></h3>
          <p>I am a freelancer</p>
          <a href="./download/cv.pdf" className="btn" download="cv_of_thuyakyaw">Download CV</a>
          <a href="./skills" className="btn">Skills</a>
          <div className="social-icons">
            <a href="https://www.linkedin.com/in/thu-ya-kyaw-5a606732b"><FaLinkedin /></a>
            <a href="https://github.com/Filip2k03"><FaGithub /></a>
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
          </div>
          <button id="contactButton" className="btn">Hire me</button>
        </div>
      </section>
      <Footer />
    </div>
  );
}