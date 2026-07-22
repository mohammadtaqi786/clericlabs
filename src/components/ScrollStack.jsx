import { useLayoutEffect, useRef } from 'react';
import Lenis from 'lenis';
import '../styles/components/ScrollStack.css';

export const ScrollStackItem = ({ children, itemClassName = '' }) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

const ScrollStack = ({
  children,
  className = '',
  itemDistance = 90,
  itemScale = 0.035,
  itemStackDistance = 26,
  stackPosition = '22%',
  scaleEndPosition = '12%',
  baseScale = 0.88,
  useWindowScroll = true,
  onStackComplete
}) => {
  const scrollerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lenisRef = useRef(null);
  const cardsRef = useRef([]);
  const baseTopsRef = useRef([]);
  const endTopRef = useRef(0);
  const stackCompletedRef = useRef(false);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(
      useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : scroller.querySelectorAll('.scroll-stack-card')
    );
    const endEl = useWindowScroll
      ? document.querySelector('.scroll-stack-end')
      : scroller.querySelector('.scroll-stack-end');

    cardsRef.current = cards;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.transformOrigin = 'top center';
      card.style.willChange = 'transform, filter';
      card.style.backfaceVisibility = 'hidden';
    });

    const parsePct = (val, vh) => {
      if (typeof val === 'string' && val.includes('%')) {
        return (parseFloat(val) / 100) * vh;
      }
      return parseFloat(val);
    };

    const cacheTops = () => {
      cards.forEach(c => {
        c.style.transform = 'translateZ(0)';
      });
      const currentScroll = useWindowScroll ? window.scrollY : scroller.scrollTop;
      baseTopsRef.current = cards.map(c => c.getBoundingClientRect().top + currentScroll);
      if (endEl) {
        endTopRef.current = endEl.getBoundingClientRect().top + currentScroll;
      }
    };

    const update = () => {
      if (!cardsRef.current.length) return;

      const scrollTop = useWindowScroll ? window.scrollY : scroller.scrollTop;
      const vh = useWindowScroll ? window.innerHeight : scroller.clientHeight;

      const stackPx = parsePct(stackPosition, vh);
      const scaleEndPx = parsePct(scaleEndPosition, vh);
      const pinEnd = endTopRef.current - vh / 2;

      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        const cardTop = baseTopsRef.current[i] || 0;
        const triggerStart = cardTop - stackPx - itemStackDistance * i;
        const triggerEnd = cardTop - scaleEndPx;
        const pinStart = triggerStart;

        const scaleProgress = clamp((scrollTop - triggerStart) / (triggerEnd - triggerStart), 0, 1);
        const targetScale = baseScale + i * itemScale;
        const scale = 1 - scaleProgress * (1 - targetScale);

        let translateY = 0;
        if (scrollTop >= triggerStart && scrollTop <= pinEnd) {
          translateY = scrollTop - cardTop + stackPx + itemStackDistance * i;
        } else if (scrollTop > pinEnd) {
          translateY = pinEnd - cardTop + stackPx + itemStackDistance * i;
        }

        card.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;

        if (i === cardsRef.current.length - 1) {
          const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
          if (isInView && !stackCompletedRef.current) {
            stackCompletedRef.current = true;
            onStackComplete?.();
          } else if (!isInView && stackCompletedRef.current) {
            stackCompletedRef.current = false;
          }
        }
      });
    };

    let lenis = null;
    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        lerp: 0.1
      });
      lenisRef.current = lenis;
    } catch (e) {
      console.warn('Lenis init:', e);
    }

    const raf = time => {
      if (lenisRef.current) {
        lenisRef.current.raf(time);
      }
      update();
      animationFrameRef.current = requestAnimationFrame(raf);
    };

    cacheTops();
    update();
    animationFrameRef.current = requestAnimationFrame(raf);

    const handleResize = () => {
      cacheTops();
      update();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('load', handleResize);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleResize);
      stackCompletedRef.current = false;
      cardsRef.current = [];
    };
  }, [
    itemDistance,
    itemScale,
    itemStackDistance,
    stackPosition,
    scaleEndPosition,
    baseScale,
    useWindowScroll,
    onStackComplete
  ]);

  return (
    <div
      className={`scroll-stack-scroller ${useWindowScroll ? 'scroll-stack-window-mode' : ''} ${className}`.trim()}
      ref={scrollerRef}
    >
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
