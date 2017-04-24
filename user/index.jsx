import React, { Component } from 'react';
import './assets/css/index.css';
import $ from 'jquery';


import ZmitiUserCenterApp  from './components/usercenter.jsx';
import ZmitiCourseListApp  from './components/courselist.jsx';
import ZmitiCourseDetailApp  from './components/coursedetail.jsx';

export default class ZmitiUserApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			
		};
	}

	render() {


		return (
			<div className='zmiti-user-main-ui'>
				<ZmitiUserCenterApp></ZmitiUserCenterApp>
				<ZmitiCourseListApp></ZmitiCourseListApp>
				<ZmitiCourseDetailApp></ZmitiCourseDetailApp>
			</div>
		);
	}


	componentDidMount() {

	}
}
