/**
 * Contact Section Component
 *
 * Provides a contact form with EmailJS integration for sending messages directly
 * to the portfolio owner's email. Displays contact information alongside the form.
 *
 * Features:
 * - Real email delivery via EmailJS service
 * - Form validation (HTML5 required fields)
 * - Client-side rate limiting (max 3 submissions per 10 minutes)
 * - Loading state during submission
 * - Success/error feedback messages
 * - Automatic form reset on successful submission
 * - Input field disabling during submission
 * - Responsive two-column layout (form + contact info)
 *
 * EmailJS Integration:
 * - Credentials loaded from environment variables (see .env.example)
 * - Falls back to placeholder values if not configured
 * - Template variables: from_name, from_email, message, to_name
 *
 * Rate Limiting:
 * - Tracks submission timestamps in localStorage
 * - Prevents spam by limiting to 3 submissions per 10-minute window
 * - Displays remaining wait time when limit is exceeded
 * - Supplements EmailJS's server-side rate limiting
 *
 * @module components/layout/contact
 */

import React, { useState } from 'react'
import emailjs from '@emailjs/browser'
import Button from '../../ui/button/Button'
import './Contact.css'

/**
 * EmailJS Configuration
 *
 * Credentials are loaded from environment variables set via .env file
 * or GitHub Secrets during deployment. Falls back to placeholder values
 * if environment variables are not set (will fail to send emails).
 *
 * Required Environment Variables:
 * - VITE_EMAILJS_SERVICE_ID: EmailJS service identifier
 * - VITE_EMAILJS_TEMPLATE_ID: EmailJS email template identifier
 * - VITE_EMAILJS_PUBLIC_KEY: EmailJS public API key
 *
 * @see .env.example for setup instructions
 */
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY'

/**
 * Rate Limiting Configuration
 *
 * Client-side rate limiting prevents spam and abuse while allowing legitimate use.
 * Submission timestamps are stored in localStorage for persistence across page reloads.
 */
const RATE_LIMIT_STORAGE_KEY = 'contact_form_submissions'
const MAX_SUBMISSIONS = 3           // Maximum allowed submissions
const TIME_WINDOW_MS = 10 * 60 * 1000  // 10 minutes in milliseconds

/**
 * Rate Limiting Helper Functions
 */

/**
 * Retrieves submission timestamps from localStorage
 *
 * @returns Array of submission timestamps (epoch milliseconds)
 */
const getSubmissionTimestamps = (): number[] => {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    // If localStorage is unavailable or corrupted, return empty array
    return []
  }
}

/**
 * Stores submission timestamps to localStorage
 *
 * @param timestamps - Array of submission timestamps to store
 */
const setSubmissionTimestamps = (timestamps: number[]): void => {
  try {
    localStorage.setItem(RATE_LIMIT_STORAGE_KEY, JSON.stringify(timestamps))
  } catch {
    // Silently fail if localStorage is unavailable
    console.warn('Unable to save submission timestamps to localStorage')
  }
}

/**
 * Filters out submissions older than the time window
 *
 * @param timestamps - Array of submission timestamps
 * @returns Filtered array containing only recent submissions
 */
const getRecentSubmissions = (timestamps: number[]): number[] => {
  const now = Date.now()
  return timestamps.filter(timestamp => now - timestamp < TIME_WINDOW_MS)
}

/**
 * Checks if the user has exceeded the rate limit
 *
 * @returns Object containing rate limit status and wait time (if applicable)
 */
const checkRateLimit = (): { isLimited: boolean; waitTimeMs?: number } => {
  const timestamps = getSubmissionTimestamps()
  const recentSubmissions = getRecentSubmissions(timestamps)

  if (recentSubmissions.length >= MAX_SUBMISSIONS) {
    // Calculate wait time until oldest submission expires
    const oldestSubmission = Math.min(...recentSubmissions)
    const waitTimeMs = TIME_WINDOW_MS - (Date.now() - oldestSubmission)

    return { isLimited: true, waitTimeMs: Math.max(0, waitTimeMs) }
  }

  return { isLimited: false }
}

/**
 * Records a new submission timestamp
 *
 * Adds current timestamp to localStorage and removes expired entries
 */
const recordSubmission = (): void => {
  const timestamps = getSubmissionTimestamps()
  const recentSubmissions = getRecentSubmissions(timestamps)
  recentSubmissions.push(Date.now())
  setSubmissionTimestamps(recentSubmissions)
}

/**
 * Formats milliseconds into a human-readable wait time
 *
 * @param ms - Milliseconds to format
 * @returns Formatted string (e.g., "5 minutes 30 seconds")
 */
const formatWaitTime = (ms: number): string => {
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.ceil((ms % 60000) / 1000)

  if (minutes > 0 && seconds > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ${seconds} second${seconds > 1 ? 's' : ''}`
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''}`
  } else {
    return `${seconds} second${seconds > 1 ? 's' : ''}`
  }
}

/**
 * Contact Component
 *
 * Renders the contact section with form and contact information.
 * Handles form submission via EmailJS for real email delivery.
 * Implements client-side rate limiting to prevent spam.
 *
 * @returns Contact section with form and contact info
 */
export default function Contact() {
  /**
   * State: Form input values
   * Controlled components - each input's value is tied to this state
   */
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  /**
   * State: Whether form is currently being submitted
   * Used to disable inputs and show loading state during API call
   */
  const [isSubmitting, setIsSubmitting] = useState(false)

  /**
   * State: Submission result status
   * Displays success or error message to user after form submission
   */
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  /**
   * State: Rate limit status
   * Tracks whether user is rate limited and the wait time remaining
   */
  const [rateLimitStatus, setRateLimitStatus] = useState<{
    isLimited: boolean
    waitTime: string
  }>({ isLimited: false, waitTime: '' })

  /**
   * Form Submit Handler
   *
   * Handles the contact form submission process:
   * 1. Prevents default form submission (no page reload)
   * 2. Checks rate limit before proceeding
   * 3. Sets loading state and clears previous status messages
   * 4. Sends email via EmailJS API
   * 5. Records submission timestamp on success
   * 6. Shows success message and resets form on success
   * 7. Shows error message on failure
   * 8. Clears loading state in finally block
   *
   * @param e - Form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    // Prevent default form submission (would cause page reload)
    e.preventDefault()

    // Check rate limit before processing submission
    const rateCheck = checkRateLimit()
    if (rateCheck.isLimited && rateCheck.waitTimeMs) {
      const waitTime = formatWaitTime(rateCheck.waitTimeMs)
      setRateLimitStatus({
        isLimited: true,
        waitTime
      })
      setSubmitStatus({
        type: 'error',
        message: `You've reached the submission limit. Please wait ${waitTime} before submitting again.`
      })
      return // Stop submission process
    }

    // Clear rate limit status if previously set
    setRateLimitStatus({ isLimited: false, waitTime: '' })

    // Set loading state - disables inputs and shows "Sending..." on button
    setIsSubmitting(true)

    // Clear any previous success/error messages
    setSubmitStatus({ type: null, message: '' })

    try {
      /**
       * Send email via EmailJS
       *
       * EmailJS handles:
       * - Sending email from your configured service (Gmail, Outlook, etc.)
       * - Template variable substitution
       * - Rate limiting and spam prevention
       * - Domain validation (if configured in EmailJS dashboard)
       */
      await emailjs.send(
        EMAILJS_SERVICE_ID,     // Which email service to use
        EMAILJS_TEMPLATE_ID,    // Which email template to use
        {
          // Template variables (must match EmailJS template placeholders)
          from_name: formData.name,        // Sender's name
          from_email: formData.email,      // Sender's email (for replies)
          message: formData.message,       // Message content
          to_name: 'Tan Le',              // Recipient name (your name)
        },
        EMAILJS_PUBLIC_KEY      // API authentication
      )

      // Record this submission for rate limiting
      recordSubmission()

      // Show success message to user
      setSubmitStatus({
        type: 'success',
        message: 'Thank you! Your message has been sent successfully.'
      })

      // Clear form inputs after successful submission
      setFormData({
        name: '',
        email: '',
        message: ''
      })
    } catch (error) {
      // Log error for debugging (visible in browser console)
      console.error('EmailJS Error:', error)

      // Show user-friendly error message
      setSubmitStatus({
        type: 'error',
        message: 'Oops! Something went wrong. Please try again or email me directly.'
      })
    } finally {
      // Always clear loading state, regardless of success or failure
      setIsSubmitting(false)
    }
  }

  /**
   * Input Change Handler
   *
   * Updates form data state when user types in any input field.
   * Uses computed property name to update the correct field based
   * on the input's 'name' attribute.
   *
   * @param e - Input change event
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      // Use input's name attribute to update the corresponding field
      // e.g., name="email" updates formData.email
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
              {/* Status Message */}
              {submitStatus.type && (
                <div
                  className={`form-status ${submitStatus.type === 'success' ? 'form-status-success' : 'form-status-error'}`}
                  role="alert"
                >
                  {submitStatus.message}
                </div>
              )}

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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
                  required
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="form-submit"
                disabled={isSubmitting || rateLimitStatus.isLimited}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}