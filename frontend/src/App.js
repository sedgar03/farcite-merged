import React, { useState } from 'react';

function App() {
  const [message, setMessage] = useState('Click "Fetch Data" to load message from backend');
  const [inputText, setInputText] = useState('');
  const [sentMessage, setSentMessage] = useState('');

  const fetchData = () => {
    setMessage('Loading...');
    const url = `${window.location.protocol}//${window.location.hostname}:8080/api/hello`;
    console.log('Fetching from:', url);
    fetch(url)
      .then(response => {
        console.log('Response received');
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        console.log('All response headers:');
        for (let [key, value] of response.headers.entries()) {
          console.log(key + ': ' + value);
        }
        console.log('Content-Type:', response.headers.get('content-type'));
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          return response.text().then(text => {
            console.log('Response text:', text);
            throw new TypeError("Oops, we haven't got JSON!");
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Response data:', data);
        setMessage(data.message);
      })
      .catch(error => {
        console.error('Fetch error:', error);
        if (error instanceof TypeError) {
          console.log('TypeError caught. Response might not be JSON.');
        }
        setMessage(`Error loading data: ${error.message}`);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSentMessage(inputText);
    setInputText('');
    // Here you would typically send the data to your backend
    // For now, we're just updating the state
  };

  return (
    <div className="App">
      <h1>React Frontend</h1>
      <button onClick={fetchData}>Fetch Data</button>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your message"
        />
        <button type="submit">Send</button>
      </form>
      {sentMessage && <p>You sent: {sentMessage}</p>}
    </div>
  );
}

export default App;