import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import * as yup from 'yup';
import './Sidebar.css';

// Yup validation schema
const feedbackSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  lastName: yup
    .string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),
  address: yup
    .string()
    .max(200, 'Address must be less than 200 characters'),
  country: yup
    .string()
    .max(50, 'Country name must be less than 50 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid e-mail'),
  phone: yup
    .string()
    .matches(/^[0-9+\-\s()]*$/, 'Phone number is not valid')
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be less than 15 digits')
});

const Sidebar = () => {
  const { isGridView, toggleView, showFeedback, toggleFeedback } = useAppContext();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    country: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate single field on change
    if (touched[name]) {
      try {
        await yup.reach(feedbackSchema, name).validate(value);
        setErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      } catch (error) {
        setErrors(prev => ({
          ...prev,
          [name]: error.message
        }));
      }
    }
  };

  const handleBlur = async (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate on blur
    try {
      await yup.reach(feedbackSchema, name).validate(value);
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        [name]: error.message
      }));
    }
  };

  const validateForm = async () => {
    try {
      await feedbackSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
      setTouched({
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        address: true,
        country: true
      });
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = await validateForm();
    if (isValid) {
      console.log('Feedback submitted:', formData);

      setFormData({
        firstName: '',
        lastName: '',
        address: '',
        country: '',
        email: '',
        phone: ''
      });
      setErrors({});
      setTouched({});

      alert('Thank you for your feedback!');
      toggleFeedback();
    }
  };

  return (
    <div className={`sidebar ${showFeedback ? 'expanded' : ''}`}>
      <div className="sidebar-left">
        <div className="greeting-card">
          <div className="avatar">
            <img src="https://i.pravatar.cc/60?img=1" alt="Avatar" />
          </div>
          <div className="greeting-text">
            <h3>Hi Reader,</h3>
            <p>Here's your News!</p>
          </div>
        </div>

        {!showFeedback && (
          <div className="view-toggle-card">
            <h3>View Toggle</h3>
            <div className="toggle-buttons">
              <button
                className={`toggle-btn ${isGridView ? 'active' : ''}`}
                onClick={toggleView}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                  <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                  <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                  <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
              <button
                className={`toggle-btn ${!isGridView ? 'active' : ''}`}
                onClick={toggleView}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="6" cy="6" r="2" fill="currentColor"/>
                  <circle cx="6" cy="12" r="2" fill="currentColor"/>
                  <circle cx="6" cy="18" r="2" fill="currentColor"/>
                  <line x1="12" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="2"/>
                  <line x1="12" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2"/>
                  <line x1="12" y1="18" x2="20" y2="18" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            </div>
          </div>
        )}

        <div className="feedback-card">
          <h3>Have a Feedback?</h3>
          <button className="feedback-btn" onClick={toggleFeedback}>
            We're Listening!
          </button>
        </div>
      </div>

      {showFeedback && (
        <div className="sidebar-right">
          <div className="feedback-form-card">
            <h2>Thank you so much for taking the time!</h2>
            <p className="feedback-subtitle">Please provide the below details!</p>

            <form onSubmit={handleSubmit} className="inline-feedback-form">
              <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="John"
                  className={errors.firstName && touched.firstName ? 'error' : ''}
                />
                {errors.firstName && touched.firstName && (
                  <span className="error-message">{errors.firstName}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Doe"
                  className={errors.lastName && touched.lastName ? 'error' : ''}
                />
                {errors.lastName && touched.lastName && (
                  <span className="error-message">{errors.lastName}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your full Postal Address"
                  rows="3"
                  className={errors.address && touched.address ? 'error' : ''}
                />
                {errors.address && touched.address && (
                  <span className="error-message">{errors.address}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="country">Country:</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="India"
                  className={errors.country && touched.country ? 'error' : ''}
                />
                {errors.country && touched.country && (
                  <span className="error-message">{errors.country}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email ID:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="example@sample.com"
                  className={errors.email && touched.email ? 'error' : ''}
                />
                {errors.email && touched.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your phone number"
                  className={errors.phone && touched.phone ? 'error' : ''}
                />
                {errors.phone && touched.phone && (
                  <span className="error-message">{errors.phone}</span>
                )}
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-feedback-btn">
                  Submit
                </button>
                <button type="button" className="cancel-feedback-btn" onClick={toggleFeedback}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
