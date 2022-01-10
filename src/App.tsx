import Card from './components/Card';

function App() {
  return (
    <div className="bg-gray-100 h-screen">
      <h1 className="app-title text-6xl md:text-8xl p-6 text-center">Spacestagram</h1>
      <h6 className="app-title text-center mb-2">Powered by Nasa 🚀</h6>
      <Card/>
    </div>
  );
}

export default App;
