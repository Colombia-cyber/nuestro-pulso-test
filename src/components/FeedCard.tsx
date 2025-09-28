export function FeedCard({ item }) {
  // Always open Google search for any topic
  const handleOpen = () => {
    if (item.topic) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(item.topic)}`, '_blank');
    } else if (item.url) {
      window.open(item.url, '_blank');
    }
  };

  return (
    <div className="feed-card"
      onClick={handleOpen}
      tabIndex={0}
      role="button"
      aria-label={item.title}
      onKeyDown={e => e.key === 'Enter' && handleOpen()}>
      <div className="feed-title">{item.title}</div>
      <div className="feed-meta">{item.source} • {item.timeAgo}</div>
      {item.image && <img src={item.image} alt={item.title} />}
    </div>
  );
}
