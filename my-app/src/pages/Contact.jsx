import React from "react";
import "../css/Contact.css";
import { handleContactFormSubmit } from "../form";

export default function Contact() {
  return (
    <div className="contact-page">
      <div className="contact-box">
        <h2>Contact TrailHunter</h2>
        <p>If you have any questions about hunting guides, gear, or trip planning, feel free to reach out to us!</p>

        <h3>General Contact Information</h3>
        <p><strong>Email:</strong> support@trailhunter.com</p>
        <p><strong>Phone:</strong> (555) 123-4567</p>
        <p><strong>Address:</strong> 789 Wilderness Road, Huntington, WY 82001</p>

        <h3>Customer Support Hours</h3>
        <div className="contact-hours">
          <h4>Fall & Winter Hunting Season (September - February)</h4>
          <ul>
            <li><strong>Eastern Region:</strong> Mon-Sat: 6 AM - 8 PM | Sun: 7 AM - 5 PM</li>
            <li><strong>Western Region:</strong> Mon-Sat: 5 AM - 9 PM | Sun: 6 AM - 6 PM</li>
          </ul>
          <h4>Spring & Summer Off-Season (March - August)</h4>
          <ul>
            <li><strong>Eastern Region:</strong> Mon-Fri: 8 AM - 6 PM | Sat: 9 AM - 3 PM | Sun: Closed</li>
            <li><strong>Western Region:</strong> Mon-Fri: 7 AM - 7 PM | Sat: 8 AM - 4 PM | Sun: Closed</li>
          </ul>
        </div>

        <h3>Emergency Hunting Support</h3>
        <p>If you’re on a guided hunt and need immediate assistance, use our <strong>24/7 Emergency Line: (555) 987-6543</strong>.</p>

        <h3>Social Media</h3>
        <div className="social-media">
          <p><strong>Facebook:</strong> <a href="https://facebook.com/trailhunter" target="_blank" rel="noopener noreferrer">facebook.com/trailhunter</a></p>
          <p><strong>Instagram:</strong> <a href="https://instagram.com/trailhunter_official" target="_blank" rel="noopener noreferrer">@trailhunter_official</a></p>
          <p><strong>Twitter:</strong> <a href="https://twitter.com/trailhunter" target="_blank" rel="noopener noreferrer">@trailhunter</a></p>
        </div>

        <h3>Send Us a Message</h3>
        <form id="contact-form" onSubmit={handleContactFormSubmit}>
          <input type="hidden" name="access_key" value="d3d47df3-cd6b-4b15-ba8a-9677881cf1d0" />

          <label htmlFor="name">Name: *</label>
          <input type="text" id="name" name="name" required />

          <label htmlFor="email">Email: *</label>
          <input type="email" id="email" name="email" required />

          <label htmlFor="message">Message: *</label>
          <textarea id="message" name="message" rows="5" required></textarea>

          <button type="submit">Send Message</button>
          <div id="form-message" className="form-feedback"></div>
        </form>

        <div className="iframe-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d22017.131219462495!2d-81.20868536558862!3d34.45296410813197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1742650489039!5m2!1sen!2sus"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="TrailHunter Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
}