import { useRouter } from "vue-router";

export function useViewTransitionRouter() {
  const router = useRouter();

  const supportsViewTransitions = "startViewTransition" in document;

  /**
   * Navigate to a route, using view transitions if available.
   * @param {string | object} target - same as router.push target
   */
  function push(target) {
    if (supportsViewTransitions) {
      document.startViewTransition(() => {
        router.push(target);
      });
    } else {
      router.push(target);
    }
  }

  /**
   * Replace current route, with optional view transition
   * @param {string | object} target
   */
  function replace(target) {
    if (supportsViewTransitions) {
      document.startViewTransition(() => {
        router.replace(target);
      });
    } else {
      router.replace(target);
    }
  }

  function back() {
    if (supportsViewTransitions) {
      document.startViewTransition(() => {
        router.back();
      });
    } else {
      router.back();
    }
  }

  return {
    push,
    replace,
    back,
  };
}
