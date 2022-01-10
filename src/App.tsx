import Card from "./components/Card";
import dayjs from "dayjs";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";

function App() {
  const [posts, setPosts] = useState<dayjs.Dayjs[]>([]);
  const [pageLimit, setPageLimit] = useState(10);

  // Infinite scroll
  const observer = useRef<IntersectionObserver>();
  const endCardRef = useCallback(
    (node) => {
      // disconnect observer from previous last node
      if (observer.current) observer.current.disconnect();

      // check if entry is intersecting (only observing one node at a time)
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          let i = pageLimit;
          const accumulateMoreDays: dayjs.Dayjs[] = [];
          for (; i < pageLimit + 10; i++) {
            accumulateMoreDays.push(dayjs().add(-i, "day"));
          }
          setPageLimit(i);
          setPosts((prevState) => prevState.concat(accumulateMoreDays));
        }
      });

      // if an end node exists, observe it
      if (node) observer.current.observe(node);
    },
    [pageLimit]
  );

  // load posts from last 10 days
  useEffect(() => {
    const last10Days: dayjs.Dayjs[] = [];
    for (let i = 0; i < 10; i++) {
      last10Days.push(dayjs().add(-i, "day"));
    }
    setPosts(last10Days);
  }, []);

  const postCards = useMemo(() => {
    return posts.reduce((accumulator: JSX.Element[], p, i) => {
      const apodDate = p.format("YYYY-MM-DD").toString();
      const readableDate = p.format("ddd, DD MMM YYYY").toString();

      if (
        (pageLimit >= posts.length && i === posts.length - 1) ||
        i === pageLimit
      ) {
        accumulator.push(
          <Card
            key={apodDate}
            readableDate={readableDate}
            apodDate={apodDate}
            cardRef={endCardRef}
          />
        );
      } else if (i < pageLimit - 1) {
        accumulator.push(
          <Card
            key={apodDate}
            readableDate={readableDate}
            apodDate={apodDate}
          />
        );
      }

      return accumulator;
    }, []);
  }, [posts, pageLimit, endCardRef]);

  return (
    <div className="bg-gray-100">
      <h1 className="app-title text-6xl md:text-8xl p-6 text-center">
        Spacestagram
      </h1>
      <h6 className="app-title text-center mb-2">Powered by Nasa 🚀</h6>

      <div className="container mx-auto p-4 flex flex-wrap items-start justify-center">
        {postCards}
      </div>
    </div>
  );
}

export default App;
