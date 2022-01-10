import { useState } from 'react';
import nasa from './nasa.jpg'
import './App.css';
import Card from './components/Card';

function App() {

  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-gray-100 h-screen">
      <Card/>
    </div>
  );
}

export default App;
