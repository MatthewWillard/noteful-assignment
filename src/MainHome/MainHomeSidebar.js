import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import "./MainHome.css";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import NotefulContext from "../NotefulContext";

class HomeSidebar extends React.Component {
  
  static contextType = NotefulContext;

  render() {
    const folders = this.context.folders.map((folder, i) => {
      return (
        <Fragment key={i}>
          <ErrorBoundary>
            <li className="folderLi">
              <NavLink className="folderLink" to={`/folder/${folder.id}`}>
                {folder.folder_name}
              </NavLink>
            </li>
          </ErrorBoundary>
        </Fragment>
      );
    });
    return (
      <div>
        <ul className="folderUl"> {folders} </ul>{" "}
        <NavLink to={`/AddFolder`} className="button" id="sidebar-button">
          {" "}
          Add Folder
        </NavLink>
      </div>
    );
  }
}

HomeSidebar.propTypes = {
  folders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  )
};

HomeSidebar.defaultProps = {
  handleClick: () => {},
  folders: []
};

export default HomeSidebar;