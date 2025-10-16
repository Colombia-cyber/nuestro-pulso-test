interface RefreshButtonProps {
  onRefresh: () => void;
  loading?: boolean;
}

export function RefreshButton({ onRefresh, loading = false }: RefreshButtonProps) {
  return (
    <button
      onClick={onRefresh}
      disabled={loading}
      className="refresh-button"
      aria-label="Refresh feeds"
      title="Refresh all feeds"
    >
      <span style={{ display: "inline-block", transition: "transform 0.3s" }}>
        {loading ? "⏳ Refreshing..." : "🔄 Refresh"}
      </span>
    </button>
  );
}
