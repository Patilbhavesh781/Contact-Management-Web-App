import { useEffect, useState } from "react";
import axios from "axios";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  // Fetch contacts
  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contacts");
      setContacts(res.data);
    } catch (error) {
      console.error("Error fetching contacts", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete contact
  const deleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/contacts/${id}`);
      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Error deleting contact", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Search filter
  const filteredContacts = contacts.filter((contact) =>
    `${contact.name} ${contact.email} ${contact.phone}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Sorting
  const sortedContacts = [...filteredContacts].sort((a, b) => {
    if (sortOrder === "az") return a.name.localeCompare(b.name);
    if (sortOrder === "za") return b.name.localeCompare(a.name);
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center text-purple-700">
          Contact Management App
        </h1>

        {/* Form */}
        <ContactForm onContactAdded={fetchContacts} />

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl shadow">
          <input
            type="text"
            placeholder="Search by name, email or phone"
            className="w-full md:w-1/2 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="az">Name A–Z</option>
            <option value="za">Name Z–A</option>
          </select>
        </div>

        {/* Contact List */}
        {loading ? (
          <p className="text-center text-gray-500">Loading contacts...</p>
        ) : (
          <ContactList
            contacts={sortedContacts}
            deleteContact={deleteContact}
          />
        )}
      </div>
    </div>
  );
}

export default App;
