export {};

declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js',
      targetIdOrEventName: string,
      params?: Record<string, unknown> | Date
    ) => void;
    dataLayer?: unknown[];
  }
}
