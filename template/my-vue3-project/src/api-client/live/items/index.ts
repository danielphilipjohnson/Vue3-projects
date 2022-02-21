import {
  ItemsApiClientUrlsInterface,
  ItemsApiClientInterface,
  ItemsApiClientModel,
} from "@/models/api-client/items";

import { config } from "@/config";

// urls for this API client
const urls: ItemsApiClientUrlsInterface = config.items.apiUrls;

// instantiate the ItemsApiClient pointing at the url that returns the live data from an API server
const itemsApiClient: ItemsApiClientInterface = new ItemsApiClientModel(urls);
// export our instance
export default itemsApiClient;
