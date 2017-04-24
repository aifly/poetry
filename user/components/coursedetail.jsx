import React from 'react';
import './css/coursedetail.css';
import ZmitiUserHeaderApp  from './header.jsx';
export default class ZmitiCourseDetailApp extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
    	title:'静夜思',
    	userlist:[
    		{
    			date:'04/24',
    			headimgurl:'./assets/images/user/zmiti.jpg',
    			nickname:"zmiti",
    			audioSrc:'',
    			score:99
    		},{
    			date:'04/24',
    			headimgurl:'./assets/images/user/zmiti.jpg',
    			nickname:"zmiti",
    			audioSrc:'',
    			score:99
    		},{
    			date:'04/24',
    			headimgurl:'./assets/images/user/zmiti.jpg',
    			nickname:"zmiti",
    			audioSrc:'',
    			score:99
    		},{
    			date:'04/24',
    			headimgurl:'./assets/images/user/zmiti.jpg',
    			nickname:"zmiti",
    			audioSrc:'',
    			score:99
    		},{
    			date:'04/24',
    			headimgurl:'./assets/images/user/zmiti.jpg',
    			nickname:"zmiti",
    			audioSrc:'',
    			score:99
    		},{
    			date:'04/24',
    			headimgurl:'./assets/images/user/zmiti.jpg',
    			nickname:"zmiti",
    			audioSrc:'',
    			score:99
    		},{
    			date:'04/24',
    			headimgurl:'./assets/images/user/zmiti.jpg',
    			nickname:"zmiti",
    			audioSrc:'',
    			score:99
    		},{
    			date:'04/24',
    			headimgurl:'./assets/images/user/zmiti.jpg',
    			nickname:"zmiti",
    			audioSrc:'',
    			score:99
    		}
    	]

    }
    this.viewH = document.documentElement.clientHeight;
  }

  render() {
    return (
		<div className='zmiti-coursedetail-main-ui'>
			<ZmitiUserHeaderApp></ZmitiUserHeaderApp>
			<section className='zmiti-courcedetail-scroll' style={{height:this.viewH - 120}} ref='zmiti-courcedetail-scroll'>
				<ul>
					{this.state.userlist.map((item,i)=>{
						return <li key= {i}>
							<div></div>
							<div>
								<aside>
									<span>{item.date}</span>
									<img src={item.headimgurl||'./assets/images/user/zmiti.jpg'}/>
									<span>{item.nickname}</span>
									{i===0 && <span className='zmiti-first-author'>创始者</span>}
								</aside>								
								<aside>
									<i>{item.score}分</i>
								</aside>								
							</div>
						</li>
					})}
				</ul>
			</section>
		</div>
    );
  }
}
