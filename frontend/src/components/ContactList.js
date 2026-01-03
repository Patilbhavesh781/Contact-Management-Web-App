import { useEffect, useState } from "react";
import axios from "axios";

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch contacts
  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contacts");
      setContacts(res.data);
    } catch (error) {
      console.error(error);
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
      console.error(error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Contact List
      </h2>

      {/* Loading State */}
      {loading && (
        <p className="text-center text-gray-500">Loading contacts...</p>
      )}

      {/* Empty State */}
      {!loading && contacts.length === 0 && (
        <p className="text-center text-gray-500">
          No contacts found. Add one above 👆
        </p>
      )}

      {/* Table */}
      {!loading && contacts.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Phone
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Message
                </th>
                <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {contacts.map((contact) => (
                <tr
                  key={contact._id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2 text-gray-800">
                    {contact.name}
                  </td>
                  <td className="px-4 py-2 text-gray-600">
                    {contact.email || "-"}
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    {contact.phone}
                  </td>
                  <td className="px-4 py-2 text-gray-600">
                    {contact.message || "-"}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => deleteContact(contact._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ContactList;
