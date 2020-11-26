let Web3 = require('web3');
let web3 = new Web3(Web3.givenProvider);
let request = require('superagent');
const approvalHash = "0x095ea7b3";
const unlimitedAllowance = "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
const { ERC20ABI } = require("./ABI.js");

$(() => {

    web3.eth.requestAccounts().then((accounts) => {
        init(accounts[0]);
    }).catch((err) => {
        console.log(err);
        // some web3 objects don't have requestAccounts
        ethereum.enable().then((accounts) => {
            init(accounts[0]);
        }).catch((err) => {
            alert(err);
        });
    });

    function init(account) {
        $("#loading").show();
        web3.eth.getChainId().then((chainId) => {
            return chainId;
        }).then((chainId) => {
            let query = getQuery(chainId, account);
            if(query === "") {
                alert("Current network not supported");
            } else {
                getApproveTransactions(query, (txs) => {
                    // display the logic
                    console.log(txs);
                    const _ = buildResults(chainId, txs, account);
                });
            }
        }).catch((err) => {
            throw err;
        });
    }

    function getQuery(chainId, address) {
        switch (chainId) {
            case 1:
                return "https://api.etherscan.io/api?module=account&action=txlist&address=" + address;
            case 3:
                return "https://ropsten.etherscan.io/api?module=account&action=txlist&address=" + address;
            case 4:
                return "https://rinkeby.etherscan.io/api?module=account&action=txlist&address=" + address;
            case 42:
                return "https://kovan.etherscan.io/api?module=account&action=txlist&address=" + address;
            default:
                return "";
        }
    }

    function getEtherScanPage(chainId) {
        switch (chainId) {
            case 1:
                return "https://etherscan.io/address/";
            case 3:
                return "https://ropsten.etherscan.io/address/";
            case 4:
                return "https://rinkeby.etherscan.io/address/";
            case 42:
                return "https://kovan.etherscan.io/address/";
            default:
                return "";
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
                    } else {
                        // TODO clean up
                        // Remove all previous additions of this approval transaction as it is now cleared up
                        approveTransactions = approveTransactions.filter((val) => {
                            return !(val.approved === approveObj.approved && val.contract === val.contract);
                        });
                    }
                }
            }
            cb(approveTransactions);
        });
    }

    async function getName(contractAddress) {
        try {
            let contract = new web3.eth.Contract(ERC20ABI, contractAddress);
            return await contract.methods.name().call();
        } catch(e) {
            // name not found, just use contract address
            console.error(e);
            return contractAddress;
        }
    }

    async function buildResults(chainId, txs, account) {
        const etherscanURL = getEtherScanPage(chainId);
        const parentElement = $('#results');
        for(const index in txs) {
            let contractName = await getName(txs[index].contract);
            let approvedName = await getName(txs[index].approved);
            parentElement.append(`
                <div class="grid-container">
                    <div class="grid-items"><a href=${etherscanURL + txs[index].contract}>${contractName}</a></div>
                    <div class="grid-items"><a href=${etherscanURL + txs[index].approved}>${approvedName}</a></div>
                    <div class="grid-items">${txs[index].allowance}</div>
                    <div class="grid-items"><button class="btn btn-primary" id="revoke${index}"> Revoke</button></div>
                </div>
                `);
            setRevokeButtonClick(txs[index], "#revoke" + index, account);
        }
        $("#loading").hide();
    }

    function setRevokeButtonClick(tx, id, account) {
        $(id).click(() => {
            // set the contract and make an approve transaction with a zero allowance
            let contract = new web3.eth.Contract(ERC20ABI, tx.contract);
            contract.methods.approve(tx.approved, 0).send({ from: account }).then((receipt) => {
                console.log("revoked: " + JSON.stringify(receipt));
            }).catch((err) => {
                console.log("failed: " + JSON.stringify(err));
            });
        });
    }

});

