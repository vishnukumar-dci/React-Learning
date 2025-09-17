import React, { useState } from 'react';
import './Form.css';
import { registerUser } from '../../api/apiHelper';

export const Form = () => {

  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    gender: '',
    address: {
      line1: '',
      line2: '',
      country: '',
      postalCode: '',
      state: '',            
      city: ''
    },
    phoneno: ''
  });

  const [formError, setFormError] = useState({})


  const handleChange = (field, subfield, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: subfield
        ? {
          ...prevData[field],
          [subfield]: value,
        }
        : value,
    }));
  };

  const validateForm = () => {
    const errors = {
    }

    if (!formData.fullname.trim()) {
      errors.fullname = 'Username is required'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Invalid Email Address'
    }

    if (formData.password.length < 6) {
      errors.password = 'Passwords must be at least 6 characters'
    }

    if (!formData.gender.trim()) {
      errors.gender = 'Please select a one option'
    }

    if (!formData.address.line1.trim()) {
      errors.address = errors.address || {}
      errors.address.line1 = 'Address Line 1 is required'
    }

    if (!formData.address.city.trim()) {
      errors.address = errors.address || {}
      errors.address.city = 'City name is required'
    }

    if (!formData.address.country.trim()) {
      errors.address = errors.address || {}
      errors.address.country = 'Country name is required'
    }

    if (!formData.address.postalCode.trim()) {
      errors.address = errors.address || {}
      errors.address.postalCode = 'Postal code is required'
    }

    if (!formData.address.state.trim()) {
      errors.address = errors.address || {}
      errors.address.state = 'State name is required'
    }

    const phnoRegex = /^\+?[1-9]\d{1,14}$/

    if (!formData.phoneno) {
      errors.phoneno = 'Phone no is required'
    } else if (!phnoRegex.test(formData.phoneno)) {
      errors.phoneno = 'Must be valid phone number'
    }

    return errors;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();
    setFormError(error)

    if (Object.keys(error).length < 1) {
      try {
        const response = await registerUser(formData)
        console.log(response.message)
        alert('From submitted successfully')
        console.log(formData)
        setFormData({
          fullname: '',
          email: '',
          password: '',
          gender: '',
          address: {
            line1: '',
            line2: '',
            country: '',
            postalCode: '',
            state: '',
            city: ''
          },
          phoneno: ''

        })
      } catch (error) {
          console.error('Submisson failed:',error.response?.data || error.message)
          alert(`Failed to submit form,Please try again.`)
      }
    }
  };

  return (
    <div className="registration-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit} className='form' noValidate>
        <label htmlFor="fullname">Full Name</label>
        <input
          type="text"
          id='fullname'
          className="form-control"
          value={formData.fullname}
          onChange={(e) => handleChange('fullname', null, e.target.value)}
        />
        {formError.fullname && <div className="error">{formError.fullname}</div>}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id='email'
          className="form-control"
          value={formData?.email}
          onChange={(e) => handleChange('email', null, e.target.value)}
        />
        {formError.email && <div className="error">{formError.email}</div>}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id='password'
          className="form-control"
          value={formData?.password}
          onChange={(e) => handleChange('password', null, e.target.value)}
        />
        {formError.password && <div className="error">{formError.password}</div>}

        <label htmlFor="phno">Phone no</label>
        <input
          type="text"
          id='phno'
          className="form-control"
          value={formData?.phoneno}
          onChange={(e) => handleChange('phoneno', null, e.target.value)}
          placeholder='eg +12345678'
        />
        {formError.phoneno && <div className="error">{formError.phoneno}</div>}

        <fieldset className="gender-group">
          <legend>Gender</legend>
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={(e) => handleChange('gender', null, e.target.value)}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={(e) => handleChange('gender', null, e.target.value)}
            />
            Female
          </label>
        </fieldset>
        {formError.gender && <div className="error">{formError.gender}</div>}
        <fieldset>
          <legend>Address</legend>

          <label htmlFor="line1">Address Line 1  </label>
          <input
            type="text"
            id="line1"
            className="form-control"
            value={formData.address.line1}
            onChange={(e) => handleChange('address', 'line1', e.target.value)}
          />
          {formError.address?.line1 && <div className="error">{formError.address.line1}</div>}
          <br />
          <label htmlFor="line2">Address Line 2  </label>
          <input
            type="text"
            id="line2"
            className="form-control"
            value={formData.address.line2}
            onChange={(e) => handleChange('address', 'line2', e.target.value)}
          />

          <div className="address-row">
            <div className="address-col">
              <label htmlFor="city">City </label>
              <input
                type="text"
                id="city"
                className="form-control"
                value={formData.address.city}
                onChange={(e) => handleChange('address', 'city', e.target.value)}
              />
              {formError.address?.city && <div className="error">{formError.address.city}</div>}
            </div>

            <div className="address-col">
              <label htmlFor="state">State </label>
              <input
                type="text"
                id="state"
                className="form-control"
                value={formData.address.state}
                onChange={(e) => handleChange('address', 'state', e.target.value)}
              />
              {formError.address?.state && <div className="error">{formError.address.state}</div>}
            </div>
          </div>

          <div className="address-row">
            <div className="address-col">
              <label htmlFor="postalCode">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                className="form-control"
                value={formData.address.postalCode}
                onChange={(e) => handleChange('address', 'postalCode', e.target.value)}
              />
              {formError.address?.postalCode && <div className="error">{formError.address.postalCode}</div>}
            </div>

            <div className="address-col">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                className="form-control"
                value={formData.address.country}
                onChange={(e) => handleChange('address', 'country', e.target.value)}
              />
              {formError.address?.country && <div className="error">{formError.address.country}</div>}
            </div>
          </div>
        </fieldset>

        <button type="submit" className="submit-btn">
          Register
        </button>
      </form>
    </div>
  );
}
