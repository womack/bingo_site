import React, { useState } from "react";
import "./Tile.css";
import check from "./check.png";
import Modal from "react-modal";
import api from "./util/api";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  formControl: {
    color: "white"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const Tile = ({ sheetId, data, teamMembers, editable }) => {
  const classes = useStyles();

  const [submissionModalOpen, updateModalOpen] = useState(false);
  const [submissionURL, updateSubmissionURL] = useState(
    data.submission ? data.submission.url : ""
  );
  const [selectedTeamMember, updateSelectedTeamMember] = useState(
    teamMembers[0]
  );

  const submitTile = async () => {
    if (submissionURL.trim().length < 1) {
      return alert("Need url");
    }
    const response = await api.submitTile(sheetId, data.boss_name, {
      url: submissionURL,
      playername: selectedTeamMember
    });
    alert("Submitted");
    window.location.reload();
  };

  const handleChange = event => {
    updateSelectedTeamMember(event.target.value);
  };

  return (
    <>
      <div
        className={`${editable ? "tile_hover" : ""} tile`}
        onClick={editable ? () => updateModalOpen(true) : null}
        style={
          !editable ? { width: "120px", height: "120px", padding: " 2px" } : {}
        }
      >
        <div>
          <img src={data.boss_image} alt="boss" />
          {data.submission ? (
            <img className="checkmark" src={check} alt="checkmark" />
          ) : null}
          <div className="tile_content">
            <h1>{data.boss_name.split("-")[0]}</h1>
            <p>{data.tile_challenge}</p>
          </div>
          {data.submission ? (
            <div className="submission">
              <h2>{data.submission.playername}</h2>
              {/* <p>{new Date(data.submission.date).toLocaleDateString()}</p> */}
              {/* <a href={data.submission.url}> {data.submission.url}</a> */}
            </div>
          ) : null}
        </div>
      </div>
      <Modal
        isOpen={submissionModalOpen}
        onRequestClose={() => updateModalOpen(false)}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "0px",
            border: "2px solid grey",
            overflow: "hidden"
          }
        }}
      >
        <div className="submission_modal">
          <div className="submission_details">
            <h2>Tile Submission</h2>
            <h3>{data.boss_name}</h3>
            <h4>{data.tile_challenge}</h4>
          </div>

          <div className="submission_form">
            <TextField
              label="Image url..."
              value={submissionURL}
              onChange={e => updateSubmissionURL(e.target.value)}
            />
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Team Member</InputLabel>
              <Select value={selectedTeamMember} onChange={handleChange}>
                {teamMembers.map((t, i) => (
                  <MenuItem value={t} key={i}>
                    {t}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" color="primary" onClick={submitTile}>
              Submit
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Tile;
