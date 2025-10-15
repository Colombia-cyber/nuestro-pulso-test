export interface YouTubeSearchResult {
  kind: "youtube#searchResult";
  etag: string;
  id: {
    kind: string;
    videoId?: string;
    channelId?: string;
    playlistId?: string;
  };
  snippet: {
    publishedAt: string; // ISO date string
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      [key: string]: {
        url: string;
        width: number;
        height: number;
      }
    };
    channelTitle: string;
    liveBroadcastContent: string;
  };
}