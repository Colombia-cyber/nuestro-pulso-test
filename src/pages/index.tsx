export default function HomePage() {
  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #ffecb3 0%, #ffd54f 100%)"
    }}>
      <h1 style={{
        fontWeight: 700,
        fontSize: 32,
        color: "#333",
        marginBottom: 16,
        display: "flex",
        alignItems: "center",
        gap: 16
      }}>
        <span role="img" aria-label="flag">🇨🇴</span> Nuestro Pulso
      </h1>
      <p style={{
        background: "#fffde7",
        padding: 16,
        borderRadius: 8,
        boxShadow: "0 2px 6px #fff8e1",
        maxWidth: 400,
        textAlign: "center"
      }}>
        ¡Página de inicio funcionando! Si ves esto, todo está bien.
      </p>
    </main>
  );
}