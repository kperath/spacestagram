import dayjs from "dayjs";

export interface APOD {
  date: string;
  title: string;
  explanation: string;
  url: string;
  media_type: string;
}

const showDefaultOnError = (date: string): APOD => {
  return {
    date: date,
    title: "Uh Oh! The media you're looking for was lost in space!",
    explanation: "Please try again later.",
    url: "./nasa.jpg",
    media_type: "image",
  };
};

export const getAPOD = async (apodDate: string): Promise<APOD> => {
  try {
    const resp = await fetch(
      `${process.env.REACT_APP_API_URL}&date=${apodDate}`
    );
    return await resp.json();
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
    return showDefaultOnError(apodDate);
  }
};
