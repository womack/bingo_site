import React, { useState, useEffect } from "react";
import Sheet from "./Sheet";
import api from "./util/api";
import "./App.css";

function App() {
  const [allSheets, updateAllSheets] = useState([]);

  useEffect(() => {
    (async function iffe() {
      let response = await api.get("sheets");
      response = response.sort((a, b) => {
        let aTilesCompleted = 0;
        let bTilesCompleted = 0;
        a.tiles.forEach(tile => (tile.submission ? aTilesCompleted++ : null));
        b.tiles.forEach(tile => (tile.submission ? bTilesCompleted++ : null));
        return bTilesCompleted - aTilesCompleted;
      });
      updateAllSheets(response);
    })();
  }, []);

  return (
    <div>
      <div className="all_sheets">
        {allSheets.map((sheet, i) => (
          <Sheet data={sheet} key={i} editable={false} isWinning={i === 0} />
        ))}
      </div>
    </div>
  );
}

export default App;
