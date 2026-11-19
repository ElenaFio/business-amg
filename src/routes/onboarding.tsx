import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OnboardingForm } from '@/components/business-sections';
import { useLanguage } from '@/lib/language';
import { useRevealOnScroll } from '@/lib/reveal';

type Search = { plan?: string | undefined; business?: string | undefined; item?: string | undefined };

export const Route = createFileRoute('/onboarding')({
  validateSearch: (search: Record<string, unknown>): Search => ({
    plan: typeof search['plan'] === 'string' ? search['plan'] : undefined,
    business: typeof search['business'] === 'string' ? search['business'] : undefined,
    item: typeof search['item'] === 'string' ? search['item'] : undefined,
  }),
  head: () => ({ meta: [
    { title: 'Empieza tu negocio | Business' },
    { name: 'description', content: 'Comienza el registro de tu negocio en EE. UU. con Business, en tu idioma.' },
    { property: 'og:title', content: 'Empieza tu negocio | Business' },
    { property: 'og:description', content: 'Registra tu negocio con expertos que hablan tu idioma.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary' },
  ] }),
  component: OnboardingPage,
});

function OnboardingPage() { return <OnboardingContent />; }

function OnboardingContent() {
  const { t } = useLanguage();
  useRevealOnScroll();
  const { plan, business, item } = Route.useSearch();
  return <main className="onboarding-page">
    <div className="onboarding-wrap">
      <Button variant="ghost" asChild className="onboarding-back"><Link to="/"><ArrowLeft />{t('Volver al inicio', 'Back to home')}</Link></Button>
      <OnboardingForm plan={plan || 'Register'} initialBusiness={business ?? ''} initialItem={item} />
    </div>
  </main>;
}
