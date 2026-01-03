import { useState } from "react";
import toast from "react-hot-toast";

function ContactList({ contacts, deleteContact }) {
  const [confirmId, setConfirmId] = useState(null);

  const handleDelete = async () => {
    try {
      await deleteContact(confirmId);
      toast.success("Contact deleted successfully");
    } catch {
      toast.error("Failed to delete contact");
    } finally {
      setConfirmId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Contact List
      </h2>

      {/* Empty State */}
      {contacts.length === 0 && (
        <p className="text-center text-gray-500">
          No contacts found. Add one above 👆
        </p>
      )}

      {/* DESKTOP TABLE */}
      {contacts.length > 0 && (
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                {["Name", "Email", "Phone", "Message", "Action"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-2 text-left text-sm font-medium text-gray-700"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y">
              {contacts.map((c) => (
                <tr key={c._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{c.name}</td>
                  <td className="px-4 py-2">{c.email || "-"}</td>
                  <td className="px-4 py-2">{c.phone}</td>
                  <td className="px-4 py-2">{c.message || "-"}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => setConfirmId(c._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600"
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

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-4">
        {contacts.map((c) => (
          <div
            key={c._id}
            className="border rounded-xl p-4 shadow-sm space-y-2"
          >
            <p className="font-semibold text-lg">{c.name}</p>
            <p className="text-sm text-gray-600">
              📧 {c.email || "-"}
            </p>
            <p className="text-sm">📞 {c.phone}</p>
            {c.message && (
              <p className="text-sm text-gray-600">💬 {c.message}</p>
            )}
            <button
              onClick={() => setConfirmId(c._id)}
              className="w-full mt-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* DELETE CONFIRM MODAL */}
      {confirmId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-80 space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Delete Contact?
            </h3>
            <p className="text-sm text-gray-600">
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmId(null)}
                className="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContactList;
