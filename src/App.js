import "./App.css";
import React, { Component } from "react";
import { SolrFacetedSearch, SolrClient } from "./lib/";

// The search fields and filterable facets you want
const fields = [
  { label: "All text fields", field: "*", type: "text" },
  { label: "Name", field: "name", type: "text" },
  { label: "Price", field: "price", type: "list-facet" },
  { label: "In stock", field: "inStock", type: "list-facet" },
  { label: "Author", field: "author", type: "list-facet" },
  { label: "Genre", field: "genre_s", type: "list-facet" }
];

// The sortable fields you want
const sortFields = [
  { label: "Name", field: "name" },
  { label: "Author", field: "author" },
  { label: "Price", field: "price" },
  { label: "Genre", field: "genre_s" }
];

class App extends Component {
  state = {
    solrFacetedSearchProps: {},
    solrFactedSearchHandlers: {},
    init: false
  };

  componentDidMount() {
    new SolrClient({
      // The solr index url to be queried by the client
      url: "http://localhost:8983/solr/techproducts/select",
      searchFields: fields,
      sortFields: sortFields,
      mainQueryField: "*",
      hl: {
        fl: "*",
        method: "unified",
        tag: {
          pre: "<mark>",
          post: "</mark>"
        }
      },
      // The change handler passes the current query- and result state for render
      // as well as the default handlers for interaction with the search component
      onChange: (state, handlers) => {
        this.setState({
          solrFacetedSearchProps: state,
          solrFactedSearchHandlers: handlers,
          init: true
        });
      },
      onError: (err, response) => {
        alert(
          "Server returned an error:\n" +
            (err ? err : "") +
            " " +
            (response ? JSON.stringify(response) : "")
        );
      }
    }).initialize(); // this will send an initial search, fetching all results from solr
  }

  render() {
    if (this.state.init) {
      return (
        <SolrFacetedSearch
          {...this.state.solrFacetedSearchProps}
          {...this.state.solrFactedSearchHandlers}
          bootstrapCss={true}
        />
      );
    } else {
      return <div />;
    }
  }
}

export default App;
