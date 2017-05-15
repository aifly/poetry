import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';

class ZmitiChooseApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			entryMain:false,
			entryMainGuess:false
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
				
				<div className='zmiti-type-rule'>
					<article>1、从系统中随机抽取一首诗，将它用你的家乡话朗读并传递出去，看看有多少人能明白你的意思</article>
					<article>2、猜猜用各地方言读出来的诗词吧。看你能猜中多少，猜完之后还能传给别人猜哦！</article>
				</div>

				<div className='zmiti-chosse-btns'>
					<aside onTouchTap={this.entryMain.bind(this)}><img src={'./assets/images/'+(this.state.entryMain?'c-read1':'c-read')+'.png'}/></aside>
					<aside onTouchTap={this.entryMainGuess.bind(this)}><img src={'./assets/images/'+(this.state.entryMainGuess?'c-guess1':'c-guess')+'.png'}/></aside>
				</div>
				<img onTouchTap={this.entryUser.bind(this)} className='zmiti-chosse-my-record' src='./assets/images/c-record.png'/>
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
			showMainUI:-1,
			entryMainGuess:true
		});
		setTimeout(()=>{
			let {obserable} = this.props;
			obserable.trigger({
				type:'hideMainContent',
				data:'guess'
			});
		},400)
	}

	entryMain(){//
		this.setState({
			showMainUI:-1,
			entryMain:true
		});
		setTimeout(()=>{
			let {obserable} = this.props;
			obserable.trigger({
				type:'hideMainContent'
			})
		},400);
	}

	componentDidMount() {
		let {obserable} = this.props;
		obserable.on('entryChooseApp',()=>{
			this.setState({
				showMainUI:0
			});
		});
	}
}
export default PubCom(ZmitiChooseApp);