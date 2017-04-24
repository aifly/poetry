import React, { Component } from 'react';

import './css/header.css';

export  default class ZmitiUserHeader extends Component {
	render() {

		var mainStyle = {
			background:'url(./assets/images/user/user-top-bg.png) no-repeat center top '
		}
		return (
			<header className='zmiti-user-header' style={mainStyle}>
				<div className='zmiti-user-back'>返回</div>
			</header>
		);
	}
}
