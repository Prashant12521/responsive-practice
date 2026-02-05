import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContact();
  }, []);

  function fetchContact() {
    axios.get("https://contact-t6km.onrender.com/api/contacts").then((res) => {
      setContacts(res.data.contacts);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { profile, name, phone } = e.target.elements;

    axios
      .post("https://contact-t6km.onrender.com/api/contacts", {
        profile: profile.value,
        name: name.value,
        phone: phone.value,
      })
      .then((res) => {
        console.log(res.data);
        fetchContact();

        profile.value = "";
        name.value = "";
        phone.value = "";
      });
  }

  function handleDelete(contactId) {
    axios
      .delete("https://contact-t6km.onrender.com/api/contacts/" + contactId)
      .then((res) => {
        console.log(res.data);
        fetchContact();
      });
  }

  function handleUpdate(contactId) {
    const profile = prompt("Update profile image url");
    const name = prompt("Update name");
    const phone = Number(prompt("Update number"));

    axios
      .patch("https://contact-t6km.onrender.com/api/contacts/" + contactId, {
        profile: profile,
        name: name,
        phone: phone,
      })
      .then((res) => {
        console.log(res.data);
        fetchContact();
      });
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 to-gray-800 p-8 pt-24 flex items-start justify-center gap-10 flex-wrap relative text-white">
      <form className="absolute top-3 flex gap-4" onSubmit={handleSubmit}>
        <input
          className="border px-2 py-1 rounded-2xl"
          type="text"
          placeholder="Enter Img URL"
          name="profile"
          required
        />
        <input
          className="border px-2 py-1 rounded-2xl"
          type="text"
          placeholder="Enter name"
          name="name"
        />
        <input
          className="border px-2 py-1 rounded-2xl"
          type="text"
          placeholder="Enter phone"
          name="phone"
        />
        <button className="hover:text-red-500">Submit</button>
      </form>

      {contacts.map((contact, idx) => {
        return (
          <div
            key={idx}
            className="w-[280px] rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl p-6 text-center"
          >
            {/* Profile Image */}
            <img
              src={contact.profile}
              alt="contact"
              className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-white/30 mb-4"
            />

            {/* Name */}
            <h1 className="text-xl font-semibold text-white">{contact.name}</h1>

            {/* Phone */}
            <p className="text-sm text-gray-300 mb-6">📞 {contact.phone}</p>

            {/* Actions */}
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => handleUpdate(contact._id)}
                className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 transition text-sm"
              >
                Update
              </button>

              <button
                onClick={() => handleDelete(contact._id)}
                className="px-4 py-2 rounded-full bg-red-500/20 hover:bg-red-500/30 transition text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default App;
