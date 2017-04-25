import React from 'react';
import './css/rankinglist.css';
import ZmitiUserHeaderApp  from './header.jsx';
import IScroll from 'iscroll';
export default class ZmitiRankingListApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	rankinglist:[
    		{title:'静夜思静夜思静夜思静夜思',read:140,score:96},
    		{title:'静夜思',read:130,score:90},
    		{title:'静夜思',read:121,score:55},
    		{title:'静夜思',read:144,score:76},
    		{title:'静夜思',read:250,score:68},
    		{title:'静夜思',read:52,score:58},
    		{title:'静夜思',read:50,score:88},
    		{title:'静夜思',read:85,score:48},
    		{title:'静夜思',read:36,score:36},
    		{title:'静夜思',read:120,score:33},
    		{title:'静夜思',read:59,score:84},
    		{title:'静夜思',read:99,score:73},
    		{title:'静夜思',read:83,score:69},
    		{title:'静夜思',read:32,score:44}
    	],
      sortByRead:false,
      sortByScore:false,
      readDesc:false,
      scoreDesc:false
    };
    this.viewH = document.documentElement.clientHeight;
  }

  render() {

    var className = '';
    if(this.state.mainState === 0){
      className = 'active';
    }
    var headerProps = {
      type:'ranking',
      ...this.props
    }
    return (
      <div className={'zmiti-rankinglist-main-ui ' +className} >
      	<ZmitiUserHeaderApp {...headerProps}></ZmitiUserHeaderApp>
        <ul className='zmiti-rankinglist-title'>
          <li>标题</li>
          <li onTouchTap={this.sortByRead.bind(this)} className={(this.state.sortByRead &&this.state.readDesc ? ' zmiti-read-desc':'') + (this.state.sortByRead && !this.state.readDesc ? ' zmiti-read-asc' :'')}>
            已读人数
            <span></span>
            <span></span>
          </li>
          <li onTouchTap={this.sortByScore.bind(this)} className={(this.state.sortByScore &&this.state.scoreDesc ? ' zmiti-score-desc':'') + (this.state.sortByScore && !this.state.scoreDesc ? ' zmiti-score-asc':'')}>
            最高得分
            <span></span>
            <span></span>
          </li>
        </ul>
      	<section className='zmiti-rankinglist-scroll' ref='zmiti-rankinglist-scroll' style={{height:this.viewH - 150}}>
      		<ul style={{paddingBottom:30}}>
      			{this.state.rankinglist.map((item,i)=>{
      				return <li key={i}>
			      				<aside className='zmiti-text-overflow'>
			      					《{item.title}》
			      				</aside>
			      				<aside>
			      					{item.read}人
			      				</aside>
                    <aside>{item.score}分</aside>
			      			</li>
      			})}
      		</ul>
      	</section>
      </div>
    );
  }
  sortByScore(){
    this.setState({
      sortByRead:false,
      sortByScore:true,
      scoreDesc:!this.state.scoreDesc
    },()=>{
      if(!this.state.scoreDesc){
        this.state.rankinglist.sort((a,b)=>{
          return a.score - b.score;
        })  
      }else{
        this.state.rankinglist.sort((a,b)=>{
          return b.score - a.score;
        })
      }
      this.forceUpdate();
    });
  }
  sortByRead(){
    this.setState({
      sortByRead:true,
      sortByScore:false,
      readDesc:!this.state.readDesc
    },()=>{
      if(!this.state.readDesc){
        this.state.rankinglist.sort((a,b)=>{
          return a.read - b.read;
        })  
      }else{
        this.state.rankinglist.sort((a,b)=>{
          return b.read - a.read;
        })
      }
      this.forceUpdate();
    })
  }

  componentDidMount() {
  	this.scroll = new IScroll(this.refs['zmiti-rankinglist-scroll'],{
  		scrollbars:true
  	});

    let {obserable} = this.props;
    obserable.on('toggleRanking',(data)=>{
        this.setState({
          mainState:data
        })
    });
  }
}
