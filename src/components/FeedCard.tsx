export function FeedCard({ item }) {
  // Always open Google search for the card's title (for ALL news)
  const handleOpen = () => {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(item.title)}`, '_blank');
  };

  return (
    <div
      className="feed-card"
      onClick={handleOpen}
      tabIndex={0}
      role="button"
      aria-label={item.title}
      onKeyDown={e => e.key === 'Enter' && handleOpen()}
    >
      <div className="feed-title">{item.title}</div>
      <div className="feed-meta">{item.source} • {item.timeAgo}</div>
      {item.image && <img src={item.image} alt={item.title} />}
    </div>
  );
}