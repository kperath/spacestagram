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
    title: "Uh Oh! This Image was lost in space",
    explanation: "Failed to retrieve image",
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
