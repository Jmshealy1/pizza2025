// === pages/Contact.jsx ===
import React from "react";
import "../css/Contact.css";

export default function Contact() {
  return (
    <div className="contact-page">
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
        <p><strong>Facebook:</strong> <a href="#">facebook.com/trailhunter</a></p>
        <p><strong>Instagram:</strong> <a href="#">@trailhunter_official</a></p>
        <p><strong>Twitter:</strong> <a href="#">@trailhunter</a></p>
      </div>
    </div>
  );
}
