import { GiphyFetch } from "@giphy/js-fetch-api";

export const searchGiphy = async (searchTerm: string) => {
  const API_KEY = process.env.VUE_APP_GIPHY_API_KEY;

  if (API_KEY) {
    const gf = new GiphyFetch(API_KEY);
    const { data } = await gf.search(searchTerm, {
      sort: "relevant",
      limit: 10,
      type: "stickers",
    });

    return data;
  } else {
    throw new Error("Unable to fetch searched gifs");
  }
};
