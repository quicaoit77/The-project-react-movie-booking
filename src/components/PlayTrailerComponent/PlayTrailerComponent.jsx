import React, { useEffect } from "react";

export default function PlayTrailerComponent(props) {
  return (
    <div style={{ padding: "10px 0" }}>
      <iframe
        width="100%"
        height="350px"
        src={props.trailerFilm}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope"
        allowFullScreen
      ></iframe>
    </div>
  );
}
