import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';

class ZmitiLoadingApp extends Component {
	constructor(props) {
		super(props);
		 
		this.doc = document;
		this.viewW = this.doc.documentElement.clientWidth;
		this.viewH = this.doc.documentElement.clientHeight;

	}

	render() {
		var mainStyle = {
			background:'#fff url(./assets/images/choose.png) no-repeat center bottom / cover'
		}
		return (
			<div className='zmiti-loading-ui' style={mainStyle}>
				{
					[1,2,3,4,5,6,7,8,9,10,11,12,13].map((item,i)=>{
						return <div key={i} className='zmiti-loading-item'><img src={'./assets/images/loading'+item+'.png'}/></div>
					})
				}
				<div className='zmiti-loading-pre'>{this.props.progress|| '0%'}</div>
			</div>
		);
	}

	componentDidMount() {

	}

	r(m, n) {
		return (m + Math.random() * (n - m));
	} 
}
export default PubCom(ZmitiLoadingApp);