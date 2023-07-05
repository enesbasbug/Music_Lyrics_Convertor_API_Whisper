import React, { useState } from 'react';

function LyricsAPI() {
  const [responseText, setResponseText] = useState('');
  const [responseTime, setResponseTime] = useState(0);

  async function handleClick() {
    try {
      const startTime = performance.now(); // Start time measurement
      const response = await fetch('http://127.0.0.1:5000/execute', {
        method: 'POST',
      });
      const endTime = performance.now(); // End time measurement
      const data = await response.text();
      console.log(data); // Log the raw response text to the console
      setResponseText(data);
      setResponseTime(endTime - startTime); // Set the response time in milliseconds
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='flex flex-col justify-center items-center '>
      <h3 className='mr-2'>Lyrics API</h3>
      <button className='bg-blue-500 p-2 rounded-md text-white hover:bg-blue-700' onClick={handleClick}>Execute Script</button>
      {responseText && (
        <p className='text-sm' style={{ whiteSpace: 'pre-line' }}>API Response: {responseText}</p>
      )}
      {responseTime > 0 && <p>Response Time: {responseTime} ms</p>}
    </div>
  );
}

export default LyricsAPI;
