let Web3 = require('web3');
let web3 = new Web3(Web3.givenProvider);
let request = require('superagent');
const approvalHash = "0x095ea7b3";
const unlimitedAllowance = "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
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

$(() => {

    web3.eth.requestAccounts().then((accounts) => {
        init(accounts[0]);
    });

    function init(account) {
        web3.eth.getChainId().then((chainId) => {
            return chainId;
        }).then((chainId) => {
            let query = getQuery(chainId, account);
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
                return "https://api.etherscan.io/api?module=account&action=txlist&address=" + address;
            case "3":
                return "https://ropsten.etherscan.io/api?module=account&action=txlist&address=" + address;
            case "4":
                return "https://rinkeby.etherscan.io/api?module=account&action=txlist&address=" + address;
            case "42":
                return "https://kovan.etherscan.io/api?module=account&action=txlist&address=" + address;
            default:
                return "https://api.etherscan.io/api?module=account&action=txlist&address=" + address;
        }
    }

    function getApproveTransactions(query, cb) {
        request.get(query, (err, data) => {
            if(err) throw err;
            let approveTransactions = [];
            let dataObj = JSON.parse(data.text).result;
            for(let tx of dataObj) {
                if(tx.input.includes(approvalHash)) {
                    let approveObj = {};
                    approveObj.contract = web3.utils.toChecksumAddress(tx.to);
                    approveObj.approved = web3.utils.toChecksumAddress("0x" + tx.input.substring(34, 74));
                    let allowance = tx.input.substring(74);
                    if(allowance.includes(unlimitedAllowance)) {
                        approveObj.allowance = "unlimited";
                    } else {
                        approveObj.allowance = "some";
                    }
                    if(parseInt(allowance, 16) !== 0) {
                        approveTransactions.push(approveObj);
                    }
                }
            }
            cb(approveTransactions);
        });
    }

    function buildResults(txs) {
        let parentElement = $('#results');
        for(let index in txs) {
            parentElement.append(`
                <div class="grid-container">
                    <div class="grid-items">${txs[index].contract}</div>
                    <div class="grid-items">${txs[index].approved}</div>
                    <div class="grid-items">${txs[index].allowance}<button class="btn btn-primary" id="revoke${index}">Revoke</button></div>
                </div>
                `);
            setRevokeButtonClick(txs[index], "#revoke" + index);
        }
    }

    function setRevokeButtonClick(tx, id) {
        $(id).click(() => {
            // set the contract and make an approve transaction with a zero allowance
            let contract = new web3.eth.Contract(approvalABI, tx.contract);
            contract.methods.approve(tx.approved, 0).send().then((receipt) => {
                alert("revoked: " + receipt);
            }).catch((err) => {
                alert("failed: " + err);
            });
        });
    }

});

