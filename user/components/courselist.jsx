import React from 'react';
import './css/courselist.css';
import ZmitiUserHeaderApp  from './header.jsx';
import IScroll from 'iscroll';
export default class ZmitiCourseListApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    return (
      <div className='zmiti-courselist-main-ui'>
      	<ZmitiUserHeaderApp></ZmitiUserHeaderApp>
      	<section className='zmiti-courselist-scroll' ref='zmiti-courselist-scroll' style={{height:this.viewH - 120}}>
      		<ul style={{paddingBottom:30}}>
      			{this.state.courselist.map((item,i)=>{
      				return <li key={i}>
			      				<aside>
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

  componentDidMount() {
  	this.scroll = new IScroll(this.refs['zmiti-courselist-scroll'],{
  		scrollbars:true
  	})
  }
}
