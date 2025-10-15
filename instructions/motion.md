# Motion.dev Animation Library

Motion.dev is a production-grade animation library for React that provides powerful, performant animations with a simple API. It's the successor to Framer Motion and offers 120fps animations, gesture support, and comprehensive animation tools.

## Quick Start

### Installation
```bash
bun add motion
```

### Basic Usage
```tsx
import { motion } from "motion/react"

function MyComponent() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      Animated content
    </motion.div>
  )
}
```

## Core Features

### 1. Animation Properties
Animate any CSS property or SVG attribute:

```tsx
<motion.div
  animate={{
    x: 100,           // Transform
    opacity: 0.5,     // CSS opacity
    backgroundColor: "#ff0000", // CSS color
    scale: 1.2,       // Transform scale
    rotate: 180       // Transform rotation
  }}
/>
```

### 2. Transitions
Control how animations interpolate between values:

```tsx
<motion.div
  animate={{ x: 100 }}
  transition={{
    duration: 0.8,        // Animation duration
    ease: "easeInOut",    // Easing function
    delay: 0.2,           // Start delay
    type: "spring",       // Animation type
    stiffness: 100,       // Spring physics
    damping: 10           // Spring damping
  }}
/>
```

### 3. Variants
Define animation states for cleaner code:

```tsx
const variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
}

<motion.div
  variants={variants}
  initial="hidden"
  animate="visible"
  exit="exit"
/>
```

### 4. Gestures
Respond to user interactions:

```tsx
<motion.div
  whileHover={{ scale: 1.05, backgroundColor: "#f0f0f0" }}
  whileTap={{ scale: 0.95 }}
  whileDrag={{ scale: 1.1, rotate: 5 }}
  drag="x"              // Enable dragging
  dragConstraints={{ left: -100, right: 100 }}
/>
```

## Advanced Components

### AnimatePresence
Handle enter/exit animations:

```tsx
import { AnimatePresence } from "motion/react"

function TodoList({ items }) {
  return (
    <AnimatePresence>
      {items.map(item => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
        >
          {item.text}
        </motion.div>
      ))}
    </AnimatePresence>
  )
}
```

### LayoutGroup
Coordinate layout animations across components:

```tsx
import { LayoutGroup } from "motion/react"

function CardGrid() {
  return (
    <LayoutGroup>
      {cards.map(card => (
        <motion.div layout key={card.id}>
          {card.content}
        </motion.div>
      ))}
    </LayoutGroup>
  )
}
```

## Powerful Hooks

### useAnimate
Programmatic animation control:

```tsx
import { useAnimate } from "motion/react"

function Component() {
  const [scope, animate] = useAnimate()

  const handleClick = async () => {
    await animate(scope.current, { x: 100 }, { duration: 0.5 })
    await animate(scope.current, { rotate: 360 }, { duration: 0.3 })
  }

  return <div ref={scope} onClick={handleClick} />
}
```

### useInView
Trigger animations when elements enter viewport:

```tsx
import { useInView } from "motion/react"

function ScrollReveal({ children }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  )
}
```

### useScroll
Create scroll-linked animations:

```tsx
import { useScroll, useTransform } from "motion/react"

function ParallaxComponent() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])

  return <motion.div style={{ y }} />
}
```

## Layout Animations

### Automatic Layout Animations
Motion automatically animates layout changes:

```tsx
function ExpandingCard() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      style={{
        width: isExpanded ? 300 : 200,
        height: isExpanded ? 400 : 200
      }}
    >
      Content
    </motion.div>
  )
}
```

### Shared Layout Animations
Animate elements between different components:

```tsx
// Component A
<motion.div layoutId=" expanding-card">
  <h3>Card Title</h3>
</motion.div>

// Component B (different location)
<motion.div layoutId=" expanding-card">
  <h3>Card Title</h3>
  <p>Full content here</p>
</motion.div>
```

## Performance Optimization

### LazyMotion
Reduce bundle size by loading features as needed:

```tsx
import { LazyMotion, domAnimation } from "motion/react"

function OptimizedAnimation() {
  return (
    <LazyMotion features={domAnimation}>
      <motion.div whileHover={{ scale: 1.1 }}>
        Only basic animations loaded
      </motion.div>
    </LazyMotion>
  )
}
```

### MotionConfig
Set global animation defaults:

```tsx
import { MotionConfig } from "motion/react"

function App() {
  return (
    <MotionConfig
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* All child animations inherit these defaults */}
    </MotionConfig>
  )
}
```

## Integration with shadcn/ui

Animate shadcn/ui components seamlessly:

```tsx
import { Button } from "@/components/ui/button"
import { motion } from "motion/react"

const MotionButton = motion(Button)

function AnimatedButton() {
  return (
    <MotionButton
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="transition-none" // Disable CSS transitions
    >
      Click me
    </MotionButton>
  )
}
```

## Common Animation Patterns

### Stagger Animations
Animate children with sequential delays:

```tsx
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
}

function StaggeredList() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {items.map((item, i) => (
        <motion.div key={i} variants={item}>
          {item.content}
        </motion.div>
      ))}
    </motion.div>
  )
}
```

### Page Transitions
Animate between routes:

```tsx
function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
```

## Accessibility

Motion respects user preferences for reduced motion:

```tsx
import { useReducedMotion } from "motion/react"

function AccessibleAnimation() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      animate={!shouldReduceMotion ? { x: 100 } : {}}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
    >
      Content
    </motion.div>
  )
}
```

## Best Practices

1. **Use layout prop for layout animations** - enables automatic layout animation
2. **Prefer transform properties** (x, y, scale, rotate) over layout properties for better performance
3. **Use variants** for complex state management
4. **Wrap route components with AnimatePresence** for page transitions
5. **Consider bundle size** - use LazyMotion for feature-specific loading
6. **Test reduced motion** - ensure animations work with accessibility preferences

## Configuration

No additional configuration required. Motion works out of the box with React and TypeScript.

For more detailed documentation and examples, visit the official [Motion.dev documentation](https://motion.dev).
