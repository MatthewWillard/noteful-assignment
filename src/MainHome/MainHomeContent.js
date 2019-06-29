import React from "react";
import { Link, NavLink } from "react-router-dom";
import moment from "moment";
import NotefulContext from "../NotefulContext";
import "./MainHome.css";

class HomeContent extends React.Component {

  static contextType = NotefulContext;
  
  render() {
    let notes = this.context.notes.map((note, i) => {
      return (
        <li key={i} className="mainContentLi">
          <Link to={`/note/${note.id}`} className="noteName">
            <h2> {note.name} </h2>{" "}
          </Link>{" "}
          <p className="noteModified">
            {" "}
            Modified On: {moment(note.modified).format("YYYY-MM-DD")}{" "}
          </p>{" "}
          <button
            className="deleteNoteButton"
            onClick={() =>
              this.context.deleteNoteRequest(note.id, this.context.deleteNote)
            }
          >
            {" "}
            Delete Note
          </button>{" "}
        </li>
      );
    });
    return (
      <div>
        <ul className="mainContentUl"> {notes} </ul>{" "}
        <NavLink to="/AddNote">
          <button className="button"> Add Note </button>{" "}
        </NavLink>
      </div>
    );
  }
}

export default HomeContent;