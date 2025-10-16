const feeds = [
  // International News
  { label: "Google News (World)", url: "https://news.google.com/rss" },
  { label: "BBC Top Stories", url: "http://feeds.bbci.co.uk/news/rss.xml" },
  { label: "CNN World", url: "http://rss.cnn.com/rss/cnn_world.rss" },
  { label: "Reuters Top News", url: "https://www.reutersagency.com/feed/" },
  { label: "Al Jazeera", url: "https://www.aljazeera.com/xml/rss/all.xml" },
  { label: "The Guardian World", url: "https://www.theguardian.com/world/rss" },
  { label: "New York Times World", url: "https://rss.nytimes.com/services/xml/rss/nyt/World.xml" },
  
  // Colombian News
  { label: "El Tiempo - Colombia", url: "https://www.eltiempo.com/rss/colombia.xml" },
  { label: "El Espectador", url: "https://www.elespectador.com/rss/noticias" },
  { label: "Semana", url: "https://www.semana.com/feed/" },
  { label: "Portafolio - Economía", url: "https://www.portafolio.co/rss" },
  { label: "El Colombiano", url: "https://www.elcolombiano.com/rss/ultima-hora" },
  { label: "La República", url: "https://www.larepublica.co/rss" },
  { label: "Caracol Noticias", url: "https://noticias.caracoltv.com/rss" },
  
  // Tech & Innovation
  { label: "Hacker News", url: "https://hnrss.org/frontpage" },
  { label: "TechCrunch", url: "https://techcrunch.com/feed/" },
  { label: "Wired", url: "https://www.wired.com/feed/rss" },
];

export function FeedSelector({ onSelect }: { onSelect: (url: string) => void }) {
  return (
    <div style={{ margin: "1em 0" }}>
      <label htmlFor="feed-select">Choose News Feed: </label>
      <select
        id="feed-select"
        onChange={e => onSelect(e.target.value)}
        style={{ padding: "0.5em", minWidth: "250px" }}
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