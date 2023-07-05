import React from 'react';
import MusicUploader from './MusicUploader'
import LyricsAPI from './LyricsAPI';

function Main() {
  const handleMusicUpload = (musicFile) => {
    // Handle the uploaded music file
    // You can pass the file to your API or perform any necessary processing

    // Example: Log the music file name
    console.log(musicFile.name);
  }

  return (
    <div className="flex items-center justify-center bg-gray-400">
      <div className="bg-gray-200 rounded-lg p-8">
        <div className="overflow-y-auto">
          <div className="flex">
            <div className="bg-blue-200 rounded-lg p-4 mr-4"> 
              <MusicUploader onMusicUpload={handleMusicUpload}/>
            </div>
            <div className="bg-red-200 rounded-lg p-4">
              <LyricsAPI/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
