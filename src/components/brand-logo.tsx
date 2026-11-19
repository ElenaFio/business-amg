import { useEffect, useRef, useState } from 'react';

export const LOGO_SRC = '/images/Logo-BU-horizontal.png';

export function BrandLogo({ className = '', alt = 'Business' }: { className?: string; alt?: string }) {
  const ref = useRef<HTMLImageElement>(null);
  const [missing, setMissing] = useState(false);
  useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth === 0) setMissing(true);
  }, []);
  if (missing) return <span className={`brand-wordmark ${className}`.trim()}>Business</span>;
  return <img ref={ref} src={LOGO_SRC} alt={alt} className={className} onError={() => setMissing(true)} />;
}
