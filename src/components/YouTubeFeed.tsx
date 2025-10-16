import { useState, useEffect } from "react";
import { Status } from "./Status";
import { SkeletonList } from "./SkeletonList";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
}

interface YouTubeFeedProps {
  apiKey: string;
  channelId?: string;
  search?: string;
}

export function YouTubeFeed({ apiKey, channelId, search }: YouTubeFeedProps) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!apiKey) {
      setError("YouTube API key is missing. Please add VITE_YOUTUBE_API_KEY to your .env file.");
      return;
    }

    const fetchVideos = async () => {
      setLoading(true);
      setError(null);
      try {
        const endpoint = search
          ? `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(search)}&maxResults=10&type=video&key=${apiKey}`
          : `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=10&order=date&type=video&key=${apiKey}`;

        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`YouTube API error: ${response.statusText}`);
        }
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error.message || "YouTube API error");
        }

        const videoList: Video[] = data.items?.map((item: any) => ({
          id: item.id.videoId || item.id,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
          publishedAt: item.snippet.publishedAt,
        })) || [];

        setVideos(videoList);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch videos");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [apiKey, channelId, search]);

  if (loading) return <SkeletonList count={3} />;
  if (error) return <Status error={error} />;
  if (videos.length === 0) return <p>No videos found.</p>;

  return (
    <div className="youtube-feed">
      {videos.map((video) => (
        <div key={video.id} className="video-card">
          <a
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={video.thumbnail} alt={video.title} loading="lazy" />
          </a>
          <div className="video-info">
            <h3>
              <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {video.title}
              </a>
            </h3>
            <p>{video.description ? video.description.substring(0, 150) : "No description available"}...</p>
            <small>{new Date(video.publishedAt).toLocaleDateString()}</small>
          </div>
        </div>
      ))}
    </div>
  );
}