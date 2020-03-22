let Web3 = require('web3');
let web3 = new Web3(Web3.givenProvider);
let request = require('superagent');
const approvalHash = "0x095ea7b3";

document.addEventListener("DOMContentLoaded", () => {

    function init() {
        web3.eth.getChainId().then((chainId) => {
            return chainId;
        }).then((chainId, address) => {
            let query = getQuery(chainId, address);
            getApproveTransactions(query, (txs) => {
                // display the logic
                console.log(txs);
                document.getElementById("txs").innerHTML = txs;
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

    init();
});

