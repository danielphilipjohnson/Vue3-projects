import { ItemsApiClientInterface } from './items'

/**
 * @Name ApiClientInterface
 * @description
 * Interface wraps all api client modules into one places for keeping code organized.
 */
export interface ApiClientInterface {
  // Type of objects we are going to interact with via GET, POST, PATCH
  items: ItemsApiClientInterface
}
