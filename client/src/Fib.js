import React, { Component } from 'react';
import axios from 'axios';

export default class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: '',
  };

  fetchValues = async () => {
    const values = await axios.get('/api/values/current');
    this.setState({ values: values.data });
  };

  fetchIndexes = async () => {
    const seenIndexes = await axios.get('/api/values/all');
    this.setState({ seenIndexes: seenIndexes.data });
  };

  componentDidMount = () => {
    this.fetchValues();
    this.fetchIndexes();
  };

  renderSeenIndexes = () => {
    return this.state.seenIndexes.map(({ number }) => number).join(', ');
  };

  renderValues = () => {
    return Object.entries(this.state.values).map(([key, value]) => (
      <div key={key}>
        For index {key} I Calculated {value}
      </div>
    ));
  };

  handleSubmit = async event => {
    event.preventDefault();

    await axios.post('/api/values', { index: this.state.index });

    this.setState({ index: '' });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="">Enter you index:</label>
          <input
            type="text"
            value={this.state.index}
            onChange={event => this.setState({ index: event.target.value })}
          />
          <button>Submit</button>
        </form>

        <h3>Indexes I have seen:</h3>
        {this.renderSeenIndexes()}
        <h3>Calculated values:</h3>
        {this.renderValues()}
      </div>
    );
  }
}
