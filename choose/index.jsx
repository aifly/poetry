import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';

class ZmitiChooseApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {


		return (
			<div className={'zmiti-choose-main-ui '+(this.state.showMainUI?'active':'')}>
				<div onTouchStart={()=>{this.setState({readActive:true})}} onTouchEnd={()=>{this.setState({readActive:false})}} className={this.state.readActive?'active':''}><img src='./assets/images/c-read.png'/></div>
				<div onTouchStart={()=>{this.setState({guessActive:true})}} onTouchEnd={()=>{this.setState({guessActive:false})}} className={this.state.guessActive?'active':''} ><img src='./assets/images/c-guess.png'/></div>
				<div onTouchStart={()=>{this.setState({recordActive:true})}} onTouchEnd={()=>{this.setState({recordActive:false})}} className={this.state.recordActive?'active':''}><img src='./assets/images/c-record.png'/></div>
				<img src='./assets/images/choose.png'/>
			</div>
		);
	}

	componentDidMount() {
		let {obserable} = this.props;
		obserable.on('entryChooseApp',()=>{
			this.setState({
				showMainUI:true
			})
		})
	}
}
export default PubCom(ZmitiChooseApp);