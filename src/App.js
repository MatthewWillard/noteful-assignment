import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NotefulContext from "./NotefulContext";
import Header from "./Header/Header";
import HomeSidebar from "./MainHome/MainHomeSidebar";
import NoteSidebar from "./Note/NoteSidebar";
import HomeContent from "./MainHome/MainHomeContent";
import FolderContent from "./Folder/FolderContent";
import NoteContent from "./Note/NoteContent";
import AddFolder from "./AddFolder/AddFolder";
import config from './config'
import AddNote from "./AddNote/AddNote";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      notes: []
    };
  }

  componentDidMount() {
    this.fetchNotes();
    const url = `${config.API_ENDPOINT}/folders`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
  };

  fetch(url, options)
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        else {
          throw new Error('Something went wrong');
        }
      })
      .then(data => {
        this.setState({folders: data});
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  }

  fetchNotes() {
    const notesUrl = `${config.API_ENDPOINT}/notes`;
    const notesOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
  }

      fetch(notesUrl, notesOptions)
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        else {
          throw new Error('Something went wrong');
        }
      })
      .then(data => {
        this.setState({notes: data});
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  }

  deleteNoteRequest = note_id => {
    fetch(`${config.API_ENDPOINT}/notes/${note_id}`, {
      method: "DELETE"
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error;
          });
        }
      })
      .then(() => {
        this.setState({
          notes: this.state.notes.filter(note => note.id !== note_id)
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  addFolder = folder => {
    this.setState({
      folders: [...this.state.folders, folder]
    });
  };

  addNote = note => {
    this.setState({
      notes: [...this.state.notes, note]
    });
  };

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNoteRequest: this.deleteNoteRequest,
      addFolder: this.addFolder,
      addNote: this.addNote
    };

    return (
      <div className="App">
        <Header />
        <main className="container">
          <section className="sidebar">
            <Switch>
              <NotefulContext.Provider value={contextValue}>
                {["/", "/folder/:folderId", "/AddNote", "/AddFolder"].map(
                  path => (
                    <Route
                      exact
                      key={path}
                      path={path}
                      component={HomeSidebar}
                    />
                  )
                )}
                <Route path="/note/:noteId" component={NoteSidebar} />
              </NotefulContext.Provider>
            </Switch>
          </section>

          <section className="mainContent">
            <NotefulContext.Provider value={contextValue}>
              <Switch>
                <Route exact path="/" component={HomeContent} />
                <Route path="/folder/:folderId" component={FolderContent} />
                <Route path="/note/:noteId" component={NoteContent} />
                <Route path="/AddFolder" component={AddFolder} />
                <Route path="/AddNote" component={AddNote} />
              </Switch>
            </NotefulContext.Provider>
          </section>
        </main>
      </div>
    );
  }
}

export default App;