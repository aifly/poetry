import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';
import ZmitiAudioApp from '../components/public/zmiti-audio.jsx';

import ZmitiHeaderApp from '../components/public/zmiti-header.jsx'

class ZmitiShareOpenApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			isBeginRead:false,
			poetryContent:'',
			showPoetry:false,
			showConfirm:false,
			pause:true
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {

		var poetryStyle ={
			background:'url(./assets/images/main-bg1.png) no-repeat center bottom '
		}

		var s = this;
		s.state.poetryContent = s.props.poetryContent.replace(/>amp;nbsp;/g,'').replace(/\n/ig,'<br/>');

		return (
			<div style={{height:this.viewH,overflow:'hidden'}} ref='zmiti-shareopen-main-ui' className={'zmiti-shareopen-main-ui '+ (this.props.isEntryResult?'hide':'')}>
				 <div style={{paddingBottom:100}}>
				 	<ZmitiHeaderApp showRefreshBtn={false} {...this.props}></ZmitiHeaderApp>
					 <div className='zmiti-poetry-C' style={poetryStyle}>
					 	 <section>
					 	 	
						 	{this.state.showPoetry&&<div>
						 		
							 	<div className='zmiti-poetry-title'>{this.props.poetryTitle}</div>
						 	 	<div className='zmiti-poetry-author'>{this.props.poetryAuthor}</div>
						 	 	<div className='zmiti-yuanwen'><img src='./assets/images/yuanwen.png'/></div>
							 	<article className={'zmiti-poetry-content '} dangerouslySetInnerHTML={this.createMarkup()}>
							 	</article>

							 	<div className='zmiti-shareopen-line'></div>
							 	 <div className='zmiti-poetry-title zmiti-user-title'>
 							 		{this.props.userPoetryTitle} {this.props.userPoetryAuthor}
 							 	    <span className='zmiti-poetry-user-voice' onTouchTap={this.playAudio.bind(this)}><img src={'./assets/images/pause.'+(this.state.pause?'png':'gif')+''}/></span>
 							 	</div>
						 	</div>}
						 	

						 	{!this.state.showPoetry &&
						 		<div>
						 			<div className='zmiti-poetry-title zmiti-user-title'>
								 		{this.props.userPoetryTitle} 
								 		<section  className='zmiti-voice-content'><ZmitiAudioApp {...this.props} className='zmiti-audio-custom'></ZmitiAudioApp></section>
								 	</div>
								 	<div className='zmiti-poetry-text'>
	 							 		<span className='zmiti-text-overflow'>{this.props.userPoetryAuthor}</span>
	 							 		<img src='./assets/images/text.png'/>
	 							 	</div>
						 		</div>
						 	 }
						 	
					 	 	
						 	<article className={'zmiti-poetry-content '+(this.props.id&& this.props.parentWxopenId ? 'zmiti-custom-text':'')}>
						 		{this.props.userPoetryContent}
						 	</article>
						 	<div className='zmiti-tip'>以上根据网友语音转化的文字</div>
					 	 </section>

					 </div>
					 <div  className='zmiti-open-poetry'><img onTouchStart={this.showConfirm.bind(this)} src='./assets/images/openpeotry.png'/></div>
					 
					 <div className='zmiti-bottom-ui'>
					 
					 	{this.state.isBeginRead && <div className='zmiti-voice'>
					 					 		<img src='./assets/images/voice.gif'/>
					 					 		<div>录音时长还剩{60- this.props.duration}s</div>
					 					 	</div>}
					 	<section style={{backgroundColor:this.props.theme.backgroundColor}} onTouchTap={this.beginRead.bind(this)} className='zmiti-btn zmiti-begin-read'>
					 		{this.state.isBeginRead?'点击结束朗读':'秒懂，开始阅读原诗'}
					 	</section>
					 	<section className='zmiti-shareopen-bottom-btngroup'>
					 		<aside>
					 			<div className='zmiti-reload-poetry' onTouchTap={this.beginRefreshPoetry.bind(this)}>
					 				<img className={this.state.isRefresh?'zmiti-rotate':''} src='./assets/images/refresh.png'/>
					 				重新出题
					 			</div>
					 		</aside>
					 		<aside>
								<div className='zmiti-reload-poetry' onTouchTap={this.gruessOther.bind(this)}>
									<img className={this.state.isRefresh?'zmiti-rotate':''} src='./assets/images/refresh.png'/>
									猜别的
								</div>				 			
					 		</aside>
					 	</section>
					 </div>
					 <section className='zmiti-seal'>
					 	<img src='./assets/images/seal.png'/>
					 </section>

					  {this.state.showConfirm && <section className='zmiti-confirm-C'>
					  					 	<section className='zmiti-confirm-content'>
					  					 		<header><img src='./assets/images/tip.png'/></header>
					  					 		<section className='zmiti-confirm-score'><span>10</span>积分</section>
					  					 		<section className='zmiti-confirm-my-score'>我当前的积分<img src='./assets/images/user/currency.png'/>{this.props.score}</section>
					  					 		<section className='zmiti-confirm-btns'>
					  					 			<aside className={this.state.closeConfirm?'active':''} onTouchTap={this.closeConfirm.bind(this)}>再想想</aside>
					  					 			<aside onTouchTap={this.showPoetry.bind(this)}>确定</aside>
					  					 		</section>
					  					 	</section>
					  					 </section>}
				 </div>
				 <div className={'zmiti-msg '+ ( this.state.showMsg ? 'active':' ')}>{this.state.msg || '您的积分不够/(ㄒoㄒ)/~~'}</div>
			</div>
		);
	}


	playAudio(){
		var s = this;
		if(this.state.pause ){
			this.setState({
				pause:false
			},()=>{
				wx.playVoice({
				    localId: s.props.audioSrc
				});	
				wx.onVoicePlayEnd({
				    success: function (res) {
				        var localId = res.localId; // 返回音频的本地ID
				        s.setState({
							pause:true
						});
					    }
					});
			})
		}
	}


	showConfirm(){
		this.isShowPoetry = this.isShowPoetry === undefined ? false : true;
		if(this.isShowPoetry){
			return;
		}
		this.setState({
			showConfirm:true
		});

	}
	closeConfirm(){
		this.setState({
			closeConfirm:true
		});
		setTimeout(()=>{
			this.setState({
				closeConfirm:false,
				showConfirm:false
			});
			this.isShowPoetry = undefined;
		},150);

	}
	showPoetry(){

		if(this.props.score < 10){//积分不够
			this.setState({
				showMsg:true
			});

			setTimeout(()=>{
				this.setState({
					showMsg : false
				});
			},2000);
			return;
		}
		
		this.setState({
			showPoetry:true,
			showConfirm:false
		},()=>{

			this.scroll.refresh();
		});
		let {obserable} = this.props;

		var s = this;
		$.ajax({
	   		url:'http://api.zmiti.com/v2/weixin/add_wxuser/',
	   		type:'post',
	   		data:{
	   			wxopenid:s.props.openid,
	   			worksid:s.props.worksid,
	   			nickname:s.props.nickname,
	   			headimgurl:s.props.headimgurl,
	   			longitude:s.props.longitude,
	   			latitude:s.props.latitude,
	   			accuracy:s.props.accuracy,
	   			wxappid:s.props.wxappid,
	   			integral:-10
	   		}
	   	}).done((data)=>{
	   		if(data.getret === 0){
	   			obserable.trigger({
	   				type:'updateIntegral',
	   				data:-10
	   			})
	   		}
	   	},()=>{
	   	});
	}

	gruessOther(){
		let {obserable} = this.props;
		obserable.trigger({
			type:'refreshPoetry',
			data:{
				type:'custom',
				isOther:true
			}
		});
		this.isShowPoetry = undefined;
		this.setState({
			showPoetry:false
		},()=>{
			this.scroll.refresh();
		});

		
	}

	beginRefreshPoetry(){ //重新出题
		let {obserable} = this.props;
		 
		obserable.trigger({
			type:'refreshPoetry',
			data:{
				type:'poetry',
				isOther:false
			}
		});

	}

	createMarkup(){
		 return {__html:  this.state.poetryContent};
	}

	beginRead(){


		let {obserable} = this.props;
		var s = this;
		if(!this.state.isBeginRead){
			try{
				wx.startRecord();//开始朗读
				 
			}
			catch(e){
			 	window.debug && alert('开始录音了 + error')
			}
			
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
		}
		else{
			s.stopRecord();
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
				window.debug && alert('end error');
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
				     	window.debug && alert('转文字失败，请重新再试');
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
		let {IScroll } = this.props;
		this.scroll = new IScroll(this.refs['zmiti-shareopen-main-ui'],{
			scrollbars:true
		});
		setTimeout(()=>{
			this.scroll.refresh();
		},1000)
	}
}
export default PubCom(ZmitiShareOpenApp);