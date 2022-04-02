import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import { Link } from "react-router-dom";

export default class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);	
	this.onChangeSearchTech = this.onChangeSearchTech.bind(this);
    this.retrieveTutorials = this.retrieveTutorials.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);
    this.removeAllTutorials = this.removeAllTutorials.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
	this.searchTech = this.searchTech.bind(this);

    this.state = {
      tutorials: [],
	  tutorialNames: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: "",
	  searchTech:""
    };
  }

  componentDidMount() {
    this.retrieveTutorials();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }
  
  onChangeSearchTech(e) {
    const searchTech = e.target.value;

    this.setState({
      searchTech: searchTech
    });
  }  

  retrieveTutorials() {
    TutorialDataService.getAll()
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTutorials();
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
  }

  setActiveTutorial(tutorial, index) {
    this.setState({
      currentTutorial: tutorial,
      currentIndex: index
    });
  }

  removeAllTutorials() {
    TutorialDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });


    TutorialDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          tutorials: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  
  searchTech() {
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
	

    TutorialDataService.findByTech(this.state.searchTech)
      .then(response => {
		  console.log(response.data.response.docs);
        this.setState({
          tutorialNames: response.data.response.docs
        });
        
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, searchTech, tutorials, tutorialNames, currentTutorial, currentIndex } = this.state;

    return (

		
      <div className="list row">
	  
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by technology from Solr"
              value={searchTech}
              onChange={this.onChangeSearchTech}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTech}
              >
                Search
              </button>
            </div>
          </div>
        </div>
		
		
		{tutorialNames.length >0 &&
        <div className="col-md-8">
          <h4>Technology - Tutorial List</h4>

          <ul className="list-group">
            {tutorialNames &&
              tutorialNames.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  key={index}
                >
                  {tutorial.tutorial_name}
                </li>
              ))}
          </ul>
        </div>		
		}

		
        <div className="col-md-8">
				   <div> 
          
           <hr />
        </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title from MongoDB"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
		
		{tutorials.length >0 &&
        <div className="col-md-6">
          <h4>Tutorials List</h4>

          <ul className="list-group">
            {tutorials &&
              tutorials.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTutorial(tutorial, index)}
                  key={index}
                >
                  {tutorial.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllTutorials}
          >
            Remove All
          </button>
        </div>
		}
        <div className="col-md-6">
          {currentTutorial ? (
            <div>
              <h4>Tutorial</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentTutorial.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentTutorial.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentTutorial.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/tutorials/" + currentTutorial.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
			  {tutorials.lengh >0 &&
              <p>Please click on a Tutorial...</p>}
            </div>
          )}
        </div>
      </div>
    );
  }
}
