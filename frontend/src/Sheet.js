import React from "react";
import Tile from "./Tile";
import "./Sheet.css";

const Sheet = ({ data, editable }) => {


  if(!data.team_members) return null
  let tilesCompleted = 0;
  data.tiles.forEach(tile => (tile.submission ? tilesCompleted++ : null));
  return (
    <div className="sheet">
      <h1>{data.team_name.toUpperCase()} </h1>
     
      <div className="team_members">
        {data.team_members.map((member, i) => (
          <p key={i}>{member}</p>
        ))}
      </div>
     
     <div className="sheet_contents">
     <h1>
        ({tilesCompleted}/{data.tiles.length}) Tiles Completed
      </h1>
      <div className="bingo_sheet">
          
        {data.tiles.map((tile, i) => (
          <Tile data={tile} sheetId={data._id} teamMembers={data.team_members} editable={editable} key={i} />
        ))}
      </div></div>
    </div>
  );
};

export default Sheet;
