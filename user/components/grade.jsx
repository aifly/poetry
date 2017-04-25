import React from 'react';
import './css/grade.css';
import ZmitiUserHeaderApp  from './header.jsx';
import IScroll from 'iscroll';

//个人评分
export default class ZmitiGradeApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	gradelist:[
    		{title:'静夜思静夜思静夜思静夜思',score:98},
    		{title:'静夜思',score:98},
    		{title:'静夜思',score:98},
    		{title:'静夜思',score:98},
    		{title:'静夜思',score:98},
    		{title:'静夜思',score:98},
    		{title:'静夜思',score:98},
    		{title:'静夜思',score:98},
    		{title:'静夜思',score:98},
    		{title:'静夜思',score:98},
    		{title:'静夜思',score:98},
    		{title:'静夜思',score:98},
    		{title:'静夜思',score:98},
    		{title:'静夜思',score:98}
    	]
    };
    this.viewH = document.documentElement.clientHeight;
  }

  render() {

    var className = '';

    if(this.state.mainState === 0){
      className = 'active';
    }

    var headerProps = {
      type:'grade',
      ...this.props
    }

    return (
      <div className={'zmiti-grade-main-ui '+ className}>
      	<ZmitiUserHeaderApp {...headerProps}></ZmitiUserHeaderApp>
      	<section className='zmiti-grade-scroll' ref='zmiti-grade-scroll' style={{height:this.viewH - 120}}>
      		<ul style={{paddingBottom:30}}>
      			{this.state.gradelist.map((item,i)=>{
      				return <li key={i}>
			      				<aside className='zmiti-text-overflow'>
			      					《{item.title}》
			      				</aside>
			      				<aside>
			      					<i>{item.score}分</i>
			      				</aside>
			      			</li>
      			})}
      		</ul>
      	</section>
      </div>
    );
  }

  componentDidMount() {
  	this.scroll = new IScroll(this.refs['zmiti-grade-scroll'],{
  		scrollbars:true
  	});
    let {obserable} = this.props;
    obserable.on('toggleGrade',(data)=>{
      this.setState({
         mainState:data
      })
    })
  }
}
