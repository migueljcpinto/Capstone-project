export default async function fetcher(...args) {
  const response = await fetch(...args);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Request with ${JSON.stringify(args)} failed with status ${response.status}. Response: ${text}`);
  }
  return await response.json();
}
