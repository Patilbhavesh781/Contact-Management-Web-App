import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

function ContactForm({ onContactAdded }) {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  // Validation
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

  // Handle change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({});
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the form errors");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/contacts", formData);
      toast.success("Contact added successfully 🎉");
      setFormData(initialState);
      onContactAdded && onContactAdded();
    } catch (error) {
      toast.error("Failed to add contact. Try again.");
      console.error(error);
    }
  };

  const isFormValid =
    formData.name &&
    formData.phone &&
    (!formData.email ||
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email));

  return (
    <div className="max-w-xl mx-auto mb-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Add New Contact
      </h2>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 9876543210"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Optional message..."
            rows="4"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-2 rounded-lg text-white font-medium transition ${
            isFormValid
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Submit Contact
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
