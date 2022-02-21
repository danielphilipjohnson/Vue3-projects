// group our constants in a namespace
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ItemsMutationType {
  export const loadItems = "loadItems";
  export const loadingItems = "loadingItems";
  export const loadedItems = "loadedItems";
  export const selectItem = "selectItem";
  // as you add new mutations to the Items store module, keep adding their names here as above
}
