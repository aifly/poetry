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
			entryShare:false,
			id:'',
			level:-1,
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
							{this.state.level !== -1 && <img src={'./assets/images/score-bg'+this.state.level+'.png'}/>}
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
						duration:s.props.duration,
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

							var id = data.id;
							/*obserable.trigger({
								type:'updateParentInfo',
								data:{
									id,
									parentWxopenId:s.props.openid
								}
							});*/

							s.setState({
								id
							},()=>{
								setTimeout(()=>{
					   				s.wxConfig(s.props.data.shareTitle,s.props.data.shareDesc,s.props.data.shareImg,s.props.wxappid);
					   			},500)
							});

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
						   		success(data){
						   			
						   			if(data.getret === 0){
						   				
						   				obserable.trigger({
							   				type:'updateIntegral',
							   				data:score
							   			});

							   			
						   			} 
						   			
						   		}
							})
							
						}
						
					}
				})
		    }
		});


		/**/
	}

	 changeURLPar(destiny, par, par_value) { 
		var pattern = par+'=([^&]*)'; 
		var replaceText = par+'='+par_value; 
		if (destiny.match(pattern)) { 
			var tmp = '/\\'+par+'=[^&]*/'; 
			tmp = destiny.replace(eval(tmp), replaceText); 
			return (tmp); 
		} 
		else { 
			if (destiny.match('[\?]')) { 
				return destiny+'&'+ replaceText; 
			} 
			else { 
				return destiny+'?'+replaceText; 
			} 
		} 
		return destiny+'\n'+par+'\n'+par_value; 
	} 

	wxConfig(title,desc,img,appId='wxfacf4a639d9e3bcc',worksid=this.props.worksid){
			var s = this;

		   var durl = location.href.split('#')[0];//+symbol+'id='+this.state.id+'&wxopenid='+ this.props.openid; //window.location;
		   	durl = s.changeURLPar(durl,'id',s.state.id);
		   	durl = s.changeURLPar(durl,'wxopenid',s.props.openid);

		   		//durl = durl + symbol + 'id=' + s.state.id + '&wxopenid=' + s.props.openid;
		        var code_durl = encodeURIComponent(durl);
				/*if (s.props.id && s.props.parentWxopenId) {
					
				}*/

				alert(s.props.openid)

				
			$.ajax({
				type:'get',
				url: "http://api.zmiti.com/weixin/jssdk.php?type=signature&durl="+code_durl+"&worksid="+worksid,
				dataType:'jsonp',
				jsonp: "callback",
			    jsonpCallback: "jsonFlickrFeed",
			    success(data){
			    	wx.config({
							    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
							    appId:appId, // 必填，公众号的唯一标识
							    timestamp:'1488558145' , // 必填，生成签名的时间戳
							    nonceStr: 'Wm3WZYTPz0wzccnW', // 必填，生成签名的随机串
							    signature: data.signature,// 必填，签名，见附录1
							    jsApiList: [ 'checkJsApi',
											'onMenuShareTimeline',
											'onMenuShareAppMessage',
											'onMenuShareQQ',
											'onMenuShareWeibo',
											'hideMenuItems',
											'showMenuItems',
											'hideAllNonBaseMenuItem',
											'showAllNonBaseMenuItem',
											'translateVoice',
											'startRecord',
											'stopRecord',
											'onRecordEnd',
											'playVoice',
											'pauseVoice',
											'stopVoice',
											'uploadVoice',
											'downloadVoice',
											'chooseImage',
											'previewImage',
											'uploadImage',
											'downloadImage',
											'getNetworkType',
											'openLocation',
											'getLocation',
											'hideOptionMenu',
											'showOptionMenu',
											'closeWindow',
											'scanQRCode',
											'chooseWXPay',
											'openProductSpecificView',
									] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
							});

			    	wx.ready(()=>{
			    				//朋友圈
	                    wx.onMenuShareTimeline({
	                        title: title, // 分享标题
	                        link: durl, // 分享链接
	                        imgUrl: img, // 分享图标
	                        desc: desc,
	                        success: function () { },
	                        cancel: function () { }
	                    });
	                    //朋友
	                    wx.onMenuShareAppMessage({
	                        title: title, // 分享标题
	                        link: durl, // 分享链接
	                        imgUrl: img, // 分享图标
	                        type: "link",
	                        dataUrl: "",
	                        desc: desc,
	                        success: function () {
	                        },
	                        cancel: function () { 
	                        }
	                    });
	                    //qq
	                    wx.onMenuShareQQ({
	                        title: title, // 分享标题
	                        link: durl, // 分享链接
	                        imgUrl: img, // 分享图标
	                        desc: desc,
	                        success: function () { },
	                        cancel: function () { }
	                    });
			    	});
			    }
			});
		 
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
				},500);
				var level = 4;
				if(data > 40){
					level = 3;
				}
				if(data > 60){
					level = 2;
				}
				if (data > 80){
					level = 1;
				}
				this.setState({
					level
				})
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