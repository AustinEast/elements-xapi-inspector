import React, { Component, PropTypes } from 'react';
import Scroll from 'react-scroll';

export default class Footer extends Component {
    constructor(props) {
        super(props);
        
        this.scrollUp = this.scrollUp.bind(this);
        this.scrollDown = this.scrollDown.bind(this);
    }

    scrollUp() {
        Scroll.animateScroll.scrollToTop();
    }

    scrollDown() {
        Scroll.animateScroll.scrollToBottom();
    }

    render() {
        return (
            <footer>
                <span onClick={this.scrollDown.bind(this)}>
                    <i className="icon ion-android-arrow-dropdown-circle"></i> 
                </span>     
                <span onClick={this.scrollUp.bind(this)}>              
                    <i className="icon ion-android-arrow-dropup-circle"></i>
                </span>
            </footer>
        );
    }
}
