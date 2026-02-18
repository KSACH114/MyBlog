import Lenis from 'lenis'
import { onMounted, onUnmounted } from 'vue'

export function useLenis() {
  let lenis = null
  let rafId = null

  onMounted(() => {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
    })

    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)
  })

  onUnmounted(() => {
    if (lenis) {
      lenis.destroy()
      cancelAnimationFrame(rafId)
    }
  })

  return {
    getLenis: () => lenis
  }
}
