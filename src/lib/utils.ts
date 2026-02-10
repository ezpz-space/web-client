/** Merge class names, filtering out falsy values */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

/** Format phone number: 01012345678 → 010-1234-5678 */
export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

/** Strip hyphens from formatted phone */
export function stripPhone(value: string): string {
  return value.replace(/\D/g, '');
}

/** Format price: 1000000 → "100만원" */
export function formatPrice(won: number): string {
  const man = Math.round(won / 10000);
  return `${man.toLocaleString()}만원`;
}
