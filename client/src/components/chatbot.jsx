import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Chatbot() {
  const [query, setQuery] = useState('');
  const [reply, setReply] = useState('');

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSendQuery = async () => {
    try {
      const response = await axios.post('/api/chatbot', { query });
      setReply(response.data.result); // Assuming the server responds with a result
    } catch (error) {
      console.error('Error sending query:', error);
    }
  };

  return (
    <div>
      <div>
        <input type="text" value={query} onChange={handleQueryChange} />
        <button onClick={handleSendQuery}>Send</button>
      </div>
      <div>
        <p>Chatbot Reply: {reply}</p>
      </div>
    </div>
  );
}

export default Chatbot;
