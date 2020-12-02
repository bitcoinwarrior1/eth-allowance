import React, { Component } from 'react';
import { getQuery, getApproveTransactions, getName } from "../helpers/helpers";
import Allowance from "./allowance";

class allowances extends Component {

    state = {
        txs: undefined,
        account: undefined
    };

    constructor(props) {
        super(props);
        this.props = props;
    }

    componentDidMount() {
        document.getElementById("loading").hidden = false;
        this.init().then((obj) => {
            this.setState(obj);
            document.getElementById("loading").hidden = true;
        }).catch((err) => {
            console.log("failed here ", err)
            document.getElementById("loading").innerText = "error! " + err;
        });
    }

    async init() {
        try {
            let account = null;
            try {
                const accounts = await this.props.web3.eth.requestAccounts();
                account = accounts[0];
            } catch (e) {
                const accounts = await window.ethereum.enable();
                account = accounts[0];
            }
            console.log(account);
            const chainId = await this.props.web3.eth.getChainId();
            const query = getQuery(chainId, account);
            console.log(query)
            const txs = await getApproveTransactions(query);
            for(const index in txs) {
                txs[index].contractName = await getName(txs[index].contract);
                txs[index].approvedName = await getName(txs[index].approved);
            }
            return {
                txs: txs,
                account: account
            };
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        let elements = "";
        console.log("txs: ", this.state.txs)
        if(this.state.txs !== undefined) {
            elements = this.state.txs.map((tx) => {
                return <Allowance tx={tx} web3={this.props.web3} id={tx.contract} account={this.state.account}/>
            });
        }
        return (
            <div>
                {elements}
            </div>
        )
    }
}

export default allowances;
