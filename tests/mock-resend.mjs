const originalFetch = globalThis.fetch.bind(globalThis);
globalThis.fetch = async (input, init) => {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input?.url;
  if (url === 'https://api.resend.com/emails') {
    return new Response(JSON.stringify({
      name: 'validation_error',
      message: 'The sender domain is not verified; this test sender is restricted.'
    }), { status: 403, headers: { 'content-type': 'application/json' } });
  }
  return originalFetch(input, init);
};
