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
			isFirst:false,//是否是从新开始的
			audioSrc:'',//当前录音的id
			showUI:true,
			score:120,//积分
			openid:'',
			worksid:'5296019810',	
			nickname:'',
			headimgurl:'',
			duration:0,//录音时长。
			transformResult:'',
			latitude:'',
			longitude:'',
			usercity:'',
			poetryTitle:'望岳',
			poetryAuthor:'杜甫',
			poetryContent:'岱宗夫如何，齐鲁青未了。\r\n造化钟神秀，阴阳割昏晓。\r\n荡胸生层云，决眦入归鸟。\r\n会当凌绝顶，一览众山小。\r\n',
			isEntryResult:false,
			theme:{
				backgroundColor:'#4a5265'
			}
		}
		this.viewH = document.documentElement.clientHeight;
	}
	render() {
		var data = {
			obserable,
			IScroll
		}
		return (
			<div className={'zmiti-main-ui '+(this.state.showUI?' show':'')} style={{height:this.viewH}}>
				<section className={'zmiti-main-C '+(this.state.showUser?'hide':'')}>
					{this.state.isFirst &&<ZmitiCoverApp {...this.state} {...data}></ZmitiCoverApp>}
					{this.state.isFirst && <ZmitiChooseApp {...this.state} {...data}></ZmitiChooseApp>}
					<ZmitiIndexApp {...this.state} {...data}></ZmitiIndexApp>
					<ZmitiResultApp {...this.state} {...data}></ZmitiResultApp>
					<ZmitiShareApp {...this.state} {...data}></ZmitiShareApp>
				</section>
				<ZmitiUserApp {...this.state} {...data}></ZmitiUserApp>
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


    getPos(nickname,headimgurl){

    	var s = this;
    	 $.ajax({
        	url:`http://restapi.amap.com/v3/geocode/regeo?key=10df4af5d9266f83b404c007534f0001&location=${wx.posData.longitude},${wx.posData.latitude}&poitype=&radius=100&extensions=base&batch=false&roadlevel=1`+'',
			type:'get',
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
				   			wxappid:appData.wxappid,
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
											alert('getret  : '+ data.getret + ' msg : ' + data.getmsg);	
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
		   var durl = location.href.split('#')[0]; //window.location;
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

		$.getJSON('./assets/js/data.json',(d)=>{
			this.wxConfig('微信API测试','微信API测试','http://h5.zmiti.com/public/wxapi/assets/images/300.jpg');
			this.setState({
				worksid:d.worksid
			},()=>{

				$.ajax({
				url:'http://api.zmiti.com/v2/weixin/getwxuserinfo/',
				data:{
					code:s.getQueryString('code'),
					wxappid:d.wxappid,
					wxappsecret:d.wxappsecret
				},
				error(){
					alert('error')
				},
				success(dt){

					if(dt.getret === 0){
						$.ajax({
							url:'http://api.zmiti.com/v2/works/update_pvnum/',
							data:{
								worksid:s.state.worksid
							},
							success(data){
								if(data.getret === 0){
									console.log(data);
								}
							}
						});
						localStorage.setItem('nickname',dt.userinfo.nickname );
						localStorage.setItem('headimgurl',dt.userinfo.headimgurl);
						s.nickname = dt.userinfo.nickname;
						s.headimgurl = dt.userinfo.headimgurl;

						s.openid = dt.userinfo.openid;
						s.setState({
							openid:s.openid,
							nickname:s.nickname,
					   		headimgurl:s.headimgurl,
						})
					
						s.refreshPoetry();

						if(wx.posData && wx.posData.longitude){
							s.getPos(dt.userinfo.nickname,dt.userinfo.headimgurl);
						}
					}
					else{
						
						if(s.isWeiXin() ){
							$.ajax({
								url:'http://api.zmiti.com/v2/weixin/getoauthurl/',
								type:"post",
								data:{
									redirect_uri:window.location.href.split('?')[0],
									scope:'snsapi_userinfo',
									worksid:s.state.worksid,
									state:new Date().getTime()+''
								},
								error(){
									alert('error');
								},
								success(dt){
									if(dt.getret === 0){
										window.location.href =  dt.url;
									}
								}
							})
						}
						else{
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
		    		msg:'录音停止。'
		    	})
		        //var localId = res.localId; // 返回音频的本地ID
		    }
		});


		obserable.on('entryResult',(data)=>{
			this.setState({
				isEntryResult:data
			})
		});

		obserable.on('toggleUser',(data)=>{
			this.setState({
				showUser:data
			})
		});

		obserable.on('countdownDuration',()=>{//录音倒计时
			this.setState({
				duration:this.state.duration + 1
			});
		});

		obserable.on('getLocalId',(data)=>{
			this.setState({
				audioSrc:data
			})
		});

		obserable.on('getTransformResult',(data)=>{
			this.setState({
				transformResult:data
			});
		});

		obserable.on('refreshPoetry',()=>{
			this.refreshPoetry();
		});


		
		//this.connect();


	}

	refreshPoetry(){
		var s = this;
		$.ajax({
			url:'http://api.zmiti.com/v2/weixin/get_shici/',
			data:{
				type:0,//0诗1词2，自定义
				worksid:s.state.worksid,
				shicinumber:1
			},
			success(data){
				if(data.getret === 0){
					if(data.shicilist.length>0){
						s.state.poetryTitle = data.shicilist[0].title;
						s.state.poetryAuthor = data.shicilist[0].author;
						s.state.poetryContent = data.shicilist[0].originaltext;
						s.state.workdataid = data.shicilist[0].workdataid;

						s.forceUpdate();
					}
					else{
						alert('没有获取到诗词，请刷新重试');
					}
				}
			}
		})
	}



	clearRender(){
		clearInterval(this.talkTimer);
	}
}

ReactDOM.render(<App></App>,document.getElementById('fly-main-ui'));
