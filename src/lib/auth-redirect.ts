/** Keep authentication returns within learner pages on this site. */
export function learnerReturnPath(value: string | null): string {
  if (!value || !value.startsWith('/') || value.startsWith('//') || /[\\\x00-\x20]/.test(value)) return '/mon-espace';
  try {
    const url = new URL(value, 'https://enovcorp.com');
    if (url.origin !== 'https://enovcorp.com') return '/mon-espace';
    if (!/^\/(academy(?:\/|$)|mon-espace(?:\/|$)|profil(?:\/|$)|session\/)/.test(url.pathname)) return '/mon-espace';
    return url.pathname + url.search + url.hash;
  } catch { return '/mon-espace'; }
}
