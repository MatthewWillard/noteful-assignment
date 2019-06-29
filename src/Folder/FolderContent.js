import React from "react";
import { Link, NavLink } from "react-router-dom";
import moment from "moment";
import NotefulContext from "../NotefulContext";
import "./FolderContent.css";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

class FolderContent extends React.Component {
  static contextType = NotefulContext;

  render() {
    const notes = this.context.notes
      .filter(
        note => note.folderid === Number(this.props.match.params.folderId)
      )
      .map((note, i) => {
        return (
          <ErrorBoundary key={i}>
                <li key={i} className="mainContentLi">
                  <Link to={`/note/${note.id}`} className="noteName">
                    <h2> {note.name} </h2>{" "}
                  </Link>{" "}
                  <p className="noteModified">
                    {" "}
                    Modified On: {moment(note.modified).format(
                      "YYYY-MM-DD"
                    )}{" "}
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
          </ErrorBoundary>
        );
      });
    return (
      <ul className="mainContentUl">
        {notes}{" "}
        <NavLink to="/AddNote">
          <button className="button"> Add Note </button>
        </NavLink>{" "}
      </ul>
    );
  }
}

export default FolderContent;