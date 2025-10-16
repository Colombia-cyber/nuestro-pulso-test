export function Status({ loading, error }: { loading?: boolean; error?: string | null }) {
  if (loading) return <div className="status status-loading">Loading...</div>;
  if (error) return <div className="status status-error">❌ {error}</div>;
  return null;
}