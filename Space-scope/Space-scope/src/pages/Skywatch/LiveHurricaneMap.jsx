export default function LiveHurricaneMap() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <iframe
        title="Live Hurricane Map"
        src="https://www.nhc.noaa.gov/nhc_atlantic.php"
        style={{
          border: "none",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
