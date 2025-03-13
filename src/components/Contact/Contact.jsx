import React, { useState } from 'react'
import './Contact.css'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // In a real application, you would handle form submission here
        console.log('Form submitted:', formData)
        // Reset form after submission
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        })
        alert('Thank you for your message! I will get back to you soon.')
    }

    return (
        <section className="contact" id="contact">
            <h2 className="section-title">Contact <span>Me</span></h2>

            <div className="contact-container">
                <div className="contact-info">
                    <div className="contact-card">
                        <i className="fas fa-envelope"></i>
                        <h3>Email</h3>
                        <p>shimanto925pabna@gmail.com</p>
                    </div>

                    <div className="contact-card">
                        <i className="fas fa-phone"></i>
                        <h3>Phone</h3>
                        <p>+880 1750658101</p>
                    </div>

                    <div className="contact-card">
                        <i className="fas fa-map-marker-alt"></i>
                        <h3>Location</h3>
                        <p>Dhaka, Bangladesh</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="input-box">
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-box">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-box">
                        <input
                            type="text"
                            name="subject"
                            placeholder="Subject"
                            required
                            value={formData.subject}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-box">
                        <textarea
                            name="message"
                            cols="30"
                            rows="10"
                            placeholder="Your Message"
                            required
                            value={formData.message}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <button type="submit" className="btn">Send Message</button>
                </form>
            </div>
        </section>
    )
}

export default Contact 