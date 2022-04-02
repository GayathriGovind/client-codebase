import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8983/solr/tutorial_core",
  headers: {
    "Content-type": "application/json",
    "Orgin":"http://localhost:8081/"
  }
});