import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';

class ZmitiCoverApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			showCanvas:false
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {

		var mainStyle = {
			background:'url(./assets/images/index-bg.jpg) no-repeat center / cover'
		}

		return (
			<div className={'zmiti-cover-main-ui '+(this.state.entryChooseApp?'hide':'')} style={mainStyle}>
				<div className='zmiti-cover-top'>
					<img src='./assets/images/index-top.png'/>
				</div>

				<div className={'zmiti-cover-canvas '+(this.state.showCanvas?'active':'')} style={{background:'url(./assets/images/index-center.png) no-repeat center',width:637,height:568}}>
					<img src='./assets/images/index-text.png'/>
				</div>

				<div className={'zmiti-cover-shici '+(this.state.showCanvas?'active':'')}>
					<img src='./assets/images/index-shici.png'/>
				</div>

				<div onTouchTap={this.entryChooseApp.bind(this)} className={'zmiti-cover-begin '+(this.state.showCanvas?'active':'')}>
					<img src='./assets/images/index-begin-bg.png'/>
					<img src='./assets/images/index-begin-text.png'/>
				</div>

				<div className='zmiti-cover-bottom'>
					<img src='./assets/images/index-bottom.png'/>
				</div>
			</div>
		);
	}

	entryChooseApp(){
		this.setState({
			entryChooseApp:true
		});
		let {obserable} = this.props;
		obserable.trigger({
			type:'entryChooseApp'
		})
		
	}
	componentDidMount() {
		this.setState({
			showCanvas:true
		});
	}
 
}
export default PubCom(ZmitiCoverApp);