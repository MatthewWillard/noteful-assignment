import React from "react";
import PropTypes from "prop-types";
import NotefulContext from "../NotefulContext";
import ValidationError from "./ValidationError";
import config from '../config'

class AddNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note_name: "",
      nameValid: false,
      validationMessages: {
        name: "",
        context: ""
      }
    };
    this.note_name = React.createRef();
  }

  static contextType = NotefulContext;

  handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    const note = {
      note_name: e.target.note_name.value,
      folder_id: e.target.folderId.value,
      content: e.target.content.value
    };
    this.updateName(note.note_name);
    if (this.state.nameValid) {
      fetch(`${config.API_ENDPOINT}/notes`, {
        method: "POST",
        body: JSON.stringify(note),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          if (!res.ok) {
            return res.json().then(error => {
              throw error;
            });
          }
          return res.json();
        })
        .then(note => {
          this.context.addNote(note);
          this.props.history.push("/");
        })
        .catch(error => {
          console.error({ error });
          alert( `something went wrong: ${error.message}` )
        });
    }
  };

  handleClickCancel = () => {
    this.props.history.push("/");
  };

  validateName(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    fieldValue = fieldValue.trim();

    if (fieldValue.length === 0) {
      fieldErrors.name = "Note Name is Required";
      hasError = true;
    } else {
      fieldErrors.name = "";
      hasError = false;
    }

    this.setState({
      validationMessages: fieldErrors,
      nameValid: !hasError
    });
  }

  validateContext(contextValue) {
    const contextErrors = { ...this.state.validationMessages };
    let hasError = false;

    contextValue = contextValue.trim();

    if (contextValue.length === 0) {
      contextErrors.context = "Context is Required";
      hasError = true;
    } else {
      contextErrors.name = "";
      hasError = false;
    }

    this.setState({
      validationMessages: contextErrors,
      nameValid: !hasError
    });
  }


  updateName(noteName) {
    this.setState({ noteName }, () => {
      this.validateName(noteName);
    });
  }

  render() {
    return (
      <section className="formContainer">
        <h2>Create a New Note</h2>
        <hr />
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="formInputs">
            <label htmlFor="folderId" className="label">
              Folder:
            </label>
            <select id="folderId" aria-label="Select a folder">
              {this.context.folders.map(folder => {
                return (
                  <option key={folder.id} value={folder.id}>
                    {folder.folder_name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="formInputs">
            <label className="label" htmlFor="note_name">
              Note Name:
            </label>
            <input
              type="text"
              name="note-name"
              id="note_name"
              placeholder="New Note"
              aria-required="true"
              aria-label="Enter a name for your new note"
              ref={this.note_name}
            />
            <ValidationError
              hasError={!this.state.nameValid}
              message={this.state.validationMessages.name}
            />
          </div>

          <div className="formInputs">
            <label className="label" htmlFor="content">
              Note Content:
            </label>
            <input 
              type="text"
              name="content" 
              id="content"
              aria-required="true" 
              aria-label="Enter content for your new note" 
              />
              <ValidationError
              hasError={!this.state.nameValid}
              message={this.state.validationMessages.context}
            />
          </div>

          <div id="formButtons">
            <button
              className="button"
              type="button"
              onClick={this.handleClickCancel}
            >
              Cancel
            </button>{" "}
            <button className="button" type="submit">
              Save
            </button>
          </div>
        </form>
      </section>
    );
  }
}

AddNote.defaultProps = {
  history: {
    push: () => []
  }
};

AddNote.propType = {
  history: PropTypes.shape({
    push: PropTypes.func
  })
};

export default AddNote;