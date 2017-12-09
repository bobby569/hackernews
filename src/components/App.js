import './App.css';
import _ from 'lodash';
import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import Button from './Button';
import Search from './Search';
import Table from './Table';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			err: null,
			result: null,
			searchTerm: ''
		};

		this.onDismiss = this.onDismiss.bind(this);
		this.onSearchChange = this.onSearchChange.bind(this);
		this.onSearchSubmit = this.onSearchSubmit.bind(this);
	}

	fetchSearchTopStories(searchTerm, page = 0) {
		axios
			.get(`https://hn.algolia.com/api/v1/search?query=${searchTerm}&page=${page}`)
			.then(res => {
				this.setSearchTopStories(res.data);
			})
			.catch(err => this.setState({ err }));
	}

	setSearchTopStories(result) {
		console.log(result);
		const { hits, page } = result;
		const oldHits = page !== 0 ? this.state.result.hits : [];
		const updatedHits = [...oldHits, ...hits];
		this.setState({
			result: { hits: updatedHits, page }
		});
	}

	onDismiss(id) {
		const newHits = this.state.result.hits.filter(item => {
			return item.objectID !== id;
		});
		this.setState({ result: { ...this.state.result, hits: newHits } });
	}

	onSearchChange(e) {
		this.setState({ searchTerm: e.target.value });
	}

	onSearchSubmit(e) {
		e.preventDefault();
		const { searchTerm } = this.state;
		this.fetchSearchTopStories(searchTerm);
	}

	componentDidMount() {
		const { searchTerm } = this.state;
		this.fetchSearchTopStories(searchTerm);
	}

	render() {
		const { result, searchTerm, err } = this.state;
		const term = _.debounce(term => {
			this.onSearchChange();
		}, 500);
		const page = (result && result.page) || 0;

		if (err) {
			return <p>Something went wrong</p>;
		}

		return (
			<div className="page">
				<Header />
				<div className="interactions">
					<Search value={searchTerm} onChange={this.onSearchChange} />
				</div>
				{err ? (
					<div className="interactions">
						<p>Something went wrong</p>
					</div>
				) : (
					result && <Table list={result.hits} onDismiss={this.onDismiss} />
				)}
				<div className="interactions">
					<Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>
						More
					</Button>
				</div>
			</div>
		);
	}
}
