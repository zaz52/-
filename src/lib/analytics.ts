type PageViewPayload = {
  path: string;
  referrer: string;
};

export function trackPageView() {
  if (typeof window === 'undefined') return;
  if (window.location.pathname.startsWith('/admin')) return;
  if (navigator.doNotTrack === '1') return;

  const payload: PageViewPayload = {
    path: `${window.location.pathname}${window.location.search}`,
    referrer: document.referrer,
  };

  const body = JSON.stringify(payload);

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: 'application/json' });
    navigator.sendBeacon('/api/analytics/pageview', blob);
    return;
  }

  void fetch('/api/analytics/pageview', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => {
    // Analytics should never affect the visitor experience.
  });
}
