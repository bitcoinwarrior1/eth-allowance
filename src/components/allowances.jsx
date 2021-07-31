import React, { Component } from 'react';
import { getQuery, getApproveTransactions, getName, getEtherScanPage } from "../helpers/helpers";
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
            document.getElementById("revokeAll").hidden = false;
        }).catch((err) => {
            document.getElementById("loading").innerText = err;
        });
    }

    async init() {
        let account = null;
        try {
            try {
                const accounts = await this.props.web3.eth.requestAccounts();
                account = accounts[0];
            } catch (e) {
                const accounts = await window.ethereum.enable();
                account = accounts[0];
            }
            const chainId = await this.props.web3.eth.getChainId();
            this.setState({ chainId: chainId });
            const query = getQuery(chainId, account);
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
            document.getElementById("loading").hidden = false;
            document.getElementById("loading").innerText = e;
        }
    }

    render() {
        let elements = "";
        if(this.state.txs !== undefined && this.state.chainId !== undefined) {
            const etherscanUrl = getEtherScanPage(this.state.chainId);
            elements = this.state.txs.map((tx) => {
                return <Allowance etherscanURL={etherscanUrl} tx={tx} web3={this.props.web3} id={tx.contract} account={this.state.account}/>
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
