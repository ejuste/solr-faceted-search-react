import './index.css';
import React from "react";
import ReactDOM from "react-dom";
import { SolrFacetedSearch, SolrClient } from "./lib/";

// The search fields and filterable facets you want
const fields = [
  { label: "All text fields", field: "*", type: "text" },
  { label: "Name", field: "name", type: "text" },
  { label: "Price", field: "price", type: "list-facet" },
  { label: "In stock", field: "inStock", type: "list-facet" },
  { label: "Author", field: "author_s", type: "list-facet" },
  { label: "Genre", field: "genre_s", type: "list-facet" }
];

// The sortable fields you want
const sortFields = [
  { label: "Name", field: "name" },
  { label: "Author", field: "author" },
  { label: "Price", field: "price" },
  { label: "Genre", field: "genre_s" }
];

document.addEventListener("DOMContentLoaded", () => {
  // The client class
  new SolrClient({
    // The solr index url to be queried by the client
    url: "http://localhost:8983/solr/techproducts/select",  
    searchFields: fields,
    sortFields: sortFields,

    // The change handler passes the current query- and result state for render
    // as well as the default handlers for interaction with the search component
    onChange: (state, handlers) =>
      // Render the faceted search component
      ReactDOM.render(
        <SolrFacetedSearch
          {...state}
          {...handlers}
          bootstrapCss={true}
          onSelectDoc={doc => console.log(doc)}
        />,
        document.getElementById("root")
      )
  }).initialize(); // this will send an initial search, fetching all results from solr
});
