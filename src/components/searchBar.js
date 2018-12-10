import React, { Component } from "react";
import List from "./list";
import { debounce } from "lodash";
import movieApi from "../api/movieApi";

class SearchBar extends Component {
  state = {
    term: "",
    list: [],
    searchType: "movie",
    load: false
  };

  // componentDidMount() {
  //   if (localStorage.getItem("list"))
  //     this.setState(
  //       {
  //         list: JSON.parse(localStorage.getItem("list"))
  //       },
  //       () => console.log(this.state.list)
  //     );
  // }

  onSearchSubmit = debounce(async term => {
    console.log(this);
    if (term !== "") {
      const response = await movieApi.get(
        `search/${
          this.state.searchType
        }?api_key=9688f0d6b22148c561ff31c9fdbb7f01`,
        {
          params: {
            query: term
          }
        }
      );
      if (response) {
        this.setState({ load: true });
      }
      console.log(response, "ress");
      await this.setState({
        list: response.data.results
      });
      //window.localStorage.setItem("list", JSON.stringify(this.state.list));
      console.log(this.state.list);
    }
  }, 500);

  handleChange = term => {
    console.log(term);
    this.setState({ term }, () => this.onSearchSubmit(this.state.term));
  };

  handleChangeSearchType = async searchType => {
    await this.setState({ searchType }, () =>
      this.onSearchSubmit(this.state.term)
    );
  };

  render() {
    return (
      <div
        className="ui segment"
        style={{ backgroundColor: "#2c3e50", color: "#7efff5" }}
      >
        <form onSubmit={this.onSearchSubmit} className="ui form">
          <div className="field">
            <div
              style={{
                marginLeft: "10px",
                fontSize: "18px",
                marginBottom: "6px"
              }}
            >
              Search
            </div>

            <input
              type="text"
              value={this.state.term}
              onChange={e => this.handleChange(e.target.value)}
            />
          </div>
        </form>
        <div style={{ marginTop: "20px" }} />

        <label>
          Search Type :
          <select
            value={this.state.searchType}
            onChange={e => this.handleChangeSearchType(e.target.value)}
            style={{ marginLeft: "15px" }}
          >
            <option value="movie">Movie</option>
            <option value="tv">Tv shows</option>
            <option value="person">Person</option>
            <option value="company">Company</option>
            <option value="collection">Collection</option>
          </select>
        </label>

        {this.state.load && this.state.term && this.state.list.length > 0 && (
          <List list={this.state.list} searchType={this.state.searchType} />
        )}
        {this.state.load && this.state.term && this.state.list.length <= 0 && (
          <div>Aradığınız kritere uygun sonuç bulunamadı.</div>
        )}
      </div>
    );
  }
}

export default SearchBar;
