import React, { Component } from 'react';
 
import $ from 'jquery';

export let PubCom = ComponsedComponent => class extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {};
	}

	 
	componentWillMount() {
				
	}


	loading(arr, fn, fnEnd){
	        var len = arr.length;
	        var count = 0;
	        var i = 0;
	        
	        function loadimg() {
	            if (i === len) {
	                return;
	            }
	            var img = new Image();
	            img.onload = img.onerror = function(){
	                count++;
	                if (i < len - 1) {
	                    i++;
	                    loadimg();
	                    fn && fn(i / (len - 1), img.src);
	                } else {
	                    fnEnd && fnEnd(img.src);
	                }
	            };
	            img.src = arr[i];
	        }
	       loadimg();
    }


	
	render() {


		let methods = {
		 	loading:this.loading
			//fillFeilds:this.fillFeilds
		}

		return <ComponsedComponent {...methods} {...this.props} {...this.state} />;
	}
}

