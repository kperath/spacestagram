import Card from "./components/Card";
import dayjs from "dayjs";
import { useState, useEffect } from "react";

function App() {
  const [posts, setPosts] = useState<dayjs.Dayjs[]>([]);

  useEffect(() => {
    const last3Months: dayjs.Dayjs[] = [];
    for (let i = 1; i <= 9; i++) {
      last3Months.push(dayjs().add(-i, "day"));
    }
    setPosts(last3Months);
  }, []);

  return (
    <div className="bg-gray-100 h-screen">
      <h1 className="app-title text-6xl md:text-8xl p-6 text-center">
        Spacestagram
      </h1>
      <h6 className="app-title text-center mb-2">Powered by Nasa 🚀</h6>

      <Card />
      {posts.forEach((p) => console.log(p))}
    </div>
  );
}

export default App;
