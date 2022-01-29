import { onBeforeUnmount } from "vue";

interface keycombo {
  key: string;
  fn: Function;
}

export const useKeydown = function (keyCombos: Array<keycombo>) {
  const onkey = function (event: KeyboardEvent) {
    const kc = keyCombos.find(({ key, fn }) => key == event.key);
    if (kc) {
      kc.fn();
    }
  };

  window.addEventListener("keydown", onkey);

  onBeforeUnmount(() => {
    window.removeEventListener("keydown", onkey);
  });
};

export default useKeydown;
