import { useState } from 'react';
import nasa from './nasa.jpg'
import './App.css';

function App() {

  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-gray-100 h-screen">
      <div className="container mx-auto p-4 flex justify-center">
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg">
          <img className="w-full" src={nasa} alt="Sunset in the mountains"/>
          <div className="px-6 pt-4 pb-2 bg-white">
            <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
            </p>
            <button onClick={() => setLiked((prevState) => !prevState)} className={`border-2 border-transparent px-2 -ml-2 mt-2 rounded-full transform transition duration-500 scale-110 hover:scale-125 ${ liked ? "fill-red-500" : "fill-gray-400"}`}>
              <svg className="mt-1" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="current"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
