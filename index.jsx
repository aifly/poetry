import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import $ from 'jquery';
injectTapEventPlugin();
import IScroll from 'iscroll';
import './assets/css/index.css';

import Obserable from './components/public/obserable.js';

var obserable = new Obserable();

import ZmitiIndexApp from './index/index.jsx';
import ZmitiShareOpenApp from './shareopen/index.jsx';
import ZmitiResultApp from './result/index.jsx';
import ZmitiShareApp from './share/index.jsx';
import ZmitiCoverApp from './cover/index.jsx';
import ZmitiChooseApp from './choose/index.jsx';
import ZmitiUserApp from './user/index.jsx';

import ZmitiLoadingApp from './loading/index.jsx';
export class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hideMainContent:true,
			isFirst:false,//是否是从新开始的
			audioSrc:'',//当前录音的id
			showUI:false,
			showShareOpen:false,
			score:0,//积分
			openid:'',
			wxappid:'',
			worksid:'5296019810',	
			nickname:'',
			headimgurl:'',
			duration:0,//录音时长。
			transformResult:'',
			latitude:'',
			longitude:'',
			usercity:'',
			poetryTitle:'',
			id:'',//6NPqiCFidf
			parentWxopenId:'',//oSDVUs5MkTw7MxaXPu0KsflRfSqM
			poetryAuthor:'',
			poetryContent:'',
			userPoetryTitle:'',
			userPoetryAuthor:'',
			userPoetryContent:'',//原诗
			
			data:{
				shareTitle:'智媒体测试',
				shareDesc:'智媒体诗词解密测试',
				shareImg:'http://h5.zmiti.com/public/silk/assets/images/300.jpg',
				shareUrl:'',
			},
			isEntryResult:false,
			theme:{
				backgroundColor:'#4a5265'
			}
		}
		this.viewH = document.documentElement.clientHeight;
		this.defaultShareUrl = '';
		this.code = this.getQueryString('code');
	}
	render() {
		var data = {
			obserable,
			IScroll
		}
		var auothStyle = {
			background:'url(./assets/images/auoth.jpg) no-repeat center bottom / cover'
		}
		var zmiti = this.getQueryString('zmiti') === 'start';
		var s = this;
		var id = s.getQueryString('id'),
			parentWxopenId  = s.getQueryString('wxopenid');



		return (
			<div className={'zmiti-main-ui show'} style={{height:this.viewH}}>
				{this.state.code || true && <div>
									<section className={'zmiti-main-C '+(this.state.showUser?'hide':'')}>
									{this.state.isFirst &&<ZmitiCoverApp {...this.state} {...data}></ZmitiCoverApp>}
									{this.state.isFirst && <ZmitiChooseApp {...this.state} {...data}></ZmitiChooseApp>}
									<section className={'zmiti-main-content '+(this.state.isFirst && this.state.hideMainContent?'hide':'')}>
											{!(this.state.id && this.state.parentWxopenId || this.state.showShareOpen) && <ZmitiIndexApp {...this.state} {...data}></ZmitiIndexApp>}
											{(this.state.id && this.state.parentWxopenId || this.state.showShareOpen) && <ZmitiShareOpenApp {...this.state} {...data}></ZmitiShareOpenApp>}
											<ZmitiResultApp {...this.state} {...data}></ZmitiResultApp>
											<ZmitiShareApp {...this.state} {...data}></ZmitiShareApp>
										</section>
									</section>
									<ZmitiUserApp {...this.state} {...data}></ZmitiUserApp>
								</div>}
				{!this.state.code && false && <div className='zmiti-auoth-page' style={auothStyle}></div>}
			</div>
		);
	}

	startRecord(){
		wx.startRecord();
		this.setState({
			msg:'开始录音...'
		});
	}

	translateVoice(){//识别录音
		var s = this;
		wx.translateVoice({
		    localId: s.localId, // 需要识别的音频的本地Id，由录音相关接口获得
		    isShowProgressTips: 1, // 默认为1，显示进度提示
		    success: function (res) {
		    	s.setState({
		    		result:res.translateResult
		    	});
		    }
		});
	}
	stopRecord(){
		var s = this;
		
		wx.stopRecord({
			fail(){
			},
			success: function (res) {
				s.localId =	res.localId;
				s.setState({
					msg:'结束录音...',
					audioSrc:s.localId
				});
			} 
		});
			
	}
	playVoice(){
		var s = this;
		wx.playVoice({
		    localId: s.localId
		});
		this.setState({
			msg:'开始播放录音'
		})
	}
	pauseVoice(){
		var s = this;
		wx.pauseVoice({
		    localId: s.localId
		});
		this.setState({
			msg:'暂停播放录音'
		})
	}
	stopVoice(){
		var s = this;
		wx.stopVoice({
		    localId: s.localId
		});
		this.setState({
			msg:'停止播放录音'
		});
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


    getPos(nickname,headimgurl){

    	var s = this;
    	 $.ajax({
        	url:`http://restapi.amap.com/v3/geocode/regeo?key=10df4af5d9266f83b404c007534f0001&location=${wx.posData.longitude},${wx.posData.latitude}&poitype=&radius=100&extensions=base&batch=false&roadlevel=1`+'',
			type:'get',
			error(){

			},
			success(data){
				if(data.status === '1' && data.infocode === '10000'){
					
					var addressComponent = data.regeocode.addressComponent;
					var opt = {
				   		type:'map',
				   		address:(addressComponent.city[0]||addressComponent.province)+addressComponent.district,
				   		pos:[wx.posData.longitude,wx.posData.latitude],
				   		nickname:nickname,
				   		headimgurl:headimgurl
				   	}

				   	s.setState({
				   		nickname,
				   		headimgurl,
				   		showUI:true,
				   		latitude:wx.posData.latitude,
				   		longitude:wx.posData.longitude,
				   		usercity:(addressComponent.city[0]||addressComponent.province)+addressComponent.district
				   	});

				   	$.ajax({
				   		url:'http://api.zmiti.com/v2/weixin/add_wxuser/',
				   		type:'post',
				   		data:{
				   			wxopenid:s.openid,
				   			worksid:s.state.worksid,
				   			nickname:nickname,
				   			headimgurl:headimgurl,
				   			longitude:wx.posData.longitude,
				   			latitude:wx.posData.latitude,
				   			accuracy:wx.posData.accuracy,
				   			wxappid:s.state.wxappid,
				   			integral:localStorage.getItem('nickname')?0:10
				   		},
				   		error(){
				   			alert('add_wxuser: 服务器返回错误');
				   		},
				   		success(data){
				   			if(data.getret === 0){

				   				$.ajax({
									url:'http://api.zmiti.com/v2/weixin/get_wxuserdetaile',
									data:{
										wxopenid:s.openid
									},
									success(data){
										if(data.getret === 0){
											
											s.score = data.wxuserinfo.totalintegral;
											s.setState({
												score:s.score
											});
										}else{
											alert('get_wxuserdetaile : getret  : '+ data.getret + ' msg : ' + data.getmsg);	
										}
									}
								})

				   			}else{
				   				alert('getret  : '+ data.getret + ' msg : ' + data.getmsg+ ' .....');
				   			}
				   		}
				   	});

				   	//获取用户积分
					//
					

			   		$.ajax({
						url:'http://api.zmiti.com/v2/msg/send_msg/',
						data:{
							type:'publish',
							content:JSON.stringify(opt),
							to:opt.to||''
						},
						success(data){
							s.state.showUI = true;
							s.forceUpdate();
							//console.log(data);
						}
					})
				}
				else{
					alert('地址信息获取失败')
				}
			}						        	
        })
    }

	wxConfig(title,desc,img,appId='wxfacf4a639d9e3bcc',worksid=this.state.worksid){
			var s = this;

		   var durl = window.location.href.split('#')[0]; //window.location;
		   
		   var symbol = durl.indexOf('?')>-1?'&':'?';
		   	//durl = durl.replace(/id/ig,'zmiti-id').replace(/wxopenid/ig,'zmiti-openid');
		   		if(durl.indexOf('&code')>-1||durl.indexOf('?code')>-1){
		   			//durl = this.changeURLPar(durl,'code','""');	
		   		}
		     	//durl = this.changeURLPar(durl,'zmiti','end');
		   //	durl = this.changeURLPar(durl,'wxopenid','');
		        var code_durl = encodeURIComponent(durl);
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
			    		wx.getLocation({
						    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
						    fail(){
						    },
						    success: function (res) {
						        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
						        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
						        var speed = res.speed; // 速度，以米/每秒计
						        var accuracy = res.accuracy; // 位置精度

						        wx.posData = {
						        	longitude,
						        	latitude,
						        	accuracy
						        };
						        if((s.nickname || s.headimgurl) && s.openid){
						        	s.getPos(s.nickname,s.headimgurl);
						        }
						       
						    }
						});
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
  
	isWeiXin(){
	    var ua = window.navigator.userAgent.toLowerCase();
	    return ua.match(/MicroMessenger/i) == 'micromessenger';
    }

    getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return (r[2]);
        return null;
    }


	componentDidMount() {

		var s = this;
		var id = s.getQueryString('id'),
			parentWxopenId = s.getQueryString('wxopenid'),
			code = s.getQueryString('code'),
			zmiti = s.getQueryString('zmiti');


		this.setState({
			isFirst: !(id && parentWxopenId) ,//!(id && parentWxopenId),
			id,
			parentWxopenId,
			code,
			showShareOpen:id && parentWxopenId,
			zmiti
		});


		$.getJSON('./assets/js/data.json', (d)=> {


			s.wxappid = d.wxappid;

			this.state.worksid = d.worksid;
			this.state.wxappid = d.wxappid;

			this.state.data.shareUrl = d.viewpath;
			this.defaultShareUrl = d.viewpath;


			var redirect_uri = s.defaultShareUrl;
			var symbol = redirect_uri.indexOf('?') > -1 ? '&' : '?';
			if (s.state.id && s.state.parentWxopenId) {
				redirect_uri = redirect_uri + symbol + 'id=' + s.state.id + '&wxopenid=' + s.state.parentWxopenId;
			}
			
			symbol = redirect_uri.indexOf('?') > -1 ? '&' : '?';
			if (!s.getQueryString('zmiti')) {
				redirect_uri += symbol + 'zmiti=start';
			}
			$.ajax({
				url: 'http://api.zmiti.com/v2/weixin/getoauthurl/',
				type: "post",
				data: {
					redirect_uri: redirect_uri,
					scope: 'snsapi_userinfo',
					worksid: s.state.worksid,
					state: new Date().getTime() + ''
				},
				error(){
					alert('error');
				},
				success(dt){
					if (dt.getret === 0) {
						var url = dt.url;
						if (url.indexOf('&zmiti') <= -1 || url.indexOf('?zmiti') <= -1) {
							url = url.split('#')[0] + '&zmiti=start#' + (url.split('#')[1] || '')
						}
						
						s.oauthurl = dt.url;
						localStorage.setItem('oauthurl',s.oauthurl);
						
					}
				}
			})

			this.wxConfig(this.state.data.shareTitle, this.state.data.shareDesc, this.state.shareImg, this.state.wxappid);
			this.forceUpdate(()=> {
				$.ajax({
					url: 'http://api.zmiti.com/v2/weixin/getwxuserinfo/',
					data: {
						code: s.getQueryString('code'),
						wxappid: d.wxappid,
						wxappsecret: d.wxappsecret
					},
					error(){
						alert('error')
					},
					success(dt){

						if (dt.getret === 0) {
							$.ajax({
								url: 'http://api.zmiti.com/v2/works/update_pvnum/',
								data: {
									worksid: s.state.worksid
								},
								success(data){
									if (data.getret === 0) {
									}
								}
							});
							localStorage.setItem('nickname', dt.userinfo.nickname);
							localStorage.setItem('headimgurl', dt.userinfo.headimgurl);
							s.nickname = dt.userinfo.nickname;
							s.headimgurl = dt.userinfo.headimgurl;

							s.openid = dt.userinfo.openid;
							s.setState({
								openid: s.openid,
								nickname: s.nickname,
								headimgurl: s.headimgurl,
								code
							});

							if(id && parentWxopenId){
								s.refreshPoetry('custom',false);
							}

							if (wx.posData && wx.posData.longitude) {
								s.getPos(dt.userinfo.nickname, dt.userinfo.headimgurl);
							}
						}
						else {

							if (s.isWeiXin()) {
									
								var url = s.oauthurl || window.localStorage.getItem('oauthurl');
								//alert(url);
								window.location.href = url;


								//var redirect_uri = window.location.href.replace(/^code$/ig, 'zmiti');

								
							}
							else {
								//s.refreshPoetry();
								//alert('请在微信中打开');
							}
						}
					}
				});
			});
		});


		wx.onVoicePlayEnd({
			success: function (res) {
				s.setState({
					msg: '录音停止。'
				})
				//var localId = res.localId; // 返回音频的本地ID
			}
		});


		obserable.on('entryResult', (data)=> {
			this.setState({
				isEntryResult: data
			})
		});

		obserable.on('hideMainContent', (data)=> {
			this.setState({
				hideMainContent: false
			});
			this.guess = data || 'poetry';
			var s = this;
			if(data === 'guess'){
				$.ajax({
					url:'http://api.zmiti.com/v2/weixin/get_shicioriginaltext',
					data:{},
					success(data){
						if(data.getret === 0){
							if(data.list.length>0){
								console.log(data.list);
								s.state.userPoetryTitle = <img src={data.list[0].headimgurl} style={{width:60,borderRadius:'50%',marginBottom:20}}/>;
								s.state.userPoetryAuthor = data.list[0].nickname;
								s.state.userPoetryContent = data.list[0].changetext;
								s.state.poetryContent = data.list[0].originaltext;
								s.state.poetryTitle = data.list[0].workdatatitle;
								s.state.poetryAuthor = data.list[0].author;
								s.state.workdataid = data.list[0].workdataid;
								s.state.showShareOpen = true;
								s.forceUpdate();
							}
							else{
								alert('没有获取到诗词，请刷新重试');
							}
						}
					}
				})	
			}else{

				s.refreshPoetry('custom',false);
			}
			 
		})

		obserable.on('toggleUser', (data)=> {
			this.setState({
				showUser: data
			})
		});

		obserable.on('countdownDuration', ()=> {//录音倒计时
			this.setState({
				duration: this.state.duration + 1
			});
		});

		obserable.on('getLocalId', (data)=> {
			this.setState({
				audioSrc: data
			})
		});

		obserable.on('getTransformResult', (data)=> {
			this.setState({
				transformResult: data
			});
		});

		obserable.on('refreshPoetry', (data)=> {
			var data = data || {};
			this.refreshPoetry(data.type,data.isOther);
		});

		obserable.on('updateIntegral', (data)=> {
			this.setState({
				score: this.state.score + data
			}, ()=> {

			})
		})


		//this.connect();


	}

	refreshPoetry(type,isOther){
		var s = this;
		var type = type || 'poetry';

		if(type === 'custom'){//取用户读的内容.
			var params = {};
			if(!isOther && s.state.id && s.state.parentWxopenId){
				params = {
					id:s.state.id,
					wxopenid:s.state.parentWxopenId
				}
			}
			$.ajax({
				url:'http://api.zmiti.com/v2/weixin/get_shicioriginaltext',
				data:params,
				success(data){
					if(data.getret === 0){
						if(data.list.length>0){
							s.state.userPoetryTitle = <img src={data.list[0].headimgurl} style={{width:60,borderRadius:'50%',marginBottom:20}}/>;
							s.state.userPoetryAuthor = data.list[0].nickname;
							s.state.userPoetryContent = data.list[0].changetext;
							s.state.poetryContent = data.list[0].originaltext;
							s.state.poetryTitle = data.list[0].workdatatitle;
							s.state.poetryAuthor = data.list[0].author;
							s.state.workdataid = data.list[0].workdataid;
							s.forceUpdate();
						}
						else{
							alert('没有获取到诗词，请刷新重试');
						}
					}
				}
			})	
		}else{//取诗

			$.ajax({
				url:'http://api.zmiti.com/v2/weixin/get_shici/',
				data:{
					type:0,//0诗1词2，自定义
					worksid:s.state.worksid,
					shicinumber:1
				},
				error(){
					alert('get_shici ： 服务器返回错误')
				},
				success(data){

					if(data.getret === 0){
						if(data.shicilist.length>0){
							s.state.poetryTitle = data.shicilist[0].title;
							s.state.poetryAuthor = data.shicilist[0].author;
							s.state.poetryContent = data.shicilist[0].originaltext;
							
							s.state.workdataid = data.shicilist[0].workdataid;

							s.state.userPoetryContent = data.shicilist[0].originaltext;
							
							s.state.id = '';
							s.state.parentWxopenId = '';
							s.state.showShareOpen = false;
							s.wxConfig(s.state.data.shareTitle,s.state.data.shareDesc,s.state.shareImg,s.state.wxappid);
							s.forceUpdate();
						}
						else{
							alert('没有获取到诗词，请刷新重试');
						}
					}
					else{
						alert('data.getret = ' + data.getret + 'daat.getmsg  =' + data.getmsg);
					}
				}
			})	
		}
		
	}



	clearRender(){
		clearInterval(this.talkTimer);
	}
}

ReactDOM.render(<App></App>,document.getElementById('fly-main-ui'));
