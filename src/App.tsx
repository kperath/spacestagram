import Card from "./components/Card";
import dayjs from "dayjs";
import { useState, useEffect } from "react";

function App() {
  const [posts, setPosts] = useState<dayjs.Dayjs[]>([]);

  useEffect(() => {
    const last3Months: dayjs.Dayjs[] = [];
    for (let i = 0; i < 30; i++) {
      last3Months.push(dayjs().add(-i, "day"));
    }
    setPosts(last3Months);
  }, []);

  return (
    <div className="bg-gray-100 h-screen">
      <h1 className="app-title text-6xl md:text-8xl p-6 text-center">
        Spacestagram
      </h1>
      <h6 className="app-title text-center mb-2 w-screen">
        Powered by Nasa 🚀
      </h6>

      <div className="container mx-auto p-4 flex flex-wrap justify-center">
        {posts.map((p) => (
          <Card dateTime={p.format("ddd, DD MMM YYYY").toString()} />
        ))}
      </div>
    </div>
  );
}

export default App;
