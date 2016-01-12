import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_details';


const API_KEY = 'AIzaSyAwhMUP3jQZ40rsEo8mXO5d1qIkU67GBHg';

// create a new component that produces HTML

class App extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			videos:[],
			selectedVideo: null
		};

		this.videoSearch('louis armstrong');
	}

	videoSearch(term){
		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({
				videos: videos,
				selectedVideo: videos[0]
			});
			// console.log(videos);
		});
	}

	render() {
		const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);


		return (
			<div>
				<SearchBar onSearchTermChange={term => this.videoSearch(term) }/>
				<VideoDetail video={this.state.selectedVideo}/>
				<VideoList 
					onVideoSelect={selectedVideo => this.setState({selectedVideo})}
					videos={this.state.videos} />
			</div>
		) 
	}
}

// take the generated html and put it on the page
ReactDOM.render(<App />, document.querySelector('.container'));