import { expect, it } from 'vitest';
import { whatsappUrl } from '@/lib/contact';
it('prepares requests for the supplied US number', () => {
 const url = new URL(whatsappUrl('Hola, mi negocio es Café Sol'));
 expect(url.pathname).toBe('/18555170390');
 expect(url.searchParams.get('text')).toBe('Hola, mi negocio es Café Sol');
});
