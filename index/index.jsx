import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';

import ZmitiHeaderApp from '../components/public/zmiti-header.jsx'

class ZmitiIndexApp extends Component {
	constructor(props) {
		super(props);
		this.state={
		
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

		var s = this;
		s.state.poetryContent = s.props.poetryContent.replace(/>amp;nbsp;/g,'').replace(/\n/ig,'<br/>');

		return (
			<div className={'zmiti-index-main-ui '+ (this.props.isEntryResult?'hide':'')}>
				 <ZmitiHeaderApp {...this.props}></ZmitiHeaderApp>
				 <div className='zmiti-poetry-C' style={poetryStyle}>
				 	 <section>
				 	 	<div className='zmiti-poetry-title'>{this.props.poetryTitle}</div>
				 	 	<div className='zmiti-poetry-author'>{this.props.poetryAuthor}</div>
					 	<article className={'zmiti-poetry-content '+(this.props.id&& this.props.parentWxopenId ? 'zmiti-custom-text':'')} dangerouslySetInnerHTML={this.createMarkup()}>
					 	</article>
				 	 </section>
				 </div>
				 <div className='zmiti-bottom-ui'>
				 	{!this.state.isBeginRead && <div className='zmiti-tips' style={{background:'url(./assets/images/tip-bg.png) no-repeat center'}}>
				 					 		读这首诗，送给ta
				 					 	</div>}
				 	{this.state.isBeginRead && <div className='zmiti-voice'>
				 					 		<img src='./assets/images/voice.gif'/>
				 					 		<div>录音时长还剩{60- this.props.duration}s</div>
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


		let {obserable} = this.props;
		var s = this;
		if(!this.state.isBeginRead){
			wx.startRecord({
				success(){
					this.timer = setInterval(()=>{

					if(60- this.props.duration<=0){
						//录音时间结束.进入结果页面
						s.stopRecord();
						return;
					}

					obserable.trigger({
						type:'countdownDuration'
					});
				},1000)
				/*obserable.trigger({
					type:'entryResult'
				})*/
				},
				cancel(){
					s.cancelRecord = true;
				}
			});//开始朗读
			
		}
		else{
			!s.cancelRecord && s.stopRecord();
		}
		this.setState({
			isBeginRead:!this.state.isBeginRead
		});
	}

	stopRecord(){
		let {obserable} = this.props;

		var s = this;//结束朗读
		clearInterval(s.timer);
		wx.stopRecord({
			fail(){
				alert('end error');
			},
			success: function (res) {

				
				s.localId =	res.localId;
				obserable.trigger({
					type:'getLocalId',
					data:s.localId
				});
				//开始转文字。
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

				    	var poetryContent = s.props.poetryContent.replace(/[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/ig,'');

				    	var dataArr = res.translateResult.replace(/[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/ig,'').split('');
						//dataArr.length = poetryContent.length;
						var rightWords = 0;

						var resultHtml = '';
						var score = 0;
						dataArr.map((da,k)=>{

							if(poetryContent.indexOf(da)>-1){
								rightWords++;
								resultHtml += '<span style="color:green">'+da+'</span>'
							}else{
								resultHtml+=da;
							}
						});

						var score  =( rightWords / poetryContent.length * 100 ) | 0;
						if(res.translateResult.length > poetryContent.length && score>=100 ){
							score  = 99;
						}
						obserable.trigger({type:'updateScore',data:score});
				    	obserable.trigger({
				    		type:'getTransformResult',
				    		data:resultHtml
				    	});



						obserable.trigger({
							type:'entryResult',
							data:true
						});
				    }
				});
			} 
		});
	}
	componentDidMount() {
		
	}
}
export default PubCom(ZmitiIndexApp);