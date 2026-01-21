const ObjectView = () => {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#000" }}>
      <iframe
        title="Stellarium Web"
        src="https://stellarium-web.org/"
        style={{
          width: "100%",
          height: "100%",
          border: "none"
        }}
        allowFullScreen
      />
    </div>
  );
};

export default ObjectView;
