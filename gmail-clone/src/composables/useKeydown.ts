import { onBeforeUnmount } from 'vue';

interface keycombo {
  key: String,
  fn: Function
}

export const useKeydown = function (keyCombos: Array<keycombo>) {
  let onkey = function (event: KeyboardEvent) {
    let kc = keyCombos.find(({ key, fn }) => key == event.key)
    if (kc) {
      kc.fn()
    }
  }

  window.addEventListener('keydown', onkey);

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onkey);
  })
}

export default useKeydown;