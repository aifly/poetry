import React from 'react';
import './css/coursedetail.css';
import IScroll from 'iscroll';
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
    			nickname:"静夜思静夜思静夜思静夜思静夜思",
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
    			nickname:"中华人民共和国中华人民共和国",
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
    var className = '';
    if(this.state.mainState === 0){
        className = 'active';
    }
    var headerProps = {
        type:'courseDetail',
        ...this.props
    }
    return (
		<div className={'zmiti-coursedetail-main-ui '+ className}>
			<ZmitiUserHeaderApp {...headerProps}></ZmitiUserHeaderApp>
			<section className='zmiti-courcedetail-scroll' style={{height:this.viewH - 120}} ref='zmiti-courcedetail-scroll'>
				<ul style={{paddingBottom:30}}>
					{this.state.userlist.map((item,i)=>{
						return <li key= {i}>
							<div></div>
							<div>
								<aside>
									<span className='zmiti-courcedetail-date'>{item.date}</span>
									<img className='zmiti-headimgurl' src={item.headimgurl||'./assets/images/user/zmiti.jpg'}/>
									<span className={'zmiti-text-overflow zmiti-courcedetail-nickname '+(i===0 ?'zmiti-first-user':'')}>{item.nickname}</span>
									{i===0 && <span className='zmiti-first-author'>创始者</span>}
                                    <img src='./assets/images/user/voice.png'/>
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

  componentDidMount() {
      this.scroll = new IScroll(this.refs['zmiti-courcedetail-scroll'],{
            scrollbars:true
      });

      setTimeout(()=>{
        this.scroll.refresh()
      },500)

      let {obserable} = this.props;
      obserable.on('toggleCourseDetail',(data)=>{
            this.setState({
                mainState:data
            })
      });
  }
}
