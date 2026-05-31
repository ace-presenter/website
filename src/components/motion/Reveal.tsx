import {
  Children,
  cloneElement,
  isValidElement,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";

/**
 * Entrance reveal — pure CSS (`.ace-reveal`, see globals.css). Fades + lifts
 * content in on mount with no JavaScript, no IntersectionObserver, and no
 * motion runtime, so content is never left stuck hidden if any of those fail.
 * Reduced motion is handled in the stylesheet (the keyframes live behind a
 * `prefers-reduced-motion: no-preference` query, so the element just renders
 * visible). These are plain server components.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  /** Seconds. */
  className?: string;
}) {
  return (
    <div
      className={`ace-reveal ${className}`}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}

/**
 * Stagger — lays out its children and gives each one an incremental
 * `animation-delay`, so they cascade in. Children should be <Item>.
 */
export function Stagger({
  children,
  stagger = 0.1,
  delayChildren = 0,
  className = "",
}: {
  children: ReactNode;
  stagger?: number;
  delayChildren?: number;
  className?: string;
}) {
  let i = 0;
  return (
    <div className={className}>
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return child;
        const delay = delayChildren + i * stagger;
        i += 1;
        const el = child as ReactElement<{ style?: CSSProperties }>;
        return cloneElement(el, {
          style: { ...el.props.style, animationDelay: `${delay}s` },
        });
      })}
    </div>
  );
}

/** A single staggered child. Rendered inside <Stagger>, which injects the delay. */
export function Item({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`ace-reveal ${className}`} style={style}>
      {children}
    </div>
  );
}
