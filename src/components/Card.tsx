import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { getAPOD, APOD } from "../API";
import nasa from "../nasa.jpg";

interface props {
  date: dayjs.Dayjs;
}

const Card = ({ date }: props) => {
  const [liked, setLiked] = useState(false);
  const [postData, setPostData] = useState<APOD>();
  const dateTime = date.format("ddd, DD MMM YYYY").toString();

  useEffect(() => {
    const apodDate = date.format("YYYY-MM-DD");
    const fetchAPOD = async () => {
      try {
        setPostData({
          date: apodDate,
          title: "Comet Leonard's Tail Wag",
          explanation:
            "Why does Comet Leonard's tail wag? The featured time-lapse video shows the ion tail of Comet C/2021 A1 (Leonard) as it changed over ten days early last month.  The video was taken by NASA's Solar Terrestrial Relations Observatory-Ahead (STEREO-A) spacecraft that co-orbits the Sun at roughly the same distance as the Earth. Each image in this 29-degree field was subtracted from following image to create frames that highlight differences. The video clearly shows Comet Leonard's long ion tail extending, wagging, and otherwise being blown around by the solar wind -- a stream of fast-moving ions that stream out from the Sun.  Since the video was taken, Comet Leonard continued plunging toward the Sun, reached its closest approach to the Sun between the orbits of Mercury and Venus, survived this closest approach without breaking apart, and is now fading as heads out of our Solar System.   Tuesday over Zoom: APOD editor to present the Best APOD Space Images of 2021",
          url: "https://www.youtube.com/embed/RtDSxi-D4KA?rel=0",
          media_type: "video",
        });
      } catch (err) {
        console.error("Failed to load image:", err);
      }
    };
    fetchAPOD();
  }, [date]);

  return (
    <div className="my-4 mx-2 max-w-sm rounded-lg overflow-hidden shadow-lg bg-white">
      {postData?.media_type === "video" ? (
        <iframe
          className="w-full aspect-video"
          src={postData.url}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <img className="w-full" src={postData?.url} alt={postData?.title} />
      )}
      <div className="px-6 pt-4 pb-2">
        <div className="font-bold text-xl mb-2">{postData?.title}</div>
        <p className="text-gray-700 text-base">{postData?.explanation}</p>
        <div className="flex align-bottom mt-2 mb-1 justify-between">
          <button
            onClick={() => setLiked((prevState) => !prevState)}
            className={`border-2 border-transparent px-2 -ml-2 rounded-full transform transition duration-300 scale-110 hover:scale-125 ${
              liked ? "fill-red-500" : "fill-gray-400"
            }`}
          >
            <svg
              className="mt-1"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="current"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
          <span className="bg-gray-200 rounded-full px-3 -mr-4 py-1 text-sm font-semibold text-gray-700 mt-1">
            {dateTime}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
