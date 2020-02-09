import React, { useState, useEffect } from "react";
import Sheet from "./Sheet";
import api from "./util/api";
import "./App.css";

function App() {
  const [allSheets, updateAllSheets] = useState([]);

  useEffect(() => {
    (async function iffe() {
      const response = await api.get("sheets");
      updateAllSheets(response);
    })();
  }, []);

  return (
    <div>
      

      <div className="all_sheets">
        {allSheets.map((sheet, i) => (
          <Sheet data={sheet} key={i} editable={false} />
        ))}
      </div>
    </div>
  );
}

export default App;
