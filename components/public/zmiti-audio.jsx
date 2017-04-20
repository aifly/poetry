import React, { Component } from 'react';
import {PubCom} from './pub.jsx';
import './css/audio.css';
import $ from 'jquery';

class ZmitiAudioApp extends Component {
	constructor(props) {
		super(props);
		this.state={
		};
	}

	render() {
		return (
			<div className='zmiti-audio-main-ui'>
				<section className='zmiti-audio-C'>
					<aside><img src='./assets/images/pause.png'/></aside>
					<aside>33”</aside>
				</section>
			</div>
		);
	}

	componentDidMount() {

	}
}

export default PubCom(ZmitiAudioApp);