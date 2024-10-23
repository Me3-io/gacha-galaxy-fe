interface Cookie3 {
  trackEvent: (eventCategory: string, eventAction: string, eventName?: string, eventValue?: number) => void;
}

interface Window {
  cookie3: Cookie3;
}
