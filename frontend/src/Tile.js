import React from "react";
import "./Tile.css";

const Tile = ({ data }) => {
  return (
    <div className="tile">
        <div>

      <img src={data.boss_image} alt="boss" />
      <div className="tile_content">
        <h1>{data.boss_name}</h1>
        <p>{data.tile_challenge}</p>
      </div>
      {/* {data.submission ? (
        <div className="submission">
          <h2>{data.submission.playername}</h2>
          <p>{new Date(data.submission.date).toLocaleDateString()}</p>
          <a href={data.submission.url}> {data.submission.url}</a>
        </div>
      ) : null} */}
        </div>

    </div>
  );
};

export default Tile;
