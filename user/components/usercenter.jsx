import React from 'react';
import './css/usercenter.css'
import ZmitiUserHeaderApp  from './header.jsx';
export default class ZmitiUserCenterApp extends React.Component {
  

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='zmiti-user-center-main-ui'>
      	<ZmitiUserHeaderApp></ZmitiUserHeaderApp>
      	<section className='zmiti-user-info'>
			<div className='zmiti-user-headrimg'><img src={this.props.headimgurl|| './assets/images/user/zmiti.jpg'}/></div>
			<div>{this.props.nickname||'zmiti'}</div>
		</section>
		<div className='zmiti-user-line'>
			<img src='./assets/images/user/user-line.png'/>
		</div>
		<section className='zmiti-user-score'>
			<aside>
				<div><img src='./assets/images/user/currency.png'/></div>			
				<div>110积分</div>
			</aside>
			<aside>
				<div>
					<span></span>
					<span></span>
					<span></span>
				</div>
				<div className=''>
					<span>11</span>名
				</div>
			</aside>
		</section>
		<section className='zmiti-user-list-nav'>
			<div>诗(词、文)的历程</div>
			<div>个人评分排行榜</div>
			<div>诗(词、文)排行榜</div>
		</section>
      </div>
    );
  }
}
