import { Variants } from 'framer-motion'

type AnimationType = 'fade' | 'slideUp' | 'slideDown' | 'scale' | 'none'

interface AnimationOptions {
  delay?: number
  duration?: number
  distance?: number
  ease?: string | number[]
}

// Фабрика для создания вариантов анимации
export const createAnimation = (
  type: AnimationType = 'fade',
  options: AnimationOptions = {}
): Variants => {
  const { delay = 0, duration = 0.5, distance = 30, ease = 'easeOut' } = options

  const animations = {
    fade: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { duration, delay, ease }
      }
    },
    slideUp: {
      hidden: { opacity: 0, y: distance },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration, delay, ease }
      }
    },
    slideDown: {
      hidden: { opacity: 0, y: -distance },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration, delay, ease }
      }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { duration, delay, ease: 'backOut' }
      }
    },
    none: {
      hidden: {},
      visible: {}
    }
  }

  return animations[type]
}

// Для создания stagger-контейнера с кастомными настройками
export const createStaggerContainer = (
  staggerChildren: number = 0.15,
  delayChildren: number = 0.2
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren
    }
  }
})
