import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';
import ZmitiHeaderApp from '../components/public/zmiti-header.jsx'
import ZmitiAudioApp from '../components/public/zmiti-audio.jsx'
class ZmitiResultApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			transformText:'新品如传闻一般加入了后置双摄、四曲面陶瓷机身等特性。值得注意的是，小米6最低起售价2499元，这是从2011年开始“小米X”系列首次上调起售价格。',
			score:'',
			entryShare:false
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {


		var headerProps = {
			showRefreshBtn:false
		}
		return (
			<div className={'zmiti-result-main-ui ' + (this.props.isEntryResult?'show':'') + (this.state.entryShare?' hide':'')}>
				<article className='zmiti-result-scroll' ref='zmiti-result-scroll' style={{height:this.viewH}}>
					<div style={{paddingBottom:30}}>
						<ZmitiHeaderApp {...this.props} {...headerProps}></ZmitiHeaderApp>
						<div className='zmiti-score-C'>
							<span>{this.state.score}</span>
							<img src='./assets/images/score-bg1.png'/>
						</div>
						<div className='zmiti-transform-C' dangerouslySetInnerHTML={this.createMarkup()}>
							
						</div>
						<section className='zmiti-tip'>
							以上是语音转文字
						</section>
						<ZmitiAudioApp {...this.props}></ZmitiAudioApp>
						<section onTouchTap={this.submit.bind(this)} className='zmiti-submit-btn zmiti-btn' style={{backgroundColor:this.props.theme.backgroundColor}}>
							满意，我要提交
						</section>
						<section className='zmiti-reset' onTouchTap={this.backToIndex.bind(this)}>
							不满意，再录一遍
						</section>
					</div>
				</article>
			</div>
		);
	}

	submit(){
		let {obserable} = this.props;
		var s = this;
		wx.uploadVoice({
		    localId:s.props.audioSrc, // 需要上传的音频的本地ID，由stopRecord接口获得
		    isShowProgressTips: 1, // 默认为1，显示进度提示
		    fail(){
		    	alert('上传失败');
		    },
	        success: function (res) {
		        var serverId = res.serverId; // 返回音频的服务器端ID
		        obserable.trigger({
					type:'showMainUI'
				});
				s.setState({
					entryShare:true
				});
				$.ajax({
					url:'http://api.zmiti.com/v2/weixin/post_shiciresult/',
					type:'post',
					data:{
						worksid:s.props.worksid,
						workdataid:s.props.workdataid,
						wxopenid:s.props.openid,
						parentwxopenid:s.props.parentwxopenid,
						mediaid:serverId,
						score:s.state.score,
						changetext:s.props.transformResult.replace(/<[^>]+>/g,""),
						usercity:s.props.usercity,
						longitude:s.props.longitude,
						latitude:s.props.latitude,
						wxname:s.props.nickname,
						workdatatitle:s.props.poetryTitle
					},
					error(){
						alert('post_shiciresult error 接口错误');
					},
					success(data){
						if( data.getret === 0){
							var score = 10;
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
						   			integral:score
						   		},
						   		error(){
						   			alert('add_wxuser 服务器返回错误');
						   		},
						   		success(){
						   			obserable.trigger({
						   				type:'updateIntegral',
						   				data:score
						   			})
						   		}
							})
							
						}
						
					}
				})
		    }
		});


		/**/
	}

	createMarkup(){
		 return {__html:  this.props.transformResult};
	}

	backToIndex(){
		let {obserable} = this.props;
		obserable.trigger({type:'entryResult',data:false})
	}



	componentDidMount() {
		var {obserable,IScroll} = this.props;
		obserable.on('updateScore',(data)=>{
			this.setState({
				score: data
			},()=>{
				setTimeout(()=>{
					this.scroll.refresh();
				},500)
			});
			obserable.trigger({
				type:'getScale',
				data:data+(Math.random()*4|0+1)
			})
		});

		this.scroll = new IScroll(this.refs['zmiti-result-scroll'],{
			scrollbars:true
		});

		setTimeout(()=>{
			this.scroll.refresh();
		},800)
	}
}
export default PubCom(ZmitiResultApp);