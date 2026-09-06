import { Children, useEffect, useState, type ReactNode } from "react";
import { useInterval } from "usehooks-ts";
import styles from "./RotatingPrompt.module.css";

type RotatingPromptProps = {
  children: ReactNode;
  intervalMs?: number;
  transitionMs?: number;
  /**
   * Items get laid out with absolute position because of the animation need,
   * so the wrapper will be of size 0. As a workaround for now, pass a utility
   * class that matches the height of the content, and this component hands
   * it down to the wrapper.
   */
  className?: string;
};

export default function RotatingPrompt({
  children,
  intervalMs = 3000,
  transitionMs = 400,
  className,
}: RotatingPromptProps) {
  const items = Children.toArray(children);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);

  useInterval(
    () => {
      // some transition is already running if we still have a previous index
      if (previousIndex !== null) return;
      setPreviousIndex(currentIndex);
      // use the updater function version to ensure we always get the correct value of items
      setCurrentIndex((i) => (i + 1) % items.length);
    },
    items.length > 1 ? intervalMs : null,
  );

  useEffect(() => {
    if (previousIndex === null) return;

    // For CSS transitions to work, the browser must render the old value at least once before the new value is rendered. Apparently, if we do this
    // in one animation frame, there's no transition, because we're applying the old and then the new value in the same pass. We need:
    // - one frame for the starting position (the incoming item with the "enter" class, and the outgoing one with the current class)
    // - another frame where the incoming item has the current class and the outgoing item has the exit class
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setIsAnimating(true));
    });

    // after the animation duration is over, previous index is null (so it's removed from layout) and isAnimating is false (so the current item has the "current" class)
    const timeoutId = window.setTimeout(() => {
      setPreviousIndex(null);
      setIsAnimating(false);
    }, transitionMs);

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      clearTimeout(timeoutId);
    };
  }, [previousIndex, transitionMs]);

  if (items.length === 0) {
    return null;
  }

  const currentClass =
    previousIndex === null || isAnimating
      ? `${styles.item} ${styles.current}`
      : `${styles.item} ${styles.enter}`;

  const previousClass = isAnimating
    ? `${styles.item} ${styles.exit}`
    : `${styles.item} ${styles.current}`;

  return (
    <div className={`${styles["rotating-prompt"]} ${className ?? ""}`}>
      {previousIndex !== null && (
        <div
          key={`prev-${previousIndex}`}
          className={previousClass}
          style={{ transitionDuration: `${transitionMs}ms` }}
        >
          {items[previousIndex]}
        </div>
      )}
      <div
        key={`current-${currentIndex}`}
        className={currentClass}
        style={{ transitionDuration: `${transitionMs}ms` }}
      >
        {items[currentIndex]}
      </div>
    </div>
  );
}
