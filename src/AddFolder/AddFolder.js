import React from "react";
import PropTypes from 'prop-types'
import NotefulContext from "../NotefulContext";
import config from '../config'

class AddFolder extends React.Component {
  
  static contextType = NotefulContext;

  handleSubmit = e => {
    e.preventDefault();
    const folderName = {
      folder_name: e.target.name.value
    };
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: "POST",
      body: JSON.stringify(folderName),
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
      .then(folder => {
        this.context.addFolder(folder);
        this.props.history.push(`/folder/${folder.id}`);
      })
      .catch(error => {
        console.error({ error });
        alert( `something went wrong: ${error.message}` )
      });
  };

  handleClickCancel = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <section className="formContainer">
        <h2>Create a New Folder</h2>
        <hr />
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="formInputs">
            <label className="label" htmlFor="name">Folder Name:</label>
            <input
              type="text"
              name="folder-name"
              id="name"
              placeholder="New Folder"
              aria-required="true"
              aria-label="Enter folder name"
              required
            />
          </div>

          <div id="formButtons">
            <button className="button" type="button" onClick={this.handleClickCancel}>
              Cancel
            </button>{" "}
            <button className="button" type="submit">Save</button>
          </div>
        </form>
      </section>
    );
  }
}

AddFolder.defaultProps = {
  history: {
    push: () => []
  }
};

AddFolder.propType = {
  history: PropTypes.shape({
    push: PropTypes.func
  })
};
export default AddFolder;