const isGtagAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
};

export const trackCtaClick = (variant: 'hero' | 'floating'): void => {
  if (!isGtagAvailable()) return;

  window.gtag!('event', 'cta_click', {
    cta_variant: variant,
    cta_location: variant === 'hero' ? 'hero_section' : 'floating_bottom',
  } as Record<string, unknown>);
};

export const trackLeadSubmission = (hasEmail: boolean, hasPhone: boolean): void => {
  if (!isGtagAvailable()) return;

  const leadType = hasEmail && hasPhone ? 'both' : hasEmail ? 'email' : 'phone';

  window.gtag!('event', 'lead_submission', {
    lead_type: leadType,
    has_email: hasEmail,
    has_phone: hasPhone,
  } as Record<string, unknown>);
};
