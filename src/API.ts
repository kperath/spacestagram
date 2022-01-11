import errorImage from "./error_image.jpg";

export interface APOD {
  date: string;
  title: string;
  explanation: string;
  url: string;
  media_type: string;
}

export const missingAPOD = (date: string): APOD => {
  return {
    date: date,
    title: "Uh Oh! The media you're looking for was lost in space!",
    explanation: "Please try again later.",
    url: errorImage,
    media_type: "image",
  };
};

export const getAPOD = async (apodDate: string): Promise<APOD> => {
  try {
    const resp = await fetch(
      `${process.env.REACT_APP_API_URL}&date=${apodDate}`
    );
    if (resp.ok) {
      return await resp.json();
    }
    throw new Error("Failed to retrieve media");
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    }
    return missingAPOD(apodDate);
  }
};
