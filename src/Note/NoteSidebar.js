import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import CurrentFolder from "../Folder/CurrentFolder";
import "./Note.css";
import NotefulContext from "../NotefulContext";
import HomeSidebar from "../MainHome/MainHomeSidebar";

class NoteSidebar extends React.Component {
  
  static contextType = NotefulContext;

  render() {
    const { notes, folders } = this.context;
    const { noteId } = this.props.match.params;
    const currentNote = notes.find(note => note.id === Number(noteId));
    const currentFolder = folders.find(
      folder => currentNote.folderid === folder.id
    );

    return (
      <Fragment>
        <button
          className="goBackButton"
          onClick={() => this.props.history.push("/")}
        >
          Go back
        </button>
        <HomeSidebar />
        <ErrorBoundary>
          <CurrentFolder currentFolder={currentFolder.name} />
        </ErrorBoundary>
      </Fragment>
    );
  }
}

// }

NoteSidebar.defaultProps = {
  store: {
    notes: [],
    folders: []
  }
};

NoteSidebar.propTypes = {
  store: PropTypes.shape({
    folders: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
      })
    ),
    notes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        modified: PropTypes.string,
        folderid: PropTypes.string,
        content: PropTypes.string
      })
    )
  })
};

export default withRouter(NoteSidebar);