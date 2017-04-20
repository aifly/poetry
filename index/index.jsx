import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';

import ZmitiHeaderApp from '../components/public/zmiti-header.jsx'

class ZmitiIndexApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			audioSrc:'',//当前的录音
			isBeginRead:false,
			poetryContent:''
			
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {

		var poetryStyle ={
			background:'url(./assets/images/main-bg.jpg) no-repeat center bottom '
		}

		return (
			<div className='zmiti-index-main-ui'>
				 <ZmitiHeaderApp {...this.props}></ZmitiHeaderApp>
				
				 <div className='zmiti-poetry-C' style={poetryStyle}>
				 	 <article className='zmiti-poetry-content' dangerouslySetInnerHTML={this.createMarkup()}>
				 	 	
				 	 </article>
				 </div>
				 <div className='zmiti-bottom-ui'>
				 	{!this.state.isBeginRead && <div className='zmiti-tips' style={{background:'url(./assets/images/tip-bg.png) no-repeat center'}}>
				 					 		读这首诗，送给ta
				 					 	</div>}
				 	{this.state.isBeginRead && <div className='zmiti-voice'>
				 					 		<img src='./assets/images/voice.gif'/>
				 					 	</div>}
				 	<section style={{backgroundColor:this.props.theme.backgroundColor}} onTouchTap={this.beginRead.bind(this)} className='zmiti-btn zmiti-begin-read'>
				 		{this.state.isBeginRead?'点击结束朗读':'点击开始朗读'}
				 	</section>
				 </div>
				 <section className='zmiti-seal'>
				 	<img src='./assets/images/seal.png'/>
				 </section>
			</div>
		);
	}

	createMarkup(){
		 return {__html:  this.state.poetryContent};
	}

	beginRead(){

		if(this.state.isBeginRead){
			wx.startRecord();//开始朗读
		}
		else{
			var s = this;//结束朗读
			wx.stopRecord({
				fail(){
				},
				success: function (res) {
					s.localId =	res.localId;
					//开始转文字。
					var s = this;
					wx.translateVoice({
					    localId: s.localId, // 需要识别的音频的本地Id，由录音相关接口获得
					    isShowProgressTips: 1, // 默认为1，显示进度提示
					    fail(){
					    	s.setState({
					    		isBeginRead:false
					    	});
					    	alert('转文字失败，请重新再试');

					    },
					    success: function (res) {//转成功了。
					    	s.setState({
					    		audioSrc:s.localId,
					    		result:res.translateResult
					    	});
					    }
					});
				} 
			});
		}
		this.setState({
			isBeginRead:!this.state.isBeginRead
		});
		
	}


	componentDidMount() {
		var s = this;
		s.state.poetryContent = s.props.poetryContent.replace(/>amp;nbsp;/g,'');
		s.forceUpdate();
	}
}
export default PubCom(ZmitiIndexApp);