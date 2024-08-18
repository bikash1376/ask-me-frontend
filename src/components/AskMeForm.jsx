import React, { useState } from 'react';
import '../App.css';

const AskMeForm = () => {
  const [newMessage, setNewMessage] = useState({ message: '' });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setNewMessage({ message: e.target.value });
  };

  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/send-message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newMessage }),
      });
      setMessage('Sent successfully!');
      setTimeout(() => {
        setMessage('');
      }, 3000);
      if (!response.ok) throw new Error('Failed to add item');
      setNewMessage({ message: '' }); // Clear the input field
    } catch (error) {
      console.error('Error adding message:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-gray-900 text-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-4">Ask Me Anything</h1>
          <form onSubmit={handleMessage}>
            <textarea
              type="text"
              className="w-full h-32 p-4 mb-4 border-2 text-black border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Type your question..."
              value={newMessage.message}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full"
            >
              <i className="fa-solid fa-wand-sparkles"></i> <span>  Send Message</span>
            </button>
          </form>
          {message && (
    <div
      className="text-green-600 font-bold py-2 px-4 rounded bg-green-100 border border-green-500"
      role="alert"
    >
      {message}
    </div>
  )}
        </div>
      </div>
    </div>
  );
};

export default AskMeForm;