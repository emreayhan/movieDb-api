import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Movie from "./searchType/movie";
import Tv from "./searchType/tv";
import Company from "./searchType/company";
import Person from "./searchType/person";
import Collection from "./searchType/collection";

import "../css/list.css";
class List extends Component {
  state = {};

  render() {
    const { searchType, list } = this.props;
    console.log(searchType);
    return (
      <div>
        {/* MOVIE */}
        {searchType === "movie" && (
          <Movie list={list} searchType={searchType} />
        )}

        {/* PERSON */}
        {searchType === "person" && (
          <Person list={list} searchType={searchType} />
        )}

        {/* TV SHOWS */}
        {searchType === "tv" && <Tv list={list} searchType={searchType} />}

        {/* COMPANY */}
        {searchType === "company" && (
          <Company list={list} searchType={searchType} />
        )}

        {/* COLLECTION */}
        {searchType === "collection" && (
          <Collection list={list} searchType={searchType} />
        )}
      </div>
    );
  }
}

export default List;
