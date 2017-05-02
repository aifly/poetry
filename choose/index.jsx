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

		var className = '';
		if(this.state.showMainUI === 0){
			className = 'active'
		}else if(this.state.showMainUI === -1){
			className = 'hide';
		}

		return (
			<div className={'zmiti-choose-main-ui '+className}>
				<div onTouchTap={this.entryMain.bind(this)} onTouchStart={()=>{this.setState({readActive:true})}} onTouchEnd={()=>{this.setState({readActive:false})}} className={this.state.readActive?'active':''}><img src='./assets/images/c-read.png'/></div>
				<div onTouchTap={this.entryMainGuess.bind(this)} onTouchStart={()=>{this.setState({guessActive:true})}} onTouchEnd={()=>{this.setState({guessActive:false})}} className={this.state.guessActive?'active':''} ><img src='./assets/images/c-guess.png'/></div>
				<div onTouchTap={this.entryUser.bind(this)} onTouchStart={()=>{this.setState({recordActive:true})}} onTouchEnd={()=>{this.setState({recordActive:false})}} className={this.state.recordActive?'active':''}><img src='./assets/images/c-record.png'/></div>
				<img src='./assets/images/choose.png'/>
			</div>
		);
	}


	entryUser(){
		this.setState({
			showMainUI:-1
		});
		let {obserable} = this.props;
		obserable.trigger({
			type:'toggleUserCenter',
			data:true
		});

		obserable.trigger({
			type:'hideMainContent',
			data:'poetry'
		});
	}

	entryMainGuess(){
		this.setState({
			showMainUI:-1
		});
		let {obserable} = this.props;
		obserable.trigger({
			type:'hideMainContent',
			data:'guess'
		});
	}

	entryMain(){//
		this.setState({
			showMainUI:-1
		});
		let {obserable} = this.props;
		obserable.trigger({
			type:'hideMainContent'
		})
	}

	componentDidMount() {
		let {obserable} = this.props;
		obserable.on('entryChooseApp',()=>{
			this.setState({
				showMainUI:0
			});
		})
	}
}
export default PubCom(ZmitiChooseApp);