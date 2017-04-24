import React, { Component } from 'react';
import './assets/css/index.css';
import $ from 'jquery';

import ZmitiUserHeader  from './components/header.jsx';

export default class ZmitiUserApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			
		};
	}

	render() {


		return (
			<div className='zmiti-user-main-ui'>
				<ZmitiUserHeader></ZmitiUserHeader>
				<section className='zmiti-user-info'>
					<div className='zmiti-user-headrimg'><img src={this.props.headimgurl|| './assets/images/user/zmiti.jpg'}/></div>
					<div>{this.props.nickname||'zmiti'}</div>
				</section>
			</div>
		);
	}


	componentDidMount() {

	}
}
