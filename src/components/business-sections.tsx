import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { ArrowDown, ArrowLeft, ArrowRight, Building2, CalendarCheck, Check, Facebook, FileText, Globe2, HeartHandshake, LockKeyhole, Quote, ShieldCheck, SlidersHorizontal, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/lib/language';
import { whatsappUrl } from '@/lib/contact';
import { BrandLogo } from '@/components/brand-logo';
import elizabeth from '@/assets/avatar-elizabeth.jpg';
import chilango from '@/assets/avatar-chilango.jpg';
import rene from '@/assets/avatar-rene.jpg';
import jose from '@/assets/avatar-jose.jpg';
import daniel from '@/assets/avatar-daniel.jpg';
import aurelio from '@/assets/avatar-aurelio.jpg';

export function TrustMarquee() {
  const { t } = useLanguage();
  const items = [
    { icon: ShieldCheck, label: t('Trámites con confianza', 'File with confidence') },
    { icon: Globe2, label: t('100% en tu idioma', '100% in your language') },
    { icon: HeartHandshake, label: t('Acompañamiento real', 'Real human support') },
    { icon: LockKeyhole, label: t('Tu información protegida', 'Your information protected') },
  ];
  return <div className="trust-strip"><div className="container-business trust-inner">
    <p>{t('Tu tranquilidad es nuestro mejor resultado.', 'Your peace of mind is our best result.')}</p>
    <div className="marquee"><div className="marquee-track">{[0, 1].map(copy => <div className="marquee-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>{items.map(({ icon: Icon, label }) => <span className="trust-item" key={label}><Icon /><span>{label}</span></span>)}</div>)}</div></div>
  </div></div>;
}

function MetricValue({ value, suffix, className = '' }: { value: number; suffix: string; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [count, setCount] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced || typeof IntersectionObserver === 'undefined' || document.visibilityState !== 'visible') { setCount(value); return; }
    const io = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / 1400);
        setCount(Math.round(value * (1 - (1 - p) ** 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [value, reduced]);
  return <strong ref={ref} className={`metric-value ${className}`.trim()}>{count.toLocaleString('en-US')}{suffix}</strong>;
}

export function AboutBento() {
  const { t } = useLanguage();
  return <section className="section about-section" id="about"><div className="container-business">
    <div className="about-head" data-reveal>
      <span className="section-label">{t('SOBRE BUSINESS', 'ABOUT BUSINESS')}</span>
      <div className="about-head-grid">
        <h2>{t('Un solo aliado para crear y gestionar tu negocio en EE. UU.', 'One partner to launch and manage your company in the U.S.')}</h2>
        <p className="about-intro">{t('Business es la plataforma de gestión corporativa que creamos para ayudar a los dueños de negocios latinos a crear, formalizar y mantener sus negocios en Estados Unidos. Te acompañamos desde el registro de tu negocio (LLC, INC o Non-Profit) hasta los trámites que necesitas realizar ante el Estado y el IRS. Con servicios adaptados a tus necesidades y con atención en el idioma que prefieras.', 'Business is the corporate management platform we created to help Latino business owners start, formalize, and maintain their businesses in the United States. We support you from registering your business (LLC, INC, or Non-Profit) through the filings you need before the state and the IRS. With services tailored to your needs and support in the language you prefer.')}</p>
      </div>
    </div>
    <div className="about-layout">
      <div className="about-metrics-col" data-reveal>
        <div className="about-metrics" data-reveal-stagger>
          <div className="about-metric"><MetricValue value={15} suffix="+" /><p className="about-metric-label">{t('Años de experiencia respaldando dueños de negocios latinos', 'Years of experience supporting Latino business owners')}</p></div>
          <div className="about-metric"><MetricValue value={10000} suffix="+" /><p className="about-metric-label">{t('Compañías registradas (LLC, INC y Non-Profit) en EE. UU.', 'Companies registered (LLC, INC, and Non-Profit) in the U.S.')}</p></div>
          <div className="about-metric"><MetricValue value={8000} suffix="+" /><p className="about-metric-label">{t('Clientes que gestionan sus renovaciones y trámites corporativos con nosotros.', 'Clients who manage their renewals and corporate filings with us.')}</p></div>
        </div>
        <p className="about-foot">{t('Acompañamiento corporativo transparente en cada etapa de tu negocio.', 'Transparent corporate support at every stage of your business.')}</p>
      </div>
      <div className="about-photo-wrap" data-reveal="image">
        <img className="about-photo-img" src="/images/tab-register.jpg" alt={t('Dueño de negocio en su cafetería sosteniendo una tablet', 'Business owner in his coffee shop holding a tablet')} loading="lazy" />
      </div>
    </div>
  </div></section>;
}

export function RegisterSection() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const entities = [
    { plan: 'LLC', tab: 'LLC',
      title: t('LLC: Ideal para pequeños y medianos negocios que buscan formalizar.', 'LLC: Ideal for small and mid-sized businesses looking to formalize.'),
      text: t('Una opción para establecer tu negocio, organizar sus operaciones y separar las finanzas de tu compañía de las personales.', 'An option to establish your business, organize its operations, and separate your company’s finances from your personal ones.'),
      check: t('Ideal para servicios de limpieza, construcción, remodelación, salones de belleza, barberías, talleres de autos, negocios de comida y más.', 'Ideal for cleaning services, construction, remodeling, beauty salons, barbershops, auto repair shops, food businesses, and more.'),
      cta: t('Registrar LLC', 'Register LLC'),
      facts: [[t('Dueños', 'Owners'), t('Dueños (1 o más)', 'Owners (1 or more)')], [t('Junta directiva', 'Board of directors'), t('Requerida (de uno o varios miembros)', 'Required (one or more members)')], [t('Emite acciones', 'Issues shares'), t('No', 'No')]] },
    { plan: 'INC', tab: 'INC',
      title: t('INC: Estructura formal para escalar y buscar inversión', 'INC: A formal structure to scale and raise capital'),
      text: t('Una opción para negocios que planean crecer con el apoyo de inversionistas y la participación de varios socios.', 'An option for businesses that plan to grow with investor support and multiple partners.'),
      check: t('Ideal para constructoras grandes, cadenas de restaurantes, empresas de logística y negocios con varios socios o inversionistas.', 'Ideal for large construction firms, restaurant chains, logistics companies, and multi-partner businesses with investors.'),
      cta: t('Registrar INC', 'Register INC'),
      facts: [[t('Tipo de socios', 'Owner type'), t('Accionistas', 'Shareholders')], [t('Junta directiva', 'Board of directors'), t('Obligatoria (Directors and Officers)', 'Required (Directors and Officers)')], [t('Emite acciones', 'Issues shares'), t('Sí', 'Yes')]] },
    { plan: 'Non-Profit', tab: 'Non-Profit',
      title: t('Non-Profit: Fundaciones y organizaciones sin fines de lucro.', 'Non-Profit: Foundations and organizations with a social purpose.'),
      text: t('Constitución formal para proyectos benéficos, educativos, religiosos o comunitarios orientados al impacto social sin reparto comercial de utilidades.', 'Formal formation for charitable, educational, religious, or community projects focused on social impact without commercial distribution of profits.'),
      check: t('Ideal para iglesias, fundaciones, centros comunitarios, programas educativos y proyectos de impacto social.', 'Ideal for churches, foundations, community centers, educational programs, and social impact projects.'),
      cta: t('Registrar Non-Profit', 'Register Non-Profit'),
      facts: [[t('Dueños', 'Owners'), t('Accionistas', 'Shareholders')], [t('Junta directiva', 'Board of directors'), t('Requerida (Directors and Officers)', 'Required (Directors and Officers)')], [t('Emite acciones', 'Issues shares'), t('No', 'No')]] },
  ];
  const cur = entities[active] ?? entities[0]!;
  return <section className="section register-section" id="register"><div className="container-business">
    <div className="register-head" data-reveal>
      <div><span className="section-label">{t('REGISTRO CORPORATIVO', 'CORPORATE REGISTRATION')}</span><h2>{t('Registra tu compañía en EE. UU.', 'Register your company in the U.S.')}</h2></div>
      <p className="pricing-sub">{t('Elige la estructura corporativa que mejor se adapta a tu modelo de negocio en cualquiera de los 50 Estados.', 'Choose the corporate structure that best fits your business model in any of the 50 states.')}</p>
    </div>
    <div className="register-shell" data-reveal>
      <div className="register-tabs" role="tablist">{[0, 1, 2].map(i => <button key={i} type="button" role="tab" aria-selected={active === i} data-active={active === i} onClick={() => setActive(i)}><span className="register-num">0{i + 1}</span><strong>{entities[i]?.tab}</strong></button>)}</div>
      <article className="register-panel" key={cur.plan}>
        <div className="register-copy">
          <h3>{cur.title}</h3>
          <p>{cur.text}</p>
          <div className="entity-price"><strong>{money(REGISTRATION_FEE)}</strong><span>{t('Pago único', 'One-time payment')}</span></div>
          <ul className="value-list">{<li><Check size={16} />{cur.check}</li>}</ul>
          <Button variant="dark" className="h-12" asChild><Link to="/onboarding" search={{ plan: cur.plan }}>{cur.cta}<ArrowRight /></Link></Button>
        </div>
        <aside className="mini-card">
          <span className="mini-tag">{cur.tab}</span>
          {cur.facts.map(([label, value]) => <div className="mini-row" key={label}><span>{label}</span><strong>{value}</strong></div>)}
        </aside>
      </article>
    </div>
    <div className="bridge-cta">
      <p>{t('¿Ya tienes tu negocio registrado o necesitas trámites puntuales?', 'Already registered or need one-off filings?')}</p>
      <a className="bridge-link" href="#services">{t('Mira todo lo que puedes gestionar más abajo', 'See everything you can manage below')}<ArrowDown /></a>
    </div>
  </div></section>;
}

export function FilingsSection() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const metas = [
    { title: t('Formación y Documentos', 'Company Formation'), icon: FileText,
      definition: t('Documentos esenciales para formalizar, respaldar y poner en marcha tu negocio desde el primer día.', 'Essential documents to formalize, support, and launch your business from day one.') },
    { title: t('Renovaciones Anuales', 'Renewals'), icon: CalendarCheck,
      definition: t('Mantén tu compañía activa, vigente y en cumplimiento obligatorio ante el Estado para evitar multas.', 'Keep your company active, current, and in mandatory compliance with the state to avoid penalties.') },
    { title: t('Gestión y Cambios', 'Business Management'), icon: SlidersHorizontal,
      definition: t('Modificaciones corporativas, reportes federales obligatorios y cambios operativos en cualquier etapa.', 'Corporate changes, mandatory federal reports, and operational updates at any stage.') },
  ];
  const groups = filingCatalog.map((group, index) => ({ ...metas[index]!, plan: group.title, items: group.items }));
  const cur = groups[active] ?? groups[0]!;
  const label = (item: string) => t(filingEs[item] ?? item, item);
  return <section className="section filings-section" id="services"><div className="container-business">
    <div className="text-center max-w-2xl mx-auto"><span className="section-label justify-center">{t('TRÁMITES A LA CARTA', 'FILINGS À LA CARTE')}</span><h2>{t('Elige solo lo que tu negocio necesita', 'Choose only what your business needs')}</h2><p className="pricing-sub">{t('¡Somos el 911 de nuestros clientes! Solicita únicamente el documento, renovación o actualización que necesitas hoy.', 'We are our clients’ 911! Request only the document, renewal, or update you need today.')}</p></div>
    <div className="filings-layout" data-reveal>
      <div className="filings-nav" role="tablist" aria-label={t('Categorías de trámites', 'Filing categories')}>
        {groups.map((group, index) => <button key={group.plan} type="button" role="tab" aria-selected={active === index} data-active={active === index} onClick={() => setActive(index)}>
          <group.icon size={18} aria-hidden="true" />
          <strong>{group.title}</strong>
        </button>)}
      </div>
      <div className="filings-panel">
        <div className="filings-panel-head">
          <span className="filings-panel-icon" aria-hidden="true"><cur.icon size={20} /></span>
          <h3>{cur.title}</h3>
          <span className="filing-badge">{cur.items.length} {t('trámites', 'filings')}</span>
        </div>
        <p className="filing-def">{cur.definition}</p>
        <div className="filing-pills">{cur.items.map(item => <Link key={item} className="filing-pill" to="/onboarding" search={{ plan: cur.plan, item }}><span>{label(item)}</span><span className="filing-pill-price">{money(filingPrices[item] ?? 0)}</span></Link>)}</div>
      </div>
    </div>
  </div></section>;
}

function PartnerLogo({ src, name, abbr }: { src: string; name: string; abbr: string }) {
  const ref = useRef<HTMLImageElement>(null);
  const [missing, setMissing] = useState(false);
  useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth === 0) setMissing(true);
  }, []);
  if (missing) return <span className="partner-abbr" aria-hidden="true">{abbr}</span>;
  return <img ref={ref} src={src} alt={name} className="partner-logo max-h-12 w-auto object-contain" onError={() => setMissing(true)} />;
}

export function PartnersSection() {
  const { t } = useLanguage();
  const [open, setOpen] = useState<string | null>(null);
  const brands = [
    { name: 'Credit Experts', abbr: 'CE', logo: '/images/Logo-Credit-Experts.png', desc: t('Reparación y construcción de crédito personal.', 'Personal credit repair and building.') },
    { name: 'Boost Credit', abbr: 'BC', logo: '/images/Logo-Boost-Credit.png', desc: t('Asesoría para el impulso de tu score.', 'Guidance to boost your credit score.') },
    { name: 'Tax Research', abbr: 'TR', logo: '/images/Logo-Tax-Research.png', desc: t('Especialistas enfocados en declarar tus impuestos correctamente.', 'Specialists focused on filing your taxes correctly.') },
    { name: 'Debt Solution', abbr: 'DS', logo: '/images/Logo-Debt-Solution.png', desc: t('Soluciones para manejar deudas, reducir pagos y ahorrar.', 'Solutions to manage debts, reduce payments, and save.') },
    { name: 'Keybook', abbr: 'KB', logo: '/images/Logo-Keybook.png', desc: t('Contabilidad y libros contables al día.', 'Bookkeeping and accounting kept current.') },
    { name: 'Creative', abbr: '', icon: Sparkles, desc: t('Branding, diseño web y marketing digital para vender más.', 'Branding, web design, and digital marketing to sell more.') },
  ];
  return <section className="section partners-section" id="partners"><div className="container-business partners-layout">
    <div className="partners-copy" data-reveal>
      <span className="section-label">{t('RED DE SOCIOS ESTRATÉGICOS', 'STRATEGIC PARTNER NETWORK')}</span>
      <h2>{t('Nuestras Marcas Aliadas.', 'Our Partner Brands.')}</h2>
      <p className="pricing-sub">{t('Business forma parte de una red de soluciones integrales del grupo AMG, diseñada para acompañar cada etapa de tu vida financiera y empresarial.', 'Business is part of the AMG group’s network of comprehensive solutions, designed to support every stage of your financial and business life.')}</p>
    </div>
    <div className="partners-grid" data-reveal-stagger>{brands.map(brand => {
      const message = t(`Hola, quiero saber más sobre ${brand.name} del ecosistema AMG.`, `Hi, I want to know more about ${brand.name} from the AMG ecosystem.`);
      return <a key={brand.name} className={open === brand.name ? 'brand-cell is-open' : 'brand-cell'} href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" onPointerEnter={() => setOpen(brand.name)} onClick={e => { if (open !== brand.name) { e.preventDefault(); setOpen(brand.name); } }}>
        <span className="brand-rest">
          <span className="brand-pill">{brand.logo ? <PartnerLogo src={brand.logo} name={brand.name} abbr={brand.abbr} /> : <span className="brand-icon" aria-hidden="true"><Sparkles size={26} /></span>}</span>
        </span>
        <span className="brand-reveal">
          <strong className="brand-reveal-name">{brand.name}</strong>
          <span className="brand-desc">{brand.desc}</span>
          <span className="brand-cta">{t('Explorar', 'Explore')} {brand.name}<ArrowRight /></span>
        </span>
      </a>;
    })}</div>
  </div></section>;
}

export function TestimonialsSection() {
  const { t } = useLanguage();
  const reviews = [
    { name: 'Elizabeth Romero', initials: 'ER', photo: elizabeth, subtitle: t('Mayo 2025', 'May 2025'), url: 'https://www.facebook.com/elizabeth.romero.904/posts/pfbid02RDYzgnYTUWQLEiyCKwJsS6bnjmanFaVPxRCXd18JCTjKAxoD34k2ViGc4ZWCCDmnl',
      text: 'Completamente satisfecha con la ayuda recibida del personal de AMG. Muy profesionales y siempre disponibles para cualquier duda o pregunta, especialmente con la señorita Luciana.' },
    { name: 'Chilango Garcia', initials: 'CG', photo: chilango, subtitle: t('Abril 2025', 'April 2025'), url: 'https://www.facebook.com/permalink.php?story_fbid=pfbid02XRHq5cHBN4EdNQt87gh9kpK8oK1EYoVNVD1zk4jtVTsncPT5MV1taPBGJiaJNh5Dl&id=61575071181807',
      text: 'Quiero agradecer a la señorita Luciana por su profesionalismo y su ayuda, muy buena manera de aclarar las dudas y sobre todo su paciencia para explicar paso a paso. De antemano muchas gracias.' },
    { name: 'René Ordóñez', initials: 'RO', photo: rene, subtitle: t('Febrero 2025', 'February 2025'), url: 'https://www.facebook.com/rene.ord/posts/pfbid0NTLoahFEzWFh3kp6scYYEWQAz5BKFA5A1T8rWJjaLuDX1Gei3XHMwtZMLiH2gfk2l',
      text: 'Muy satisfecho con el trabajo de Business y especialmente con la Srita. Luciana Gayoso, quien me ha ayudado en todo momento con la apertura de mi propio negocio y resolviendo a la brevedad toda consulta que he tenido. Súper recomiendo los servicios que prestan.' },
    { name: 'José Rangel', initials: 'JR', photo: jose, subtitle: t('Noviembre 2024', 'November 2024'), url: 'https://www.facebook.com/JR29paraservirles/posts/pfbid0PELWjRqVKWsmKP8gehcnb5xAmeb2D4dvaPWoMQ5yGTwzERLacngkQ1TEnD1JY7Dkl',
      text: 'Deseo manifestar mi más profundo agradecimiento por el extraordinario servicio que Business Inc. ha proporcionado desde el comienzo de nuestra cooperación, he sido tratado con amabilidad y profesionalidad, evidenciando un compromiso inalterable con la excelencia y la satisfacción del cliente.' },
    { name: 'Daniel Tenorio', initials: 'DT', photo: daniel, subtitle: t('Noviembre 2024', 'November 2024'), url: 'https://www.facebook.com/daniel.tenorio.566/posts/pfbid0eJLyt9LjDfDnt3rhx9a42t5VHta2BqqRGpH5otKHF3X327q4FYkNWUt638MwKFQhl',
      text: 'Yo abrí una compañía de limpieza, muy satisfecho con los servicios, he tenido mucho apoyo. La Srta. Luciana me ha brindado apoyo e información, el tiempo de respuesta muy rápido, gracias.' },
    { name: 'Aurelio Salazar Beltran', initials: 'AS', photo: aurelio, subtitle: t('Septiembre 2024', 'September 2024'), url: 'https://www.facebook.com/aurelio.salazarbeltran/posts/pfbid02mGrmkqctJyxvLixLaxqg8gNpDj1mQVpLwnF5UN6W4a9tF4GmUJw2r3EhENeUdb9Nl',
      text: 'Mi experiencia durante años que estado realizando mis declaraciones de impuestos con el señor César Moreno ha sido realmente satisfactoria en todos los sentidos puesto que el señor es muy profesional, paciente para dar explicaciones de cualquier duda que surge durante elaboración de mis declaraciones de impuestos…' },
  ];
  return <section className="section testimonials-section" id="testimonials"><div className="container-business">
    <div className="section-intro" data-reveal><div><span className="section-label">{t('TESTIMONIOS', 'TESTIMONIALS')}</span><h2>{t('Latinos que confiaron su compañía a Business', 'Latinos who trusted their company to Business')}</h2><p className="pricing-sub">{t('Historias reales de negocios que crecen en EE. UU.', 'Real stories of businesses growing in the U.S.')}</p></div></div>
    <div className="review-grid" data-reveal-stagger>{reviews.map(r => <a key={r.name} className="review-card" href={r.url} target="_blank" rel="noopener noreferrer">
      <div className="review-head"><Quote className="quote-mark" /><span className="review-source"><Facebook size={15} />Facebook</span></div>
      <p>{r.text}</p>
      <div className="review-author"><span className="initials-avatar" aria-hidden="true">{r.photo && <img src={r.photo} alt="" width={48} height={48} loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none'; }} />}{r.initials}</span><div><strong>{r.name}</strong><small>{r.subtitle}</small></div></div>
      <span className="review-link">{t('Ver reseña en Facebook', 'View review on Facebook')}<span aria-hidden="true">↗</span></span>
    </a>)}</div>
    <div className="review-more"><a href="https://www.facebook.com/business.usa.ca/reviews" target="_blank" rel="noopener noreferrer">{t('Ver todas las opiniones en Facebook', 'See all reviews on Facebook')}<span aria-hidden="true">↗</span></a></div>
  </div></section>;
}

export const usStates = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','Washington D.C.','West Virginia','Wisconsin','Wyoming'];

const filingCatalog = [
  { title: 'Company Formation', items: ['Articles of Organization', 'Articles of Incorporation', 'Initial Report', 'EIN Number', 'New Entity', 'Corporate Book', 'Operating Agreement'] },
  { title: 'Renewals', items: ['Agent for Service of Process', 'Statement of Information', "Seller's Permit Renewal", 'Business License Tax Renewal'] },
  { title: 'Business Management', items: ['Amendment (IRS)', 'Amendment (SOS)', 'Fictitious Business Name', 'FBN Abandonment', 'Dissolution Only', 'FINCEN BOI Report', 'Conversion Corp - LLC', 'Conversion LLC - Corp', 'EIN Letter Cancellation', 'Business License Tax', "Seller's Permit"] },
];

const filingPrices: Record<string, number> = {
  'Articles of Organization': 149,
  'Articles of Incorporation': 149,
  'Initial Report': 129,
  'EIN Number': 99,
  'New Entity': 799,
  'Corporate Book': 99,
  'Operating Agreement': 99,
  'Agent for Service of Process': 99,
  "Seller's Permit Renewal": 49,
  'Business License Tax Renewal': 49,
  'Statement of Information': 149,
  'EIN Letter Cancellation': 99,
  'Business License Tax': 129,
  'Amendment (IRS)': 129,
  'Amendment (SOS)': 199,
  'Fictitious Business Name': 249,
  'FBN Abandonment': 199,
  'Dissolution Only': 299,
  'FINCEN BOI Report': 49,
  'Conversion Corp - LLC': 499,
  'Conversion LLC - Corp': 499,
  "Seller's Permit": 149,
};
const REGISTRATION_FEE = 349;
const money = (value: number) => `$${value.toFixed(2)}`;

const filingEs: Record<string, string> = {
  'Articles of Organization': 'Artículo de Organización',
  'Articles of Incorporation': 'Artículos de Incorporación',
  'Initial Report': 'Reporte Inicial',
  'EIN Number': 'EIN',
  'New Entity': 'Nueva Entidad',
  'Corporate Book': 'Libro Corporativo',
  'Operating Agreement': 'Acuerdo Operativo',
  'Agent for Service of Process': 'Registered Agent',
  'Statement of Information': 'Statement of Information',
  "Seller's Permit Renewal": "Renovación de Seller's Permit",
  'Business License Tax Renewal': 'Renovación de Business License Tax',
  'Amendment (IRS)': 'Enmienda IRS',
  'Amendment (SOS)': 'Enmienda SOS',
  'Fictitious Business Name': 'Fictitious Business Name',
  'FBN Abandonment': 'Abandono de FBN',
  'Dissolution Only': 'Disolución',
  'FINCEN BOI Report': 'Reporte BOI de FINCEN',
  'Conversion Corp - LLC': 'Conversión de Corp a LLC',
  'Conversion LLC - Corp': 'Conversión de LLC a Corp',
  'EIN Letter Cancellation': 'Cancelación de Carta EIN',
  'Business License Tax': 'Business License Tax',
  "Seller's Permit": "Seller's Permit",
};

export function OnboardingForm({ plan, initialBusiness, initialItem }: { plan: string; initialBusiness: string; initialItem?: string | undefined }) {
  const { t, language, setLanguage } = useLanguage();
  const startsWithEntity = ['LLC', 'INC', 'Non-Profit'].includes(plan);
  const [mode, setMode] = useState<'register' | 'manage'>(startsWithEntity || plan === 'Register' ? 'register' : 'manage');
  const [showFilings, setShowFilings] = useState(false);
  const [step, setStep] = useState(1);
  const [entity, setEntity] = useState(startsWithEntity ? plan : 'LLC');
  const [stateName, setStateName] = useState('');
  const [business, setBusiness] = useState(initialBusiness);
  const [picked, setPicked] = useState<string[]>(initialItem ? [initialItem] : []);
  const [contact, setContact] = useState({ name: '', email: '', phone: '' });
  const [biz, setBiz] = useState({ street: '', city: '', state: '', zip: '', owner: '', altName: '', industry: '', purpose: '' });
  const [mailing, setMailing] = useState({ street: '', city: '', state: '', zip: '' });
  const [sameMailing, setSameMailing] = useState(true);
  const [card, setCard] = useState({ name: '', number: '', exp: '', cvc: '' });
  const [payMode, setPayMode] = useState<'full' | 'partial'>('full');
  const [method, setMethod] = useState<'card' | 'other'>('card');
  const [otherMethod, setOtherMethod] = useState<'transfer' | 'cash' | 'other'>('transfer');
  const [error, setError] = useState('');
  const canAdvance = stateName !== '' && business.trim() !== '' && biz.industry.trim() !== '' && biz.purpose.trim() !== '' && (mode === 'register' || picked.length > 0);
  const servicesTotal = (mode === 'register' ? REGISTRATION_FEE : 0) + picked.reduce((sum, item) => sum + (filingPrices[item] ?? 0), 0);
  const firstPayment = Math.round(servicesTotal * 50) / 100;
  const label = (item: string) => t(filingEs[item] ?? item, item);
  const groupLabel = (group: string) => t(({ 'Company Formation': 'Formación y Documentos', 'Renewals': 'Renovaciones Anuales', 'Business Management': 'Gestión y Cambios' } as Record<string, string>)[group] ?? group, group);
  const toggle = (item: string) => setPicked(p => (p.includes(item) ? p.filter(x => x !== item) : [...p, item]));
  const entities = [
    { plan: 'LLC', title: 'LLC', text: t('Protección de activos personales y gestión flexible.', 'Personal asset protection and flexible management.') },
    { plan: 'INC', title: 'INC', text: t('Estructura corporativa formal para escalar y emitir acciones.', 'A formal corporate structure to scale and issue shares.') },
    { plan: 'Non-Profit', title: t('Sin Fines de Lucro', 'Non-Profit'), text: t('Entidad para organizaciones benéficas o comunitarias.', 'An entity for charitable or community organizations.') },
  ];
  const zipValid = (zip: string) => /^\d{5}(-\d{4})?$/.test(zip);
  const advanceToDetails = () => {
    if (!canAdvance) { setError(t('Completa el Estado, el nombre, el rubro y el propósito del negocio; si gestionas tu negocio, elige al menos un trámite.', 'Complete the state, business name, industry, and business purpose; if managing your company, select at least one filing.')); return; }
    setError(''); setStep(2); window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (step === 1) { advanceToDetails(); return; }
    if (step === 2) {
      if (contact.phone.replace(/\D/g, '').length !== 10) { setError(t('El teléfono debe tener exactamente 10 dígitos. Ejemplo: (555) 123-4567.', 'Phone must have exactly 10 digits. Example: (555) 123-4567.')); return; }
      if (!zipValid(biz.zip)) { setError(t('El código postal debe tener 5 dígitos (ej. 12345) o formato 5+4 (ej. 12345-6789).', 'ZIP code must be 5 digits (e.g. 12345) or 5+4 format (e.g. 12345-6789).')); return; }
      if (!sameMailing && !zipValid(mailing.zip)) { setError(t('El código postal de correspondencia debe tener 5 dígitos (ej. 12345) o formato 5+4 (ej. 12345-6789).', 'Mailing ZIP code must be 5 digits (e.g. 12345) or 5+4 format (e.g. 12345-6789).')); return; }
      setError(''); setStep(3); window.scrollTo({ top: 0, behavior: 'smooth' }); return;
    }
    const digits = card.number.replace(/\D/g, '');
    if (method === 'card' && (digits.length < 15 || !/^\d{2}\/\d{2}$/.test(card.exp) || card.cvc.replace(/\D/g, '').length < 3)) {
      setError(t('Revisa los datos de tu tarjeta.', 'Check your card details.')); return;
    }
    setError(''); setStep(4); window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return <form className="portal" onSubmit={submit}>
    <div className="portal-main" data-reveal>
      <div className="portal-head">
        <BrandLogo className="h-9 w-auto object-contain" />
        <div className="language-switch">{(['ES', 'EN'] as const).map(l => <Button key={l} type="button" variant="language" data-active={language === l} aria-pressed={language === l} onClick={() => setLanguage(l)}>{l}</Button>)}</div>
      </div>
      <h1 className="onboarding-title">{step === 1 ? t('Arma tu solicitud', 'Build your request') : step === 2 ? t('Finaliza tu solicitud', 'Finish your request') : step === 3 ? t('Pago seguro', 'Secure payment') : t('Solicitud confirmada', 'Request confirmed')}</h1>
      <p className="onboarding-sub">{step === 1 ? t('Elige tu entidad, tu Estado y los trámites que necesitas. Sin paquetes forzosos.', 'Choose your entity, your state, and the filings you need. No forced packages.') : step === 2 ? t('Revisa tu solicitud y completa tus datos para continuar al pago.', 'Review your request and complete your details to continue to payment.') : step === 3 ? t('Completa los datos de tu tarjeta para finalizar la solicitud.', 'Complete your card details to finish the request.') : t('Tu solicitud quedó registrada con los datos que enviaste.', 'Your request was registered with the details you submitted.')}</p>
      {step === 1 && <>
      <fieldset className="portal-block"><legend>{t('¿Qué necesitas hacer?', 'What do you need to do?')}</legend>
        <div className="segmented" role="radiogroup">
          <button type="button" role="radio" aria-checked={mode === 'register'} data-active={mode === 'register'} onClick={() => setMode('register')}>{t('Registrar negocio', 'Register a business')}</button>
          <button type="button" role="radio" aria-checked={mode === 'manage'} data-active={mode === 'manage'} onClick={() => setMode('manage')}>{t('Ya tengo mi negocio registrado', 'I already have a registered business')}</button>
        </div>
      </fieldset>
      {mode === 'register' && <fieldset className="portal-block"><legend>{t('Entidad', 'Entity')}</legend>
        <div className="radio-cards">{entities.map(e => <button key={e.plan} type="button" role="radio" aria-checked={entity === e.plan} data-active={entity === e.plan} onClick={() => setEntity(e.plan)}><Building2 size={18} /><span><strong>{e.title}</strong><small>{e.text}</small></span><span className="entity-option-price">{money(REGISTRATION_FEE)}</span></button>)}</div>
      </fieldset>}
      <fieldset className="portal-block"><legend>{t('Estado y negocio', 'State and business')}</legend>
        <label>{t('Estado de registro', 'Registration state')}<select required value={stateName} onChange={e => setStateName(e.target.value)}><option value="" disabled>{t('Selecciona tu Estado', 'Select your state')}</option>{usStates.map(s => <option key={s}>{s}</option>)}</select></label>
        <label>{t('Nombre de tu negocio', 'Business name')}<input required value={business} onChange={e => setBusiness(e.target.value)} /><small className="field-note">{t('La disponibilidad y aprobación del nombre dependen de la normativa del Estado y de si ya existe uno igual o similar. No reservamos el nombre automáticamente.', 'Name availability and approval depend on state rules and on whether a same or similar name already exists. We do not reserve the name automatically.')}</small></label>
        <label>{t('Nombre alternativo de tu negocio (opcional)', 'Alternative business name (optional)')}<input value={biz.altName} onChange={e => setBiz({ ...biz, altName: e.target.value })} /><small className="field-note">{t('Un segundo nombre aumenta la probabilidad de disponibilidad al registrar.', 'A second name increases the chance of availability at registration.')}</small></label>
        <label>{t('Tipo de negocio (rubro)', 'Business type (industry)')}<input required list="industry-options" value={biz.industry} onChange={e => setBiz({ ...biz, industry: e.target.value })} placeholder={t('Restaurante, construcción, transporte…', 'Restaurant, construction, transportation…')} /><datalist id="industry-options">{(['Restaurante','Construcción','Comercio minorista','Servicios profesionales','Transporte','Salud','Belleza','Tecnología','Bienes raíces','Educación','Otro'] as const).map(o => <option key={o} value={t(o, ({ 'Restaurante': 'Restaurant', 'Construcción': 'Construction', 'Comercio minorista': 'Retail', 'Servicios profesionales': 'Professional services', 'Transporte': 'Transportation', 'Salud': 'Healthcare', 'Belleza': 'Beauty', 'Tecnología': 'Technology', 'Bienes raíces': 'Real estate', 'Educación': 'Education', 'Otro': 'Other' } as Record<string, string>)[o] ?? o)} />)}</datalist></label>
        <label>{t('Propósito del negocio', 'Business purpose')}<textarea required rows={3} value={biz.purpose} onChange={e => setBiz({ ...biz, purpose: e.target.value })} placeholder={t('Ej. Venta de comida preparada y servicio de catering.', 'E.g. Prepared food sales and catering services.')} /></label>
      </fieldset>
      {mode === 'register' ? <div className="filing-section">
        <button type="button" className="filing-toggle" aria-expanded={showFilings} aria-controls="filing-picker" onClick={() => setShowFilings(v => !v)}>
          <strong>{t('¿Necesitas trámites adicionales?', 'Need additional filings?')}</strong>
          <span className="filing-toggle-meta">{picked.length} {t('seleccionados', 'selected')}</span>
        </button>
        <div className={showFilings ? 'filing-collapse is-open' : 'filing-collapse'}>
          <div className="filing-collapse-inner" id="filing-picker" inert={!showFilings}>
            <h3 className="filing-heading">{t('Trámites a la carta (opcional)', 'Filings à la carte (optional)')}</h3>
            <p className="filing-hint">{t('Agrega solo los servicios adicionales que necesites junto a tu registro.', 'Add only the additional services you need along with your registration.')}</p>
            <div className="filing-picker">{filingCatalog.map(group => <div key={group.title} className="filing-group"><h4>{groupLabel(group.title)}</h4><div className="check-grid">{group.items.map(item => <label key={item} className="check-row" data-active={picked.includes(item)}><input type="checkbox" checked={picked.includes(item)} onChange={() => toggle(item)} /><span>{label(item)}</span><span className="check-price">{money(filingPrices[item] ?? 0)}</span></label>)}</div></div>)}</div>
          </div>
        </div>
      </div> : <div className="filing-section">
        <h3 className="filing-heading">{t('Trámites a la carta', 'Filings à la carte')}</h3>
        <p className="filing-hint">{t('Selecciona los trámites que necesitas gestionar para tu negocio ya registrado.', 'Select the filings you need to manage for your already registered company.')}</p>
        <div className="filing-picker">{filingCatalog.map(group => <div key={group.title} className="filing-group"><h4>{groupLabel(group.title)}</h4><div className="check-grid">{group.items.map(item => <label key={item} className="check-row" data-active={picked.includes(item)}><input type="checkbox" checked={picked.includes(item)} onChange={() => toggle(item)} /><span>{label(item)}</span><span className="check-price">{money(filingPrices[item] ?? 0)}</span></label>)}</div></div>)}</div>
      </div>}
      </>}
      {step === 2 && <>
      <button type="button" className="portal-back" onClick={() => { setStep(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}><ArrowLeft />{t('Editar solicitud', 'Edit request')}</button>
      <fieldset className="portal-block"><legend>{t('Tus datos', 'Your details')}</legend>
        <label>{t('Nombre completo', 'Full name')}<input required value={contact.name} onChange={e => setContact({ ...contact, name: e.target.value })} autoComplete="name" /></label>
        <label>{t('Correo electrónico', 'Email')}<input required type="email" value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} autoComplete="email" /></label>
        <label>{t('Teléfono', 'Phone')}<div className="phone-field"><span>🇺🇸 +1</span><input required type="tel" inputMode="tel" maxLength={14} value={contact.phone} onChange={e => { const d = e.target.value.replace(/\D/g, '').slice(0, 10); setContact({ ...contact, phone: d.length > 6 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : d.length > 3 ? `(${d.slice(0, 3)}) ${d.slice(3)}` : d }); }} autoComplete="tel-national" placeholder="(555) 123-4567" /></div><small className="field-note">{t('Exactamente 10 dígitos.', 'Exactly 10 digits.')}</small></label>
      </fieldset>
      {mode === 'register' && <>
      <fieldset className="portal-block"><legend>{t('Dirección del negocio', 'Business address')}</legend>
        <label>{t('Dirección principal (calle y número)', 'Primary address (street and number)')}<input required value={biz.street} onChange={e => setBiz({ ...biz, street: e.target.value })} autoComplete="address-line1" placeholder="123 Main St, Suite 4" /></label>
        <label>{t('Ciudad', 'City')}<input required value={biz.city} onChange={e => setBiz({ ...biz, city: e.target.value })} autoComplete="address-level2" /></label>
        <div className="card-row">
          <label>{t('Estado', 'State')}<select required value={biz.state} onChange={e => setBiz({ ...biz, state: e.target.value })} autoComplete="address-level1"><option value="" disabled>{t('Selecciona tu Estado', 'Select your state')}</option>{usStates.map(s => <option key={s}>{s}</option>)}</select></label>
          <label>{t('Código Postal', 'ZIP code')}<input required inputMode="numeric" value={biz.zip} onChange={e => setBiz({ ...biz, zip: e.target.value.replace(/[^\d-]/g, '').slice(0, 10) })} autoComplete="postal-code" placeholder="12345 o 12345-6789" /></label>
        </div>
        <label className="check-line"><input type="checkbox" checked={sameMailing} onChange={e => setSameMailing(e.target.checked)} /><span>{t('Usar la misma dirección para correspondencia', 'Use the same address for mailing')}</span></label>
        {!sameMailing && <>
          <label>{t('Dirección de correspondencia', 'Mailing address')}<input required value={mailing.street} onChange={e => setMailing({ ...mailing, street: e.target.value })} autoComplete="address-line1" /></label>
          <label>{t('Ciudad', 'City')}<input required value={mailing.city} onChange={e => setMailing({ ...mailing, city: e.target.value })} autoComplete="address-level2" /></label>
          <div className="card-row">
            <label>{t('Estado', 'State')}<select required value={mailing.state} onChange={e => setMailing({ ...mailing, state: e.target.value })} autoComplete="address-level1"><option value="" disabled>{t('Selecciona tu Estado', 'Select your state')}</option>{usStates.map(s => <option key={s}>{s}</option>)}</select></label>
            <label>{t('Código Postal', 'ZIP code')}<input required inputMode="numeric" value={mailing.zip} onChange={e => setMailing({ ...mailing, zip: e.target.value.replace(/[^\d-]/g, '').slice(0, 10) })} autoComplete="postal-code" placeholder="12345 o 12345-6789" /></label>
          </div>
        </>}
      </fieldset>
      <fieldset className="portal-block"><legend>{t('Titular', 'Owner')}</legend>
        <label>{t('Nombre del titular o miembro principal', 'Owner or main member name')}<input required value={biz.owner} onChange={e => setBiz({ ...biz, owner: e.target.value })} autoComplete="name" /></label>
      </fieldset>
      </>}
      </>}
      {step === 3 && <>
      <button type="button" className="portal-back" onClick={() => { setStep(2); window.scrollTo({ top: 0, behavior: 'smooth' }); }}><ArrowLeft />{t('Volver a tus datos', 'Back to your details')}</button>
      <fieldset className="portal-block"><legend>{t('Modalidad de pago', 'Payment option')}</legend>
        <div className="segmented" role="radiogroup">
          <button type="button" role="radio" aria-checked={payMode === 'full'} data-active={payMode === 'full'} onClick={() => setPayMode('full')}>{t('Pago completo', 'Full payment')}</button>
          <button type="button" role="radio" aria-checked={payMode === 'partial'} data-active={payMode === 'partial'} onClick={() => setPayMode('partial')}>{t('Cuotas / pago parcial', 'Installments / partial payment')}</button>
        </div>
      </fieldset>
      <fieldset className="portal-block"><legend>{t('Método de pago', 'Payment method')}</legend>
        <div className="segmented" role="radiogroup">
          <button type="button" role="radio" aria-checked={method === 'card'} data-active={method === 'card'} onClick={() => setMethod('card')}>{t('Tarjeta', 'Card')}</button>
          <button type="button" role="radio" aria-checked={method === 'other'} data-active={method === 'other'} onClick={() => setMethod('other')}>{t('Otros métodos', 'Other methods')}</button>
        </div>
        {method === 'card' ? <>
          <label>{t('Nombre en la tarjeta', 'Name on card')}<input required value={card.name} onChange={e => setCard({ ...card, name: e.target.value })} autoComplete="cc-name" /></label>
          <label>{t('Número de tarjeta', 'Card number')}<input required value={card.number} onChange={e => setCard({ ...card, number: e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ') })} inputMode="numeric" autoComplete="cc-number" placeholder="1234 5678 9012 3456" maxLength={19} /></label>
          <div className="card-row">
            <label>{t('Vencimiento', 'Expiry')}<input required value={card.exp} onChange={e => { const v = e.target.value.replace(/\D/g, '').slice(0, 4); setCard({ ...card, exp: v.length > 2 ? `${v.slice(0, 2)}/${v.slice(2)}` : v }); }} inputMode="numeric" autoComplete="cc-exp" placeholder="MM/AA" maxLength={5} /></label>
            <label>CVC<input required value={card.cvc} onChange={e => setCard({ ...card, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) })} inputMode="numeric" autoComplete="cc-csc" placeholder="123" maxLength={4} /></label>
          </div>
        </> : <>
          <label>{t('¿Cómo prefieres pagar?', 'How would you like to pay?')}<select value={otherMethod} onChange={e => setOtherMethod(e.target.value as typeof otherMethod)}>
            <option value="transfer">{t('Transferencia bancaria', 'Bank transfer')}</option>
            <option value="cash">{t('Efectivo', 'Cash')}</option>
            <option value="other">{t('Otro método', 'Other method')}</option>
          </select></label>
          <p className="portal-note">{t('Un asesor coordina el pago por este medio y te envía las instrucciones. No necesitas ingresar datos de tarjeta.', 'An advisor coordinates the payment through this channel and sends you the instructions. No card details are needed.')}</p>
        </>}
      </fieldset>
      {payMode === 'partial' && <div className="pay-plan">
        <div><span>{t('Pago 1 · hoy', 'Payment 1 · today')}</span><strong>{money(firstPayment)}</strong></div>
        <div><span>{t('Pago 2 · a 30 días', 'Payment 2 · in 30 days')}</span><strong>{money(servicesTotal - firstPayment)}</strong></div>
      </div>}
      <div className="pay-total"><span>{t('Total de servicios', 'Services total')}</span><strong>{money(servicesTotal)}</strong></div>
      <Button variant="brand" type="submit" className="h-12 w-full">{method === 'card' ? t('Pagar ahora', 'Pay now') : t('Confirmar solicitud', 'Confirm request')}<ArrowRight /></Button>
      <p className="portal-note">{t('Tarifa base de servicio desde $349. Las tasas estatales aplican por separado según el Estado y tipo de compañía.', 'Base service fee starting at $349. State filing fees apply separately depending on the state and entity type.')}</p>
      <p className="portal-note">{t('Pago cifrado. Al confirmar se procesa el cobro de tu solicitud.', 'Encrypted payment. Confirming processes the charge for your request.')}</p>
      <p className="portal-note">{t('Modo demostración: todavía no se realiza ningún cargo real.', 'Demo mode: no real charge is made yet.')}</p>
      </>}
      {step === 4 && <div className="portal-confirm">
        <span className="portal-check" aria-hidden="true"><Check size={22} /></span>
        <h2 className="onboarding-title">{t('¡Gracias!', 'Thank you!')}</h2>
        <p className="portal-note">{t(`Registramos tu solicitud con los datos que enviaste. Un asesor dará seguimiento por correo a ${contact.email}.`, `We registered your request with the details you submitted. An advisor will follow up by email at ${contact.email}.`)}</p>
        <p className="portal-notice">{t('Si se requieren datos adicionales para sus documentos, nos comunicaremos con usted al número proporcionado.', 'If additional information is required for your documents, we will contact you at the phone number provided.')}</p>
        <p className="portal-note">{t(`Pago: ${method === 'card' ? 'Tarjeta' : otherMethod === 'transfer' ? 'Transferencia bancaria' : otherMethod === 'cash' ? 'Efectivo' : 'Otro método'} · ${payMode === 'full' ? 'Pago completo' : 'Cuotas (2 pagos)'}`, `Payment: ${method === 'card' ? 'Card' : otherMethod === 'transfer' ? 'Bank transfer' : otherMethod === 'cash' ? 'Cash' : 'Other method'} · ${payMode === 'full' ? 'Full payment' : 'Installments (2 payments)'}`)}</p>
        <p className="portal-note">{t('Modo demostración: no se realizó ningún cargo.', 'Demo mode: no charge was made.')}</p>
      </div>}
      {error && <p className="portal-error" role="alert">{error}</p>}
    </div>
    <aside className="portal-summary" data-reveal>
      <h2>{t('Tu solicitud', 'Your request')}</h2>
      <div className="picked-block">
        {mode === 'register' && <div className="picked-group">
          <h4>{t('Registro de negocio', 'Business registration')}</h4>
          <ul className="picked-list"><li><span>{entity === 'Non-Profit' ? t('Sin Fines de Lucro', 'Non-Profit') : entity}</span><span className="picked-price">{money(REGISTRATION_FEE)}</span></li></ul>
        </div>}
        {filingCatalog.map(group => {
          const items = group.items.filter(item => picked.includes(item));
          if (!items.length) return null;
          return <div className="picked-group" key={group.title}>
            <h4>{groupLabel(group.title)}</h4>
            <ul className="picked-list">{items.map(item => <li key={item}><span>{label(item)}</span><span className="picked-price">{money(filingPrices[item] ?? 0)}</span><button type="button" className="picked-remove" aria-label={t(`Quitar ${item}`, `Remove ${item}`)} onClick={() => toggle(item)}><X /></button></li>)}</ul>
          </div>;
        })}
      </div>
      <dl className="summary">
        <div><dt>{t('Estado', 'State')}</dt><dd>{stateName || '—'}</dd></div>
        <div><dt>{t('Trámites adicionales', 'Additional filings')}</dt><dd>{picked.length}</dd></div>
        <div><dt>{t('Servicios (estimado)', 'Services (estimate)')}</dt><dd>{money(servicesTotal)}</dd></div>
      </dl>
      <p className="portal-note">{t('Tarifa base de servicio desde $349. Las tasas estatales aplican por separado según el Estado y tipo de compañía.', 'Base service fee starting at $349. State filing fees apply separately depending on the state and entity type.')}</p>
      {step <= 2 && <Button variant="brand" type={step === 1 ? 'button' : 'submit'} className="h-12 w-full" onClick={step === 1 ? advanceToDetails : undefined}>{step === 1 ? t('Continuar con mis datos', 'Continue with my details') : t('Ir al pago', 'Go to payment')}<ArrowRight /></Button>}
      {step <= 2 && <p className="portal-note">{step === 1 ? t('Completa tus datos en el siguiente paso antes de ir al pago.', 'Complete your details in the next step before going to payment.') : t('Avanzarás a la pasarela de pago segura.', 'You will move on to the secure payment gateway.')}</p>}
    </aside>
  </form>;
}

