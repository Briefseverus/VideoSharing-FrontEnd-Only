// Footer.jsx

import React from 'react';
import './footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2 className="logo">StreamLab</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, 
            nunc eu tincidunt lacinia, nisl nisl aliquam nisl, in ultricies nunc 
            dui in justo.
          </p>
          <div className="contact">
            <span><i className="fas fa-phone"></i> &nbsp; 123-456-7890</span>
            <span><i className="fas fa-envelope"></i> &nbsp; info@streamlab.com</span>
          </div>
          <div className="socials">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div>
        
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <br/>
          <ul>
            <a href="#">
              <li>Movies</li>
            </a>
            <a href="#">
              <li>TV Shows</li>
            </a>
            <a href="#">
              <li>Live TV</li>
            </a>
            <a href="#">
              <li>Premium</li>
            </a>
            <a href="#">
              <li>My List</li>
            </a>
          </ul>
        </div>
        
        <div className="footer-section links">
          <h3>Helpful Links</h3>
          <br/>
          <ul>
            <a href="#">
              <li>My Account</li>
            </a>
            <a href="#">
              <li>Support</li>
            </a>
            <a href="#">
              <li>Help Center</li>
            </a>
            <a href="#">
              <li>Terms of Service</li>
            </a>
            <a href="#">
              <li>Privacy</li>
            </a>
          </ul>
        </div>
        
        <div className="footer-section contact-form">
          <h3>Contact Us</h3>
          <br/>
          <form action="index.html" method="post">
            <input type="email" name="email" className="text-input contact-input" placeholder="Your email address..."/>
            <textarea rows="4" name="message" className="text-input contact-input" placeholder="Your message..."></textarea>
            <button type="submit" className="btn btn-big contact-btn">
              <i className="fas fa-envelope"></i>
              Send
            </button>
          </form>
        </div>
        
      </div>
    </footer>
  )
}

export default Footer;