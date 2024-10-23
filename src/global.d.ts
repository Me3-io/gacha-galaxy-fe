interface Cookie3 {
  trackEvent: (eventData: { category: string; action: string; name?: string; value?: number }) => void;
}

interface Window {
  cookie3: Cookie3;
}
