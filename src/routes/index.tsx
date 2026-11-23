import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useEffect, useState, type FormEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check, ShieldCheck, FileCheck2, TrendingUp, Menu, X, Plus, Phone, Gift, Star, Instagram, Facebook, Youtube, Music2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TrustMarquee, AboutBento, RegisterSection, FilingsSection, PartnersSection, TestimonialsSection } from '@/components/business-sections';
import { useLanguage } from '@/lib/language';
import { useRevealOnScroll } from '@/lib/reveal';
import { officePhone, officePhoneHref, contactEmail } from '@/lib/contact';
import { BrandLogo } from '@/components/brand-logo';
import owner from '@/assets/business-owner.jpg';
import ctaPhoto from '@/assets/cta-entrepreneur.jpg';
import avatarRoberto from '@/assets/avatar-roberto.jpg';
import avatarPatricia from '@/assets/avatar-patricia.jpg';
import avatarHector from '@/assets/avatar-hector.jpg';

export const Route = createFileRoute('/')({
 head: () => ({ meta: [
  { title: 'Business | Tu negocio, sin complicaciones' },
  { name: 'description', content: 'Registra tu LLC, INC o Non-profit en Estados Unidos con Business. Trámites ante el Estado y el IRS, en el idioma que elijas.' },
  { property: 'og:title', content: 'Business | Emprende en Estados Unidos, en tu idioma' },
  { property: 'og:description', content: 'Enfócate en tu negocio. Business se ocupa del registro, los trámites estatales y el IRS.' },
  { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
 ] }),
 component: BusinessPage,
});
function BusinessPage() { return <Landing />; }
function LanguageSwitch() {
 const { language, setLanguage, t } = useLanguage();
 return <div className="language-switch" role="group" aria-label={t('Idioma', 'Language')}>
 {(['ES', 'EN'] as const).map(lang => <Button key={lang} variant="language" data-active={language === lang} aria-pressed={language === lang} onClick={() => setLanguage(lang)}>{lang}</Button>)}
 </div>;
}
function Landing() {
 const { t } = useLanguage();
 const reduced = useReducedMotion();
 const [ready, setReady] = useState(false);
 useEffect(() => { setReady(true); }, []);
 const [menu, setMenu] = useState(false);
 const [business, setBusiness] = useState('');
 useRevealOnScroll();

 const navigate = useNavigate();
 const start = (selected?: string) => { navigate({ to: '/onboarding', search: { plan: typeof selected === 'string' ? selected : 'Register', business: business || undefined } }); };
 const nav = [ ['register', t('Registro', 'Registration')], ['services', t('Trámites', 'Filings')], ['testimonials', t('Testimonios', 'Testimonials')], ['faq', t('Preguntas frecuentes', 'FAQ')] ];
 return <>
 <div className="announcement"><Gift size={13} className="inline mr-2" /><strong>{t('OFERTA ESPECIAL:', 'SPECIAL OFFER:')}</strong> {t('Registra tu negocio hoy y recibe ', 'Register your business today and get ')}<strong>{t('1 año de asesoría 100% gratuita', '1 year of 100% free guidance')}</strong><span className="announcement-end"> {t('para crecer y tener éxito.', 'to grow and succeed.')}</span><ArrowRight size={12} className="inline ml-2" /></div>
 <header className="site-header"><div className="container-business nav-inner">
 <Link to="/" aria-label={t('Business, inicio', 'Business, home')}><BrandLogo className="h-10 w-auto object-contain" /></Link>
 <nav className={`nav-links ${menu ? 'mobile-open' : ''}`} aria-label={t('Navegación principal', 'Main navigation')}>{nav.map(([id, label]) => <a href={`#${id}`} key={id} onClick={() => setMenu(false)}>{label}</a>)}</nav>
 <div className="nav-actions"><LanguageSwitch /><Button variant="brand" className="nav-cta" onClick={() => start()}>{t('Empezar Ahora', 'Get Started')}<ArrowRight /></Button><Button variant="ghost" size="icon" className="mobile-toggle" aria-label={t(menu ? 'Cerrar menú' : 'Abrir menú', menu ? 'Close menu' : 'Open menu')} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</Button></div>
 </div></header>
 <main data-ready={ready}>
 <section className="hero container-business">
 <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
 <span className="section-label">{t('PARA DUEÑOS DE NEGOCIOS LATINOS EN EE. UU.', 'FOR LATINO BUSINESS OWNERS IN THE U.S.')}</span>
 <h1>{t('Enfócate en tu negocio, nosotros nos ocupamos de ', 'Focus on your business. We take care of ')}<span className="highlight">{t('todo el papeleo.', 'all the paperwork.')}</span></h1>
 <p className="hero-description">{t('Registro de LLC, INC y Non-Profit y trámites corporativos ante el Estado y el IRS. Todo en el idioma que elijas.', 'LLC, INC, and Non-Profit registration and corporate filings with the state and the IRS. All in the language you choose.')}</p>
 <form className="quick-form" onSubmit={event => { event.preventDefault(); start(); }}><input aria-label={t('Nombre de tu negocio', 'Your business name')} placeholder={t('¿Cómo se llamará tu negocio?', 'What will you name your business?')} value={business} onChange={event => setBusiness(event.target.value)} /><Button variant="sunshine" type="submit">{t('Registrar mi Negocio', 'Register my Business')}<ArrowRight /></Button></form>
 <div className="hero-reassurance"><div className="avatar-stack">
   <span className="avatar-chip" data-label="Roberto Salazar · Salazar Remodeling LLC"><img src={avatarRoberto} alt="Roberto Salazar, Salazar Remodeling LLC" width={32} height={32} loading="lazy" /></span>
   <span className="avatar-chip" data-label="Patricia Gómez · Shine Clean Pro LLC"><img src={avatarPatricia} alt="Patricia Gómez, Shine Clean Pro LLC" width={32} height={32} loading="lazy" /></span>
   <span className="avatar-chip" data-label="Héctor Ramírez · Ramirez Auto Tech LLC"><img src={avatarHector} alt="Héctor Ramírez, Ramirez Auto Tech LLC" width={32} height={32} loading="lazy" /></span>
   <span className="avatar-chip avatar-more" aria-hidden="true">+</span>
 </div><p><strong>{t('Grandes sueños. Negocios reales.', 'Big dreams. Real businesses.')}</strong>{t('Un aliado que entiende tu camino.', 'A partner who understands your journey.')}</p></div>
 </motion.div>
 <motion.div className="hero-visual" initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .15 }}>
 <img className="owner-photo" src={owner} alt={t('Representación de un dueño de negocio latino con una tablet en su restaurante', 'Illustration of a Latino business owner holding a tablet in his restaurant')} width={1024} height={1280} fetchPriority="high" />
 <div className="photo-caption">{t('Tu próximo capítulo empieza aquí.', 'Your next chapter starts here.')}</div>
 <motion.div className="floating-card approved-card" whileHover={{ y: -4 }} animate={reduced ? {} : { y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 5 }}><div className="icon-tile"><FileCheck2 size={23} /></div><div><strong>{t('¡Tu LLC está aprobada!', 'Your LLC is approved!')}</strong><p>{t('Un gran paso para tu negocio', 'A big step for your business')}</p><span className="small-status"><Check size={11} />{t('Registro completado', 'Registration complete')}</span></div></motion.div>
 <motion.div className="floating-card filings-card" whileHover={{ y: -4 }} animate={reduced ? {} : { y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 6 }}><div className="icon-tile"><ShieldCheck size={21} /></div><div><strong>{t('Trámites al día', 'Filings up to date')}</strong><p>{t('Estado e IRS bajo control', 'State and IRS in order')}</p></div></motion.div>
 <div className="floating-card growth-card"><div className="growth-top"><strong>{t('Tu negocio crece', 'Your business grows')}</strong><TrendingUp size={18} className="text-primary" /></div><p>{t('Más oportunidades, más clientes', 'More opportunities, more customers')}</p><div className="growth-bars" aria-hidden="true">{Array.from({length:6}, (_, i) => <i key={i} />)}</div></div>
 </motion.div>
 </section>
 <TrustMarquee />
 <AboutBento />
 <RegisterSection />
 <FilingsSection />
 <PartnersSection />
 <TestimonialsSection />
 <section className="section faq-section" id="faq"><div className="container-business faq-layout"><div className="faq-intro" data-reveal><div className="section-label">{t('PREGUNTAS FRECUENTES','FREQUENTLY ASKED QUESTIONS')}</div><h2>{t('Preguntas frecuentes, resolvemos tus dudas con respuestas claras y sencillas.', 'Frequently asked questions, we resolve your doubts with clear and simple answers.')}</h2><p>{t('¿Tienes otra pregunta? Hablemos. Estamos aquí para ayudarte.','Have another question? Let’s talk. We’re here to help.')}</p><Button variant="link" className="px-0 mt-4" asChild><a href={officePhoneHref}><Phone />{officePhone}</a></Button></div><div className="faq-list" data-reveal>{[
 [t('¿Cómo funciona la solicitud en línea?','How does the online request work?'),t('Eliges si registras un negocio o gestionas uno existente, seleccionas el Estado y los trámites, completas tus datos y avanzas al pago. Antes de confirmar ves el resumen con el estimado de servicios.','You choose whether you are registering a business or managing an existing one, select the state and filings, complete your details, and move on to payment. Before confirming you see the summary with the services estimate.')],
 [t('¿Puedo contratar solo un trámite sin registrar un negocio nuevo?','Can I request a single filing without registering a new company?'),t('Sí. En la solicitud elige “Ya tengo mi negocio registrado” y marca solo los trámites que necesitas, como el EIN o una renovación de Seller\'s Permit.','Yes. In the request choose “I already have a registered business” and select only the filings you need, such as the EIN or a Seller\'s Permit renewal.')],
 [t('¿Cuánto tardan los trámites según el Estado?','How long do filings take depending on the state?'),t('Cada Estado y cada trámite tienen sus propios tiempos de aprobación, y algunos Estados ofrecen procesamiento acelerado. Antes de empezar te damos un estimado según el Estado y el trámite elegido.','Each state and each filing has its own approval times, and some states offer expedited processing. Before you start we give you an estimate based on the state and the filing you choose.')],
 [t('¿Qué datos me piden en la solicitud?','What details does the request ask for?'),t('Tus datos de contacto, la dirección del negocio y la de correspondencia si es distinta, el nombre del titular o miembro principal y el giro del negocio. Todo se completa en el mismo flujo, antes del pago.','Your contact details, the business address and a mailing address if different, the owner or main member name, and the business activity. Everything is completed in the same flow, before payment.')],
 ].map(([q,a]) => <details key={q}><summary>{q}<Plus /></summary><p>{a}</p></details>)}</div></div></section>
  <section className="final-cta-wrap container-business"><div className="cta-banner" data-reveal><div className="cta-copy"><div className="section-label">{t('EL SIGUIENTE PASO ES TUYO','YOUR NEXT STEP STARTS HERE')}</div><h2>{t('Alguien allá afuera necesita tu negocio.','Someone out there needs your business.')}</h2><p>{t('Empieza con el pie derecho. Nuestro equipo te acompaña en cada paso y te explica todo en tu idioma.','Start off on the right foot. Our team accompanies you every step of the way and explains everything in your language.')}</p><Button variant="dark" size="lg" className="h-12 rounded-full" asChild><Link to="/onboarding">{t('Registrar mi negocio','Register my business')}<ArrowRight /></Link></Button><small>{t('Trámites 100% en línea · Sin necesidad de residencia ni SSN en EE. UU.','100% online filings · No U.S. residency or SSN required')}</small></div><img src={ctaPhoto} alt={t('Dueña de negocio latina sonriente trabajando en su laptop','Smiling Latina business owner working on her laptop')} width={1024} height={1024} loading="lazy" /></div></section>
 </main>
  <footer className="site-footer"><div className="container-business"><div className="footer-grid">
  <div className="footer-brand"><Link to="/" aria-label="Business" className="footer-logo-pill"><BrandLogo className="h-8 w-auto object-contain" /></Link><p>{t('Tu negocio merece toda tu atención. Nosotros nos encargamos del registro y los trámites ante el Estado y el IRS, en tu idioma.','Your business deserves your full attention. We handle registration and filings with the state and the IRS, in your language.')}</p>
  <div className="rating"><strong>Excellent</strong><span className="green-stars" aria-label="4.5/5">{Array.from({length:5},(_,i)=><Star key={i} size={14} />)}</span><span>4.5/5 · 2,000+ Reviews</span></div>
  <div className="socials">{[[Instagram,'Instagram','https://www.instagram.com/business_ca_us'],[Facebook,'Facebook','https://www.facebook.com/business.usa.ca/'],[Music2,'TikTok','https://www.tiktok.com/@business__9'],[Youtube,'YouTube','https://www.youtube.com/@Business1']].map(([Icon,label,url]) => { const I = Icon as typeof Star; return <a key={label as string} href={url as string} target="_blank" rel="noopener noreferrer" aria-label={label as string}><I size={18} /></a>; })}</div><LanguageSwitch /></div>
  {[[t('Servicios','Services'),[[t('Registro corporativo','Corporate registration'),'#register'],[t('Trámites a la carta','Filings à la carte'),'#services']]],
    [t('Compañía','Company'),[[t('Sobre Business','About Business'),'#about'],[t('Marcas Aliadas','Partner Brands'),'#partners'],[t('Testimonios','Testimonials'),'#testimonials']]],
    [t('Contacto','Contact'),[[officePhone,officePhoneHref],[contactEmail,`mailto:${contactEmail}`]]]].map(([title,links]) => <div className="footer-col" key={title as string}><h4>{title as string}</h4><ul>{(links as string[][]).map(([l,h]) => <li key={l}><a href={h}>{l}</a></li>)}</ul></div>)}
  </div><div className="footer-bottom"><span>{t('Business - Todos los derechos reservados','Business - All rights reserved')}</span><span>© {new Date().getFullYear()} Business · {t('Términos de servicio','Terms of service')} · {t('Política de privacidad','Privacy policy')}</span></div></div></footer>
 </>;
}
