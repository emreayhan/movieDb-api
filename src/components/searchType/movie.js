import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Movie extends Component {
  state = {};
  render() {
    const { searchType, list } = this.props;
    return (
      <div>
        <ul className="contacts">
          {list.map(el => (
            <li key={el.id}>
              <div className="ui two column grid">
                <div className="column">
                  <NavLink
                    to={`${searchType}/${el.id}`}
                    exact
                    style={{
                      marginLeft: "20px",
                      marginBottom: "100px",
                      color: "dodgerblue"
                    }}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w200/${el.poster_path}`}
                      alt={el.title}
                    />
                  </NavLink>
                </div>
                <div className="column">
                  <div
                    style={{
                      marginBottom: "20px",
                      fontWeight: "bolder",
                      fontFamily:
                        "Franklin Gothic Medium, Arial Narrow', Arial, sans-serif"
                    }}
                  >
                    {el.title}{" "}
                  </div>
                  <div> {el.overview} </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Movie;
