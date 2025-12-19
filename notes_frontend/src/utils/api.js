const getBaseUrl = () => {
  // Allow override via environment variable; CRA exposes REACT_APP_* at build-time
  const url = process.env.REACT_APP_NOTES_API_BASE_URL || 'http://localhost:3001';
  return url.replace(/\/+$/, '');
};

// PUBLIC_INTERFACE
export async function apiRequest(path, options = {}) {
  /** Perform a fetch request to the Notes API with sensible defaults.
   * path: string - path starting with /, e.g., /notes or /notes/1
   * options: RequestInit
   * Returns: parsed JSON for 2xx responses, throws for non-2xx
   */
  const base = getBaseUrl();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  const resp = await fetch(`${base}${path}`, { ...options, headers });
  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    const err = new Error(`API error ${resp.status}: ${text || resp.statusText}`);
    err.status = resp.status;
    err.body = text;
    throw err;
  }

  // handle empty body cases (204)
  const contentType = resp.headers.get('content-type') || '';
  if (resp.status === 204 || !contentType.includes('application/json')) {
    return null;
  }
  return resp.json();
}
