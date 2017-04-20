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
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {


		var headerProps = {
			showRefreshBtn:false
		}
		return (
			<div className='zmiti-result-main-ui'>
				<article className='zmiti-result-scroll' ref='zmiti-result-scroll' style={{height:this.viewH}}>
					<div style={{paddingBottom:30}}>
						<ZmitiHeaderApp {...this.props} {...headerProps}></ZmitiHeaderApp>
						<div className='zmiti-score-C'>
							<span>23</span>
							<img src='./assets/images/score-bg1.png'/>
						</div>
						<div className='zmiti-transform-C'>
							{this.state.transformText}
						</div>
						<section className='zmiti-tip'>
							以上是语音转文字
						</section>
						<ZmitiAudioApp></ZmitiAudioApp>
						<section className='zmiti-submit-btn zmiti-btn' style={{backgroundColor:this.props.theme.backgroundColor}}>
							满意，我要提交
						</section>
					</div>
				</article>
			</div>
		);
	}


	componentDidMount() {
		var {obserable,IScroll} = this.props;
		obserable.on('setTransformText',(data)=>{
			this.setState({
				transformText:data
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