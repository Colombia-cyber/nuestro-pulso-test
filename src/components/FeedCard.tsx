export function FeedCard({ item, onOpen }) {
  return (
    <div className="feed-card" onClick={onOpen} tabIndex={0} role="button"
         aria-label={item.title} onKeyDown={e => e.key === 'Enter' && onOpen()}>
      <div className="feed-title">{item.title}</div>
      <div className="feed-meta">{item.source} • {item.timeAgo}</div>
      {item.image && <img src={item.image} alt={item.title} />}
    </div>
  );
}