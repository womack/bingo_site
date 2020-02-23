import React, { useEffect, useState, useMemo } from "react";
import Tile from "./Tile";
import crown from "./crown.png";
import "./Sheet.css";

const Sheet = ({ data, editable, isWinning }) => {
  const [mvp, updateMVP] = useState({});
  const [tilesCompleted, updateTilesCompleted] = useState(0);

  useMemo(() => {
    let tmpTilesCompleted = 0;
    if (!data.tiles) return;
    data.tiles.forEach(tile => (tile.submission ? tmpTilesCompleted++ : null));
    updateTilesCompleted(tmpTilesCompleted);
  }, [data.tiles]);

  useEffect(() => {
    let mvp = { name: "", submissions: 0 };
    const teamLength = data.team_members ? data.team_members.length : 0;
    for (let i = 0; i < teamLength; i++) {
      let submissionCount = 0;
      data.tiles.forEach(tile => {
        if (!tile.submission) return;
        if (
          tile.submission &&
          tile.submission.playername.trim() === data.team_members[i].trim()
        ) {
          submissionCount++;
        }
      });
      if (submissionCount > mvp.submissions)
        mvp = { name: data.team_members[i], submissions: submissionCount };
    }
    updateMVP(mvp);
  }, [data]);

  if (!data.team_members) return null;

  return (
    <div className={`sheet ${isWinning ? "winning_sheet" : ""}`}>
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
        {mvp ? (
          <h2>
            MVP: {mvp.name} ({mvp.submissions})
          </h2>
        ) : null}
        <div
          className="bingo_sheet"
          style={!editable ? { width: "620px" } : {}}
        >
          {data.tiles.map((tile, i) => (
            <Tile
              data={tile}
              sheetId={data._id}
              teamMembers={data.team_members}
              editable={editable}
              key={i}
            />
          ))}
        </div>
      </div>
      {isWinning ? (
        <>
          <img className="crown" src={crown} alt="crown" />
          <img className="crown_2" src={crown} alt="crown" />
        </>
      ) : null}
    </div>
  );
};

export default Sheet;
