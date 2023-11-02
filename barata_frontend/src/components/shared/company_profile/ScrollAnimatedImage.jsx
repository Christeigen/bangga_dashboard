import { useEffect, useRef, useState } from 'react';

export default function ScrollAnimatedImage({ src, alt }) {
  const imageRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      });
    }, options);

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }
  }, []);

  return (
    <img
      ref={imageRef}
      src={src}
      alt={alt}
      className={`w-[100%] h-[100%] object-cover rounded-3xl transition-transform duration-200 ease-in-out transform ${
        isVisible ? 'scale-100' : 'scale-0'
      }`}
    />
  );
}
