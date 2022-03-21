let Web3 = require('web3');
let web3 = new Web3(Web3.givenProvider);
let request = require('superagent');
const approvalHash = "0x095ea7b3";
const unlimitedAllowance = "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
const { ERC20ABI, ERC721ABI } = require("./ABI.js");

export function getQuery(chainId, address) {
    switch (chainId) {
        case 1:
            return "https://api.etherscan.io/api?module=account&action=txlist&address=" + address;
        case 3:
            return "https://ropsten.etherscan.io/api?module=account&action=txlist&address=" + address;
        case 4:
            return "https://rinkeby.etherscan.io/api?module=account&action=txlist&address=" + address;
        case 42:
            return "https://kovan.etherscan.io/api?module=account&action=txlist&address=" + address;
        case 56:
            return "https://api.bscscan.com/api?module=account&action=txlist&address=" + address;
        default:
            return "";
    }
}

export function getEtherScanPage(chainId) {
    switch (chainId) {
        case 1:
            return "https://etherscan.io/address/";
        case 3:
            return "https://ropsten.etherscan.io/address/";
        case 4:
            return "https://rinkeby.etherscan.io/address/";
        case 42:
            return "https://kovan.etherscan.io/address/";
        case 56:
            return "https://bscscan.com/address/";
        default:
            return "";
    }
}

export async function getApproveTransactionsWithRPC() {
    const userAddress = (await web3.eth.getAccounts())[0];
    const approveLogs = await getApproveLogs(userAddress);
}

async function getApproveLogs(userAddress) {
    const topics = [web3.utils.sha3('approve(address,uint256)'), userAddress, undefined];
    // get tx history for the address
    return web3.eth.getPastLogs({
        fromBlock: '0x0',
        toBlock: 'latest',
        address: userAddress,
        topics: topics
    });
}

async function getAllowancesFromLogs(pastLogs) {
    const approvals = [];
    const spenders = [];
    // latest first
    for(let i = pastLogs.length - 1; i > 0; i++) {

    }
}



export async function getApproveTransactions(query) {
    const _ = await getApproveTransactionsWithRPC();
    try {
        let data = await request.get(query);
        let approveTransactions = [];
        let dataObj = JSON.parse(data.text).result;
        console.log("etherscan api return ", dataObj);
        for(let tx of dataObj) {
            if(tx.input.includes(approvalHash)) {
                console.log("found approve transaction")
                let approveObj = {};
                approveObj.contract = web3.utils.toChecksumAddress(tx.to);
                approveObj.approved = web3.utils.toChecksumAddress("0x" + tx.input.substring(34, 74));
                let allowance = tx.input.substring(74);
                if(allowance.includes(unlimitedAllowance)) {
                    approveObj.allowance = "unlimited";
                } else {
                    approveObj.allowance = "some";
                    approveObj.allowanceUnEdited = allowance;
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
        return approveTransactions;
    } catch (e) {
        throw e;
    }
}

export async function getName(contractAddress) {
    try {
        let contract = new web3.eth.Contract(ERC20ABI, contractAddress);
        return await contract.methods.name().call();
    } catch(e) {
        // name not found, just use contract address
        console.error(e);
        return contractAddress;
    }
}

export async function is721(contractAddress, tokenId) {
    let contract = new web3.eth.Contract(ERC721ABI, contractAddress);
    try {
        const _ = await contract.methods.ownerOf(tokenId).call();
        return true; // if this call passes, it must be ERC721
    } catch (e) {
        // method doesn't exist, can't be 721
        return false;
    }
}
