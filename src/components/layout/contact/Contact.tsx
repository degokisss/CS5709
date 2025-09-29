import { useState } from 'react'
import Button from '../../ui/button/Button'
import './Contact.css'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    //TODO: Handle form submission here
    console.log('Form submitted:', formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2 className="contact-title">Get In Touch</h2>
        <div className="contact-grid">
          {/* Contact Info */}
          <div className="contact-info">
            <h3 className="contact-info-title">Let's Connect</h3>
            <p className="contact-info-description">
              I'm always interested in hearing about new opportunities and connecting with fellow developers.
              Feel free to reach out if you'd like to collaborate or just say hello!
            </p>
            <div className="contact-info-list">
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  📧
                </div>
                <div className="contact-info-details">
                  <h4>Email</h4>
                  <p>quocviet.nguyen294@gmail.com</p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  📞
                </div>
                <div className="contact-info-details">
                  <h4>Phone</h4>
                  <p>+353 899 859 776</p>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  📍
                </div>
                <div className="contact-info-details">
                  <h4>Location</h4>
                  <p>Limerick, Ireland</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <form onSubmit={handleSubmit} className="form-fields">
              <div className="form-field">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-field">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="form-textarea"
                  required
                />
              </div>
              <Button type="submit" variant="primary" size="lg" className="form-submit">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}