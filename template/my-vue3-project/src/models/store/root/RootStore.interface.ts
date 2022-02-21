// GEN-IMPORTS
import { ItemsStateInterface } from "../items/ItemsState.interface";

/**
 * @name RootStoreInterface
 * @description
 * Wraps together each store module interface in one place
 */
export interface RootStoreInterface {
  // GEN-INTERFACE-PROPS
  itemsState: ItemsStateInterface;
  // additional domain-specific module interfaces we’ll be added here in the next book chapters
}
