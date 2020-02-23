import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import api from "./util/api";
import Sheet from "./Sheet";

const PrivateSheet = () => {
  const { id } = useParams();
  const [sheet, updateSheet] = useState({});

  useEffect(() => {
    (async function iffe() {
      const response = await api.get("sheets/" + id);
      updateSheet(response);
    })();
  }, []);
  return (
    <div className="private_sheet">
      <Sheet data={sheet} editable={true} />
    </div>
  );
};

export default PrivateSheet;
