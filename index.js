let Web3 = require('web3');
let web3 = new Web3(Web3.givenProvider);
let request = require('superagent');
const approvalHash = "0x095ea7b3";
const approvalABI = [
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokens",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "internalType": "bool",
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

document.addEventListener("DOMContentLoaded", () => {

    web3.eth.requestAccounts().then((accounts) => {
        init();
    });

    function init() {
        web3.eth.getChainId().then((chainId) => {
            return chainId;
        }).then((chainId, address) => {
            let query = getQuery(chainId, address);
            getApproveTransactions(query, (txs) => {
                // display the logic
                console.log(txs);
                buildResults(txs);
            });
        }).catch((err) => {
            throw err;
        });
    }

    function getQuery(chainId, address) {
        switch (chainId) {
            case "1":
                return "http://api.etherscan.io/api?module=account&action=txlist&address=" + address;
            case "3":
                return "http://ropsten.etherscan.io/api?module=account&action=txlist&address=" + address;
            case "4":
                return "http://rinkeby.etherscan.io/api?module=account&action=txlist&address=" + address;
            case "42":
                return "http://kovan.etherscan.io/api?module=account&action=txlist&address=" + address;
            default:
                return "http://api.etherscan.io/api?module=account&action=txlist&address=" + address;
        }
    }

    function getApproveTransactions(query, cb) {
        request.get(query, (err, data) => {
            if(err) throw err;
            let approveTransactions = [];
            for(let tx of data.result) {
                if(tx.input.includes(approvalHash)) {
                    // 0x095ea7b3000000000000000000000000e5a69d694d0df71a5eea63432ee74f2c4465a56
                    // fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
                    let approveObj = {};
                    approveObj.contract = tx.to;
                    approveObj.approved = "0x" + tx.input.substring(34, 73);
                    approveObj.allowance = tx.input.substring(74);
                    approveTransactions.push(approveObj);
                }
            }
            cb(approveTransactions);
        });
    }


    // <div class="grid-container">
    //     <div class="grid-items">0xEdd6D7ba0FF9f4bC501a12529cb736CA76A4fe7e</div>
    //     <div class="grid-items">0xEdd6D7ba0FF9f4bC501a12529cb736CA76A4fe7e</div>
    //     <div class="grid-items">Unlimited <button class="btn btn-warning">Revoke</button></div>
    // </div>

    function buildResults(txs) {
        let parentElement = document.getElementById("results");
        for(let index in txs) {
            parentElement.append(`
                <div class="grid-container">
                    <div class="grid-item">${txs[index].contract}</div>
                    <div class="grid-item">${txs[index].approved}</div>
                    <div class="grid-item">${txs[index].allowance}<button id="revoke${index}"</button></div>
                </div>
                `);
            setRevokeButtonClick(txs[index], "revoke" + index);
        }
    }

    function setRevokeButtonClick(tx, id) {
        document.getElementById(id).onclick((ev) => {
            // set the contract and make an approve transaction with a zero allowance
            let contract = new web3.eth.Contract(approvalABI, tx.contract);
            contract.methods.approve([tx.approved, 0]).send().then((receipt) => {
                alert("revoked: " + receipt);
            }).catch((err) => {
                alert("failed: " + err);
            });
        });
    }

});

