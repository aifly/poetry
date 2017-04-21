import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import ZmitiHeaderApp from '../components/public/zmiti-header.jsx'
import $ from 'jquery';

class ZmitiShareApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			showMask:false,
			scale:0,
			showMainUI:false
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {
		var headerProps = {
			showRefreshBtn:false
		}

		var maskStyle ={
			background:'url(./assets/images/arron1.png) no-repeat center  top / cover',
			height:this.viewH + 20

		};
		return (
			<div className={'zmiti-share-main-ui '+(this.state.showMainUI?'show':'')} ref='zmiti-share-scroll'>
				<div>
					<ZmitiHeaderApp {...this.props} {...headerProps}></ZmitiHeaderApp>
					<div className='zmiti-order-btn'>
						<span></span>
						<span></span>
						<span></span>
						<label>排行榜</label>
					</div>
					<div className='zmiti-share-forecast'>
						<img src='./assets/images/benjun.png'/>
					</div>
					<div className='zmiti-share-pre'>{this.state.scale}<img src='./assets/images/pre.png'/></div>
					<div className='zmiti-share-send'><img src='./assets/images/send.png'/></div>
					<section onTouchTap={()=>{this.setState({showMask:true})}} className='zmiti-share-btn zmiti-btn' style={{backgroundColor:this.props.theme.backgroundColor}}>
						看看大家能猜出来吗
					</section>
					<section className='zmiti-read-other'>想看看谁读了诗吗，点击<span>左上角头像</span></section>
					{this.state.showMask && <div onTouchStart={()=>{this.setState({showMask:false})}} className='zmiti-mask' style={maskStyle}></div>}
				</div>
			</div>
		);
	}
	componentDidMount() {
		var {IScroll,obserable}= this.props;
		this.scroll = new IScroll(this.refs['zmiti-share-scroll'],{
			scrollbars:true
		});
		setTimeout(()=>{
			this.scroll.refresh();
		},200);

		obserable.on('getScale',(data)=>{
			this.setState({
				scale:data
			})
		});

		obserable.on('showMainUI',()=>{
			this.setState({
				showMainUI:true
			});
		})

	}
}
export default PubCom(ZmitiShareApp);