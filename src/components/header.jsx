import React, { Component } from 'react';
import '../App.css';

class header extends Component {

    render() {
        return (
            <div>
                <div className="jumbotron">
                    <div id="titles">
                        <h1>ETH Allowance</h1>
                        <h2>Find & revoke all the addresses that can spend your tokens</h2>
                    </div>
                </div>
                <h3 id="loading" hidden>Loading, please wait...</h3>
                <div id="results">
                    <div className="grid-container">
                        <div className="grid-item">Contract</div>
                        <div className="grid-item">Approved Address</div>
                        <div className="grid-item">Allowance</div>
                        <div className="grid-item">Action</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default header;
