import React, { Component } from 'react';
import {PubCom} from './pub.jsx';
import './css/audio.css';
import $ from 'jquery';

class ZmitiAudioApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			pause:true
		};
	}

	render() {
		return (
			<div className='zmiti-audio-main-ui'>
				<section className='zmiti-audio-C' onTouchTap={this.playAudio.bind(this)}>
					<aside>{this.state.pause ? <img src='./assets/images/pause.png'/> : <img src='./assets/images/pause.gif'/>}点我播放</aside>
					<aside>{this.props.duration}"</aside>
				</section>
			</div>
		);
	}

	playAudio(){
		var s = this;
		this.pause = !this.pause;
		if(this.pause){
			wx.playVoice({
			    localId: s.props.audioSrc
			});	
		}else{
			wx.stopVoice({
			    localId: s.props.audioSrc // 需要停止的音频的本地ID，由stopRecord接口获得
			});
		}

		this.setState({
			pause:!this.pause
		})
		
	}

	componentDidMount() {
		var s = this;
		wx.onVoicePlayEnd({
		    success: function (res) {
		        var localId = res.localId; // 返回音频的本地ID
		        s.pause = !s.pause;
		        s.setState({
					pause:!s.pause
				});
		    }
		});
	}
}

export default PubCom(ZmitiAudioApp);