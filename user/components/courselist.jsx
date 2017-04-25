import React from 'react';
import './css/courselist.css';
import ZmitiUserHeaderApp  from './header.jsx';
import IScroll from 'iscroll';
export default class ZmitiCourseListApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainState:1,
    	courselist:[
    		{title:'静夜思',read:140},
    		{title:'静夜思',read:140},
    		{title:'静夜思',read:140},
    		{title:'静夜思',read:140},
    		{title:'静夜思',read:140},
    		{title:'静夜思',read:140},
    		{title:'静夜思',read:140},
    		{title:'静夜思',read:140},
    		{title:'静夜思',read:140},
    		{title:'静夜思',read:140},
    		{title:'静夜思',read:140},
    		{title:'静夜思',read:140},
    		{title:'静夜思',read:140},
    		{title:'静夜思',read:140}
    	]
    };
    this.viewH = document.documentElement.clientHeight;
  }

  render() {
    var className = '';
    if(this.state.mainState === 0){
       className ='active';
    }
    else if(this.state.mainState  === -1){
       className ='hide';
    }

    var headerProps = {
      type:'courselist',
      ...this.props
    }
    return (
      <div className={'zmiti-courselist-main-ui '+ className}>
      	<ZmitiUserHeaderApp {...headerProps}></ZmitiUserHeaderApp>
      	<section className='zmiti-courselist-scroll' ref='zmiti-courselist-scroll' style={{height:this.viewH - 120}}>
      		<ul style={{paddingBottom:30}}>
      			{this.state.courselist.map((item,i)=>{
      				return <li key={i} onTouchTap={this.entryDetail.bind(this,i)}>
			      				<aside className='zmiti-text-overflow'>
			      					《{item.title}》
			      				</aside>
			      				<aside>
			      					<i>{item.read}人已读</i>
			      				</aside>
			      			</li>
      			})}
      		</ul>
      	</section>
      </div>
    );
  }

  entryDetail(index){
    let {obserable } = this.props;
    obserable.trigger({
      type:'toggleCourseList',
      data:-1
    });
    obserable.trigger({
      type:'toggleCourseDetail',
      data:0
    })
  }

  componentDidMount() {
  	this.scroll = new IScroll(this.refs['zmiti-courselist-scroll'],{
  		scrollbars:true
  	});

    let {obserable } = this.props;
    obserable.on('toggleCourseList',(data)=>{
        this.setState({
            mainState:data
        });
    });
  }
}
