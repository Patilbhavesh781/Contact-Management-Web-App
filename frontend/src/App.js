import { useEffect, useState } from "react";
import axios from "axios";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all contacts (GET API)
  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contacts");
      setContacts(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching contacts", error);
      setLoading(false);
    }
  };

  // Delete contact (Bonus)
  const deleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/contacts/${id}`);
      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Error deleting contact", error);
    }
  };

  // Fetch contacts on initial load
  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="app-container">
      <h1>Contact Management App</h1>

      <ContactForm onContactAdded={fetchContacts} />

      {loading ? (
        <p>Loading contacts...</p>
      ) : (
        <ContactList contacts={contacts} deleteContact={deleteContact} />
      )}
    </div>
  );
}

export default App;
