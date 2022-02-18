import Item  from '@/models/items/item.interface'

/**
 * @name ItemsStateInterface
 * @description
 * Interface for the Items state
 */
export interface ItemsStateInterface {
  loading: boolean
  items: Item[]
}