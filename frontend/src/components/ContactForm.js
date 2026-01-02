import { useState } from "react";
import axios from "axios";

const initialState = {
  name: "",
  email: "",
  phone: "",
  message: ""
};

function ContactForm({ onContactAdded }) {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // Validate form fields
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (
      formData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({});
    setSuccess("");
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await axios.post("http://localhost:5000/api/contacts", formData);
      setSuccess("Contact added successfully!");
      setFormData(initialState);
      onContactAdded();
    } catch (error) {
      console.error(error);
    }
  };

  const isFormValid =
    formData.name &&
    formData.phone &&
    (!formData.email ||
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email));

  return (
    <div className="form-container">
      <h2>Add Contact</h2>

      <form onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          name="name"
          placeholder="Name *"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <input
          type="text"
          name="phone"
          placeholder="Phone *"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <p className="error">{errors.phone}</p>}

        <textarea
          name="message"
          placeholder="Message (optional)"
          value={formData.message}
          onChange={handleChange}
        />

        <button type="submit" disabled={!isFormValid}>
          Submit
        </button>

        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
}

export default ContactForm;
