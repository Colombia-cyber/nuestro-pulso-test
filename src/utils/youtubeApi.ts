const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";

export async function youtubeApiRequest(
  resource: string,
  params: Record<string, string>,
  apiKey?: string,
  accessToken?: string
) {
  const query = new URLSearchParams(params);
  if (apiKey) query.set("key", apiKey);
  const url = `${YOUTUBE_API_BASE}/${resource}?${query.toString()}`;

  const headers: Record<string, string> = {};
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;

  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error(`YouTube API error: ${response.statusText}`);
  return response.json();
}