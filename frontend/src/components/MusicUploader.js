import React, { useState } from 'react';

function MusicUploader() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.log('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('File uploaded successfully');
        // Handle further actions or display success message
      } else {
        console.log('Failed to upload file');
        // Handle error case
      }
    } catch (error) {
      console.error('Error occurred while uploading file:', error);
      // Handle error case
    }
  };

  return (
    <div className='flex flex-col'>
      <input type="file" onChange={handleFileChange}/>
      <button className='bg-red-500 p-2 rounded-md text-white hover:bg-red-700 mr-2 mt-3' onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default MusicUploader;
