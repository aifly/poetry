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
					<div onTouchTap={this.entryUser.bind(this)}  className='zmiti-order-btn'>
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

	entryUser(){
		let {obserable} = this.props;
		obserable.trigger({
			type:'toggleUserCenter',
			data:true
		});
		obserable.trigger({
			type:'toggleUser',
			data:true
		});
		var s = this;
		$.ajax({
			url:'http://api.zmiti.com/v2/weixin/get_userrank/',
			data:{
				wxopenid:s.props.openid
			},
			error(){
				alert('服务器返回错误');
			},
			success(data){
				if(data.getret === 0){
					obserable.trigger({
						type:'setIntegralRank',
						data:{
							integral:data.integral,
							rank:data.rank
						}
					})
				}else{
					alert('getret  : '+ data.getret + ' msg : ' + data.getmsg);	
				}
			}
		})
	}
	componentDidMount() {
		var {IScroll,obserable}= this.props;

		obserable.on('getScale',(data)=>{
			this.setState({
				scale:data
			})
		});

		obserable.on('showMainUI',()=>{
			this.setState({
				showMainUI:true
			},()=>{
				this.scroll = new IScroll(this.refs['zmiti-share-scroll'],{
					scrollbars:true
				});
				setTimeout(()=>{
					this.scroll.refresh();
				},200);
			});
		})

	}
}
export default PubCom(ZmitiShareApp);