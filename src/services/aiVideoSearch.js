export async function aiVideoSearch({ onlyFeeds, personalized, trending, apiKey, endpoint }) {
  // Connect to backend API using env key
  const response = await fetch(`${endpoint}/search`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ onlyFeeds, personalized, trending })
  });
  return await response.json();
}