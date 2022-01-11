import { useState, useEffect } from "react";
import { getAPOD, APOD, missingAPOD } from "../API";

interface props {
  readableDate: string;
  apodDate: string;
  cardRef?: (...args: any[]) => any;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

// state for like button
interface likeState {
  liked: boolean;
}

const Card = ({ readableDate, apodDate, cardRef, setLoading }: props) => {
  const [liked, setLiked] = useState(() => {
    const store = window.localStorage.getItem(apodDate);
    if (store === null) {
      return false;
    }
    const postState: likeState = JSON.parse(store);
    return postState.liked;
  });

  const [postData, setPostData] = useState<APOD>();

  const likePost = () => {
    window.localStorage.setItem(apodDate, JSON.stringify({ liked: !liked }));
    setLiked((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        await getAPOD(apodDate);
        setPostData(await getAPOD(apodDate));
        if (setLoading !== undefined) {
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to load media:", err);
        setPostData(missingAPOD(apodDate));
        if (setLoading !== undefined) {
          setLoading(false);
        }
      }
    };
    fetchAPOD();
  }, [apodDate, setLoading]);

  return (
    <div
      className="my-4 mx-2 max-w-sm rounded-lg overflow-hidden shadow-lg bg-white"
      ref={cardRef}
    >
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
            onClick={likePost}
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
            {readableDate}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
