//imgUrl not working for menu images

import React, { Component } from 'react';
import Title from '../Components/Title';
import data from '../sample.json';
import placeholder from '../assets/placeholder.png';
import formatData from '../formatData';
import { Link } from 'react-router-dom';
import './TitleList.css';

export default class TitleList extends Component {
  state = { isLoading: true };

  // componentDidMount() {
  //   setTimeout(() => this.setState({ isLoading: false }), 1500);
  // }

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  render() {
    var sectionTitle;
    switch (this.props.type) {
      case 'menu':
        sectionTitle = 'Popular Titles';
        break;
      case 'movie':
        sectionTitle = 'Popular Movies';
        break;
      case 'series':
        sectionTitle = 'Popular Series';
    }

    let flicks = [];
    if (this.props.type === 'menu') {
      flicks = [
        <Link to={`/series`}>
          <Title title="Popular series" imgUrl={placeholder} overlay="SERIES" />
        </Link>,
        <Link to={`/movie`}>
          <Title title="Popular movies" imgUrl={placeholder} overlay="MOVIES" />
        </Link>
      ];
    } else {
      const formattedData = formatData(data, this.props.type);
      flicks = formattedData.map(t => {
        return <Title title={t.title} imgUrl={t.images['Poster Art'].url} />;
      });
    }

    if (this.state.isLoading) {
      return <h1>Loading...</h1>;
    }

    return (
      <div>
        <div id="sectionTitle">
          <h3>{sectionTitle}</h3>
        </div>
        <div className="TitleList">{flicks}</div>
      </div>
    );
  }
}
