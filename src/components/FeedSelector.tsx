const feeds = [
  { label: "Google News", url: "https://news.google.com/rss" },
  { label: "BBC Top Stories", url: "http://feeds.bbci.co.uk/news/rss.xml" },
  { label: "Hacker News", url: "https://hnrss.org/frontpage" },
];

export function FeedSelector({ onSelect }: { onSelect: (url: string) => void }) {
  return (
    <div style={{ margin: "1em 0" }}>
      <label htmlFor="feed-select">Choose News Feed: </label>
      <select
        id="feed-select"
        onChange={e => onSelect(e.target.value)}
        style={{ padding: "0.5em", minWidth: "220px" }}
      >
        {feeds.map(feed => (
          <option value={feed.url} key={feed.label}>
            {feed.label}
          </option>
        ))}
      </select>
    </div>
  );
}