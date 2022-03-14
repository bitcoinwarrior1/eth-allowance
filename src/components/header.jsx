import React, { Component } from 'react';
import '../App.css';
import textBoxMedium from "../images/TEXTBOX_MEDIUM.png";
import revokeFullSpecial from "../images/REVOKE_Button_vers2.png";

class header extends Component {

    revokeAll = () => {
        let buttons = document.getElementsByName('revoke');
        for(let button of buttons) {
            button.click();
        }
    }

    render() {
        return (
            <div>
                <div  className="jumbotron">
                    <div id="titles">
                        <h2>Find & revoke token allowances</h2>
                    </div>
                </div>
                <div id="columns">
                    <div id="headers">
                        <div className="container">
                            <div className="centered-white">CONTRACT</div>
                        </div>
                        <div className="container">
                            <div className="centered-white">SPENDER</div>
                        </div>
                        <div className="container">
                            <div className="centered-white">ALLOWANCE</div>
                        </div>
                        <div className="container">
                            <div className="centered-white">ACTION</div>
                        </div>
                        <div className="container">
                            <div className="centered-white">MISCELLANEOUS</div>
                        </div>
                    </div>
                </div>
                <h3 id="loading" hidden>Loading, please wait...</h3>
                <div id="revokeAll">
                    <div className="container">
                        <img className="container" src={textBoxMedium} alt=""/>
                        <div className="centered">ALL</div>
                    </div>
                    <div className="container">
                        <img className="container" src={textBoxMedium} alt=""/>
                        <div className="centered">ALL</div>
                    </div>
                    <div className="container">
                        <img className="container" src={textBoxMedium} alt=""/>
                        <div className="centered">ALL</div>
                    </div>
                    <div className="container" onClick={this.revokeAll}>
                        <img className="container" src={revokeFullSpecial} alt=""/>
                        <div className="centered-white"><a id="revokeLink" onClick={this.revokeAll}>Revoke All</a></div>
                    </div>
                    <div className="container">
                        <img className="container" src={textBoxMedium} alt=""/>
                        <div className="centered-white"><a onClick={() => { window.open("https://github.com/James-Sangalli/eth-allowance/issues") } }>Report issue</a></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default header;
