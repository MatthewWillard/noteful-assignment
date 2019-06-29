import React from 'react'
import './Sidebar.css'; 
import {NavLink} from 'react-router-dom'; 
import NotefulContext from '../NotefulContext'; 
import {Link} from 'react-router-dom';

class Sidebar extends React.Component {

    static contextType = NotefulContext; 

    render() {
        const folders = this.context.folders; 
    
        return (
            <div className="sidebar">
                <ul>
                    {folders.map(folder =>
                        <li key={folder.id}>
                            <NavLink to={`/folder/${folder.id}`}>
                                {folder.name}
                            </NavLink>
                        </li>
                    )}
                </ul>
                <Link to="/add-folder">Add Folder</Link>
            </div>
        )
    }
}


export default Sidebar 