import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import NotefulContext from "../NotefulContext";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

class NoteContent extends React.Component {
  
  static contextType = NotefulContext;

  render() {
    const note = this.context.notes.find(
      note => note.id === Number(this.props.match.params.noteId)
    );

    return (
      <ErrorBoundary>
            <Fragment>
              <section className="note">
                <h2 className="noteHeader">{note.name}</h2>
                <p className="noteModified">
                  Modified On: {moment(note.modified).format("YYYY-MM-DD")}
                </p>
                <Link to="/">
                  <button
                    className="deleteNoteButton"
                    onClick={() =>
                      this.context.deleteNoteRequest(note.id, this.context.deleteNote)
                    }
                  >
                    {" "}
                    Delete Note
                  </button>
                </Link>
              </section>
              <p className="noteContent">{note.content}</p>
            </Fragment>
      </ErrorBoundary>
    );
  }
}

export default NoteContent;