import React, { Component } from 'react';
import {PubCom} from './pub.jsx';
import './css/header.css';
import $ from 'jquery';

class ZmitiHeaderApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			isRefresh:false
		};
	}

	render() {
		return (
			<div className='zmiti-header-main-ui'>
				<header className='zmiti-index-header'>
					<section>
						<section className='zmiti-headimg'>
							<img src={this.props.headimgurl||'./assets/images/zmiti.jpg'}/>
						</section>
						<section className='zmiti-user-info'>
							<div>{this.props.nickname||'zmiti'}</div>
							<div><img src='./assets/images/currency.png' /><span>{this.props.score}积分</span></div>
							<div className='zmiti-line'><img src='./assets/images/line.png'/></div>
						</section>
					</section>
					<section>
						{this.props.showRefreshBtn && <div onTouchTap={this.refreshPoetry.bind(this)} className='zmiti-reload-poetry'>
													<img className={this.state.isRefresh?'zmiti-rotate':''} src='./assets/images/refresh.png'/>
													换一首
												</div>}
					</section>
				</header>
				 <div className='zmiti-roof'>
				 	<img src='./assets/images/house.png'/>
				 </div>
			</div>
		);
	}

	refreshPoetry(){
		let {obserable} = this.props;
		obserable.trigger({
			type:'refreshPoetry'
		})
	}

	componentDidMount() {

	}
}
ZmitiHeaderApp.defaultProps = {
	showRefreshBtn:true
}
export default PubCom(ZmitiHeaderApp);