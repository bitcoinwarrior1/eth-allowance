import React, { Component } from 'react';
import { is721 } from "../helpers/helpers";
import dapps from "../helpers/dapps";
import { ERC20ABI } from "../helpers/ABI";
import textBoxMedium from "../images/TEXTBOX_MEDIUM.png";
import revokeFull from "../images/REVOKE_FULL_SIZE_NEON.png"
import dappButtonV2 from "../images/DAPP_Button_vers2.png";

class allowance extends Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.setRevokeClick = this.setRevokeClick.bind(this);
        this.dappURL= this.dappURL.bind(this);
    }

    dappURL() {
        if(dapps[this.props.tx.contractName.toLowerCase()] !== undefined) {
            return dapps[this.props.tx.contractName.toLowerCase()];
        }
        const dappsKeys = Object.keys(dapps);
        for(let key of dappsKeys) {
            if(this.props.tx.contractName.toLowerCase().includes(key)) {
                return dapps[key];
            }
        }

        return "";
    }

    setRevokeClick() {
        // set the contract and make an approve transaction with a zero allowance
        const { web3 } = this.props;
        const contract = new web3.eth.Contract(ERC20ABI, this.props.tx.contract);
        is721(contract, this.props.tx.allowanceUnEdited).then((result) => {
            if(result) {
                //revoke erc721 by nulling the address
                contract.methods.approve(0, this.props.tx.allowanceUnEdited).send({ from: this.props.account }).then((receipt) => {
                    console.log("revoked: " + JSON.stringify(receipt));
                }).catch((err) => {
                    console.log("failed: " + JSON.stringify(err));
                });
            } else {
                // revoke erc20 by nulling approval amount
                contract.methods.approve(this.props.tx.approved, 0).send({ from: this.props.account }).then((receipt) => {
                    console.log("revoked: " + JSON.stringify(receipt));
                }).catch((err) => {
                    console.log(err)
                    console.log("failed: " + JSON.stringify(err));
                });
            }
        });
    }

    getDappButton() {
        const dappUrl = this.dappURL();
        if(dappUrl !== "") {
            return <div className="container">
                <img className="container" src={dappButtonV2} alt=""/>
                <div className="centered-white"><a onClick={() => { window.open(dappUrl) } }>Visit dApp</a></div>
            </div>;
        } else {
            return <div className="container">
                <img className="container" src={dappButtonV2} alt=""/>
                <div className="centered-white"><a onClick={() => { window.open("https://github.com/James-Sangalli/eth-allowance/blob/master/src/helpers/dapps.js"); } }>Add dApp</a></div>
            </div>;
        }
    }

    truncateName(name) {
        if(name.length > 20) {
            return name.substring(0, 17) + '...'
        }

        return name;
    }

    render() {
        return (
            <div>
                <div className="allowance">

                    <div className="container">
                        <img className="container" src={textBoxMedium} alt=""/>
                        <div className="centered"><a href={this.props.etherscanURL + this.props.tx.contract}>{this.truncateName(this.props.tx.contractName)}</a></div>
                    </div>

                    <div className="container">
                        <img className="container" src={textBoxMedium} alt=""/>
                        <div className="centered"><a href={this.props.etherscanURL + this.props.tx.approved}>{this.truncateName(this.props.tx.approvedName)}</a></div>
                    </div>

                    <div className="container">
                        <img className="container" src={textBoxMedium} alt=""/>
                        <div className="centered">{this.props.tx.allowance}</div>
                    </div>

                    <div className="container">
                        <img className="container" src={revokeFull} alt=""/>
                        <div className="centered-white"><a name="revoke" id="revokeLink" onClick={this.setRevokeClick}>Revoke</a></div>
                    </div>
                    {this.getDappButton()}
                </div>
            </div>
        )
    }
}

export default allowance;
