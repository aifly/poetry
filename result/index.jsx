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
		obserable.trigger({
			type:'showMainUI'
		});
		this.setState({
			entryShare:true
		})
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
				score:data
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