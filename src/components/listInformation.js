import React, { Component } from "react";
import movieApi from "../api/movieApi";

class List extends Component {
  state = {
    id: this.props.match.params.id,
    type: this.props.match.params.type,
    movie: {},
    video: [],
    release_date: "",
    tvAirDate: "",
    tvLastAirDate: "",
    tvNextEpisode: "",
    person: {},
    tv: {},
    company: {},
    collection: {}
  };

  async componentWillMount() {
    const response = await movieApi.get(
      `${this.state.type}/${
        this.state.id
      }?api_key=9688f0d6b22148c561ff31c9fdbb7f01`
    );
    switch (this.state.type) {
      case "movie":
        this.setState({ movie: response.data }, () =>
          console.log(
            this.state.movie,
            "movie response",
            this.setState({
              release_date: this.state.movie.release_date.substring(0, 4)
            })
          )
        );

        const videoResponse = await movieApi.get(
          `${this.state.type}/${
            this.state.id
          }/videos?api_key=9688f0d6b22148c561ff31c9fdbb7f01`
        );

        this.setState({ video: videoResponse.data.results[0].key }, () =>
          console.log(this.state.video, " video response")
        );
        break;
      case "person":
        const personResponse = await movieApi.get(
          `${this.state.type}/${
            this.state.id
          }?api_key=9688f0d6b22148c561ff31c9fdbb7f01`
        );
        this.setState({ person: personResponse.data }, () =>
          console.log(personResponse)
        );

        break;
      case "tv":
        const tvResponse = await movieApi.get(
          `${this.state.type}/${
            this.state.id
          }?api_key=9688f0d6b22148c561ff31c9fdbb7f01`
        );
        this.setState(
          {
            tv: tvResponse.data
          },
          () => {
            console.log(tvResponse);
            this.setState({
              tvAirDate: this.state.tv.first_air_date.slice(0, 4),
              tvLastAirDate: this.state.tv.last_air_date.slice(0, 4),
              tvNextEpisode: this.state.tv.next_episode_to_air
                ? this.state.tv.next_episode_to_air
                : "series ended"
            });
          }
        );

        break;
      case "company":
        const companyResponse = await movieApi.get(
          `${this.state.type}/${
            this.state.id
          }?api_key=9688f0d6b22148c561ff31c9fdbb7f01`
        );
        this.setState({ company: companyResponse.data }, () =>
          console.log(companyResponse)
        );

        break;
      case "collection":
        const collectionResponse = await movieApi.get(
          `${this.state.type}/${
            this.state.id
          }?api_key=9688f0d6b22148c561ff31c9fdbb7f01`
        );
        this.setState({ collection: collectionResponse.data }, () =>
          console.log(collectionResponse)
        );

        break;
      default:
        console.log("can not find any type");
        break;
    }
  }

  render() {
    console.log("render", this);
    return (
      <div
        className="ui container"
        style={{
          marginTop: "100px",
          border: "1px solid lightgrey"
        }}
      >
        {/* MOVIE */}
        {this.state.type === "movie" && (
          <div
            style={{
              backgroundColor: "#222f3e",
              color: "#dff9fb",
              padding: "20px"
            }}
          >
            <div style={{ marginBottom: "12px" }}>
              <span style={{ fontSize: "24px" }}>{this.state.movie.title}</span>
              <span> </span>({this.state.release_date})
              <span style={{ float: "right" }}>
                {this.state.movie.popularity}{" "}
                <span style={{ fontSize: "16px" }}> ⭐️ </span>
              </span>
            </div>
            <div>
              <span>
                {Math.floor(this.state.movie.runtime / 60)}h{" "}
                {this.state.movie.runtime % 60}min
              </span>{" "}
            </div>
            <div className="ui two column grid">
              <div className="column">
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${this.state.video}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="iframe"
                />
              </div>
              <div className="column">
                <div style={{ marginLeft: "30px" }}>
                  {this.state.movie.overview}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PERSON */}

        {this.state.type === "person" && (
          <div
            style={{
              backgroundColor: "#34495e",
              color: "#c8d6e5",
              padding: "20px"
            }}
          >
            <div style={{ marginBottom: "12px" }}>
              <span style={{ fontSize: "24px" }}>{this.state.person.name}</span>
              <div style={{ marginBottom: "10px" }} />
              <span> Born: </span>({this.state.person.birthday}) in{" "}
              {this.state.person.place_of_birth}
              <span style={{ float: "right" }}>
                {this.state.person.popularity}{" "}
                <span style={{ fontSize: "16px" }}> ⭐️ </span>
              </span>
            </div>
            <div />
            <div className="ui two column grid">
              <div className="column">
                <img
                  src={`https://image.tmdb.org/t/p/w300/${
                    this.state.person.profile_path
                  }`}
                  alt="el.name"
                />
              </div>
              <div className="column">
                <div style={{ marginLeft: "30px" }}>
                  {this.state.person.biography}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TV SHOWS */}
        {this.state.type === "tv" && (
          <div
            style={{
              backgroundColor: "#34495e",
              color: "#dff9fb",
              padding: "20px"
            }}
          >
            <div
              style={{
                marginBottom: "12px"
              }}
            >
              <div
                style={{
                  fontSize: "24px"
                }}
              >
                {this.state.tv.name}
              </div>
              <div style={{ marginBottom: "10px" }} />
              <small>{this.state.tv.episode_run_time} min</small> |
              <small> Tv Series: </small>
              <small>
                {" "}
                ({this.state.tvAirDate} - {this.state.tvLastAirDate})
              </small>
              <div style={{ float: "right", marginBottom: "10px" }}>
                {this.state.tv.popularity}{" "}
                <span style={{ fontSize: "16px" }}>⭐️</span>
              </div>
            </div>
            <div style={{ marginBottom: "10px" }} />
            <div className="ui two column grid">
              <div className="column">
                <img
                  src={`https://image.tmdb.org/t/p/w300/${
                    this.state.tv.poster_path
                  }`}
                  alt="el.name"
                />
              </div>
              <div className="column">
                <div style={{ marginLeft: "30px", marginTop: "20px" }}>
                  {this.state.tv.overview}
                </div>
                <div style={{ marginLeft: "30px", marginTop: "40px" }}>
                  Number of Seasons : {this.state.tv.number_of_seasons}
                </div>
                <div style={{ marginLeft: "30px", marginTop: "5px" }}>
                  Number of Episode : {this.state.tv.number_of_episodes}
                </div>
                <div style={{ marginLeft: "30px", marginTop: "5px" }}>
                  Next Episode: {this.state.tvNextEpisode.air_date}
                </div>
                <div style={{ marginLeft: "30px", marginTop: "5px" }}>
                  See more information:
                  <a
                    style={{ marginLeft: "30px", color: "#16a085" }}
                    href={this.state.tv.homepage}
                  >
                    {this.state.tv.homepage}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* COMPANY */}
        {this.state.type === "company" && (
          <div
            style={{
              backgroundColor: "#34495e",
              color: "#c8d6e5",
              padding: "20px"
            }}
          >
            <div style={{ marginBottom: "12px" }}>
              <span style={{ fontSize: "24px" }}>
                {this.state.company.name}
              </span>
              <div style={{ marginBottom: "10px" }} />
            </div>
            <div />
            <div className="ui two column grid">
              <div className="column">
                <img
                  src={`https://image.tmdb.org/t/p/w300/${
                    this.state.company.logo_path
                  }`}
                  alt="el.name"
                />
              </div>
              <div className="column">
                <div style={{ marginLeft: "30px", marginTop: "20px" }}>
                  {this.state.company.headquarters} |{" "}
                  {this.state.company.origin_country}
                </div>

                <div style={{ marginLeft: "30px", marginTop: "5px" }}>
                  Homepage:
                  <a
                    style={{ marginLeft: "30px", color: "#16a085" }}
                    href={this.state.company.homepage}
                  >
                    {this.state.company.homepage}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* COLLECTION */}
        {this.state.type === "collection" && (
          <div
            style={{
              backgroundColor: "#34495e",
              color: "#f7f1e3",
              padding: "20px"
            }}
          >
            <div style={{ marginBottom: "12px" }}>
              <span style={{ fontSize: "24px" }}>
                {this.state.collection.name}
              </span>
              <div style={{ marginBottom: "10px" }} />
            </div>
            <div />
            <div className="ui two column grid">
              <div className="column">
                <img
                  src={`https://image.tmdb.org/t/p/w300/${
                    this.state.collection.poster_path
                  }`}
                  alt="el.name"
                />
              </div>
              <div className="column">
                <div style={{ marginLeft: "30px" }}>
                  {this.state.collection.overview}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default List;
