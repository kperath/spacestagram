import nasa from './nasa.jpg'
import { ReactComponent as LikeIcon } from './like_icon.svg'
import './App.css';

function App() {
  return (
    <div className="container bg-black mx-auto p-4 flex justify-center">
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img className="w-full" src={nasa} alt="Sunset in the mountains"/>
        <div className="px-6 py-4 bg-gray-100">
          <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
          <p className="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
          </p>
          <div className="mt-4">
            <LikeIcon className="fill-pink-500 stroke-black stroke-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
