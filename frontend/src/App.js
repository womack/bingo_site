import React, { useState } from "react";
import Sheet from "./Sheet";
import api from "./util/api";
import "./App.css";

function App() {
  const [allSheets, updateAllSheets] = useState([]);

  (async function iffe() {
    const response = await api.get("sheets");
    console.log(response);
    updateAllSheets(response);
  })();
  return (
    <div className="App">
      <div className="bingo_info">
        <h1>VTG EASTER BINGO</h1>
        <h2>Running for X more days</h2>
      </div>

      <div className="all_sheets">
        {allSheets.map((sheet, i) => (
          <Sheet data={sheet} key={i} editable={false} />
        ))}
      </div>
    </div>
  );
}

export default App;
