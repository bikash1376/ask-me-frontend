import React, { useState, useEffect } from 'react';

function MessageList() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/admin`)
      .then(response => response.json())
      .then(data => {
        setMessages(data.messages); // Access the messages key
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
  }, [messages]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete message');
      setMessages(messages.filter(message => message._id !== id));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Message List</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="list-none mb-4">
            {messages.map((message) => (
              <li key={message._id} className="py-4 border-b border-gray-200">
                <div className="flex items-center">
                  <img
                    src="https://api.dicebear.com/9.x/pixel-art/svg?seed=Chester"
                    alt="User Avatar"
                    height={10} width={10}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div>
                    <h2 className="text-lg font-bold">{message.name}</h2>
                    <p className="text-gray-600">{message.message}</p>
                  </div>
                  <button
                    className="ml-4 text-red-600 hover:text-red-900 transition duration-300 ease-in-out"
                    onClick={() => handleDelete(message._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MessageList;