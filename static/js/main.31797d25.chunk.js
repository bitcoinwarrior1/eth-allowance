(this["webpackJsonpeth-allowance"]=this["webpackJsonpeth-allowance"]||[]).push([[0],{197:function(e,t){},206:function(e,t){},222:function(e,t){},224:function(e,t){},251:function(e,t){},272:function(e,t){},274:function(e,t){},283:function(e,t){},285:function(e,t){},310:function(e,t){},312:function(e,t){},313:function(e,t){},318:function(e,t){},320:function(e,t){},339:function(e,t){},351:function(e,t){},354:function(e,t){},359:function(e,t){},374:function(e,t){},377:function(e,t){},446:function(e,t,n){"use strict";n.r(t);var a=n(0),s=n(13),i=n.n(s),c=n(181),o=n.n(c),r=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,447)).then((function(t){var n=t.getCLS,a=t.getFID,s=t.getFCP,i=t.getLCP,c=t.getTTFB;n(e),a(e),s(e),i(e),c(e)}))},p=(n(187),n(90),n(56)),u=n.n(p),d=n(57),l=n(35),m=n(36),h=n(38),f=n(37),y=n.p+"static/media/TEXTBOX_MEDIUM.aa048e72.png",b=n.p+"static/media/REVOKE_Button_vers2.7f3f6e71.png",v=function(e){Object(h.a)(n,e);var t=Object(f.a)(n);function n(){var e;Object(l.a)(this,n);for(var a=arguments.length,s=new Array(a),i=0;i<a;i++)s[i]=arguments[i];return(e=t.call.apply(t,[this].concat(s))).revokeAll=function(){var e,t=document.getElementsByName("revoke"),n=Object(d.a)(t);try{for(n.s();!(e=n.n()).done;){e.value.click()}}catch(a){n.e(a)}finally{n.f()}},e}return Object(m.a)(n,[{key:"render",value:function(){return Object(a.jsxs)("div",{children:[Object(a.jsx)("div",{className:"jumbotron",children:Object(a.jsx)("div",{id:"titles",children:Object(a.jsx)("h2",{children:"Find & revoke token allowances"})})}),Object(a.jsx)("div",{id:"columns",children:Object(a.jsxs)("div",{id:"headers",children:[Object(a.jsx)("div",{className:"container",children:Object(a.jsx)("div",{className:"centered-white",children:"CONTRACT"})}),Object(a.jsx)("div",{className:"container",children:Object(a.jsx)("div",{className:"centered-white",children:"SPENDER"})}),Object(a.jsx)("div",{className:"container",children:Object(a.jsx)("div",{className:"centered-white",children:"ALLOWANCE"})}),Object(a.jsx)("div",{className:"container",children:Object(a.jsx)("div",{className:"centered-white",children:"ACTION"})}),Object(a.jsx)("div",{className:"container",children:Object(a.jsx)("div",{className:"centered-white",children:"MISCELLANEOUS"})})]})}),Object(a.jsx)("h3",{id:"loading",hidden:!0,children:"Loading, please wait..."}),Object(a.jsxs)("div",{id:"revokeAll",children:[Object(a.jsxs)("div",{className:"container",children:[Object(a.jsx)("img",{className:"container",src:y,alt:""}),Object(a.jsx)("div",{className:"centered",children:"ALL"})]}),Object(a.jsxs)("div",{className:"container",children:[Object(a.jsx)("img",{className:"container",src:y,alt:""}),Object(a.jsx)("div",{className:"centered",children:"ALL"})]}),Object(a.jsxs)("div",{className:"container",children:[Object(a.jsx)("img",{className:"container",src:y,alt:""}),Object(a.jsx)("div",{className:"centered",children:"ALL"})]}),Object(a.jsxs)("div",{className:"container",onClick:this.revokeAll,children:[Object(a.jsx)("img",{className:"container",src:b,alt:""}),Object(a.jsx)("div",{className:"centered-white",children:Object(a.jsx)("a",{id:"revokeLink",onClick:this.revokeAll,children:"Revoke All"})})]}),Object(a.jsxs)("div",{className:"container",children:[Object(a.jsx)("img",{className:"container",src:y,alt:""}),Object(a.jsx)("div",{className:"centered-white",children:Object(a.jsx)("a",{onClick:function(){window.open("https://github.com/James-Sangalli/eth-allowance/issues")},children:"Report issue"})})]})]})]})}}]),n}(s.Component),j=n(9),x=n.n(j),w=n(39),O=n(56),k=new O(O.givenProvider),g=n(439),N="0x095ea7b3",_="ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",C=n(89),I=C.ERC20ABI,M=C.ERC721ABI;function A(e,t){switch(e){case 1:return"https://api.etherscan.io/api?module=account&action=txlist&address="+t;case 3:return"https://api-ropsten.etherscan.io/api?module=account&action=txlist&address="+t;case 4:return"https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address="+t;case 42:return"https://api-kovan.etherscan.io/api?module=account&action=txlist&address="+t;case 56:return"https://api.bscscan.com/api?module=account&action=txlist&address="+t;default:return""}}function E(e){return L.apply(this,arguments)}function L(){return(L=Object(w.a)(x.a.mark((function e(t){var n,a,s,i,c,o;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,g.get(t);case 3:n=e.sent,a=[],s=JSON.parse(n.text).result,console.log("etherscan api return ",s),i=Object(d.a)(s);try{for(i.s();!(c=i.n()).done;)(o=c.value).input.includes(N)&&function(){console.log("found approve transaction");var e={};e.contract=k.utils.toChecksumAddress(o.to),e.approved=k.utils.toChecksumAddress("0x"+o.input.substring(34,74));var t=o.input.substring(74);t.includes(_)?e.allowance="unlimited":(e.allowance="some",e.allowanceUnEdited=t),0!==parseInt(t,16)?a.push(e):a=a.filter((function(t){return!(t.approved===e.approved&&t.contract===t.contract)}))}()}catch(r){i.e(r)}finally{i.f()}return e.abrupt("return",a);case 12:throw e.prev=12,e.t0=e.catch(0),e.t0;case 15:case"end":return e.stop()}}),e,null,[[0,12]])})))).apply(this,arguments)}function R(e){return B.apply(this,arguments)}function B(){return(B=Object(w.a)(x.a.mark((function e(t){var n;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,n=new k.eth.Contract(I,t),e.next=4,n.methods.name().call();case 4:return e.abrupt("return",e.sent);case 7:return e.prev=7,e.t0=e.catch(0),console.error(e.t0),e.abrupt("return",t);case 11:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}function S(){return(S=Object(w.a)(x.a.mark((function e(t,n){var a;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=new k.eth.Contract(M,t),e.prev=1,e.next=4,a.methods.ownerOf(n).call();case 4:return e.sent,e.abrupt("return",!0);case 8:return e.prev=8,e.t0=e.catch(1),e.abrupt("return",!1);case 11:case"end":return e.stop()}}),e,null,[[1,8]])})))).apply(this,arguments)}var T=n(46),U=n(47),J=n.n(U),F=n(89),D=n.p+"static/media/REVOKE_FULL_SIZE_NEON.538d2a02.png",P=n.p+"static/media/DAPP_Button_vers2.b758e653.png",V=function(e){Object(h.a)(n,e);var t=Object(f.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).props=e,a.setRevokeClick=a.setRevokeClick.bind(Object(T.a)(a)),a.dappURL=a.dappURL.bind(Object(T.a)(a)),a}return Object(m.a)(n,[{key:"dappURL",value:function(){if(void 0!==J.a[this.props.tx.contractName.toLowerCase()])return J.a[this.props.tx.contractName.toLowerCase()];for(var e=0,t=Object.keys(J.a);e<t.length;e++){var n=t[e];if(this.props.tx.contractName.toLowerCase().includes(n))return J.a[n]}return""}},{key:"setRevokeClick",value:function(){var e=this,t=new this.props.web3.eth.Contract(F.ERC20ABI,this.props.tx.contract);(function(e,t){return S.apply(this,arguments)})(t,this.props.tx.allowanceUnEdited).then((function(n){n?t.methods.approve(0,e.props.tx.allowanceUnEdited).send({from:e.props.account}).then((function(e){console.log("revoked: "+JSON.stringify(e))})).catch((function(e){console.log("failed: "+JSON.stringify(e))})):t.methods.approve(e.props.tx.approved,0).send({from:e.props.account}).then((function(e){console.log("revoked: "+JSON.stringify(e))})).catch((function(e){console.log(e),console.log("failed: "+JSON.stringify(e))}))}))}},{key:"getDappButton",value:function(){var e=this.dappURL();return""!==e?Object(a.jsxs)("div",{className:"container",children:[Object(a.jsx)("img",{className:"container",src:P,alt:""}),Object(a.jsx)("div",{className:"centered-white",children:Object(a.jsx)("a",{onClick:function(){window.open(e)},children:"Visit dApp"})})]}):Object(a.jsxs)("div",{className:"container",children:[Object(a.jsx)("img",{className:"container",src:P,alt:""}),Object(a.jsx)("div",{className:"centered-white",children:Object(a.jsx)("a",{onClick:function(){window.open("https://github.com/James-Sangalli/eth-allowance/blob/master/src/helpers/dapps.js")},children:"Add dApp"})})]})}},{key:"truncateName",value:function(e){return e.length>20?e.substring(0,17)+"...":e}},{key:"render",value:function(){return Object(a.jsx)("div",{children:Object(a.jsxs)("div",{className:"allowance",children:[Object(a.jsxs)("div",{className:"container",children:[Object(a.jsx)("img",{className:"container",src:y,alt:""}),Object(a.jsx)("div",{className:"centered",children:Object(a.jsx)("a",{href:this.props.etherscanURL+this.props.tx.contract,children:this.truncateName(this.props.tx.contractName)})})]}),Object(a.jsxs)("div",{className:"container",children:[Object(a.jsx)("img",{className:"container",src:y,alt:""}),Object(a.jsx)("div",{className:"centered",children:Object(a.jsx)("a",{href:this.props.etherscanURL+this.props.tx.approved,children:this.truncateName(this.props.tx.approvedName)})})]}),Object(a.jsxs)("div",{className:"container",children:[Object(a.jsx)("img",{className:"container",src:y,alt:""}),Object(a.jsx)("div",{className:"centered",children:this.props.tx.allowance})]}),Object(a.jsxs)("div",{className:"container",children:[Object(a.jsx)("img",{className:"container",src:D,alt:""}),Object(a.jsx)("div",{className:"centered-white",children:Object(a.jsx)("a",{name:"revoke",id:"revokeLink",onClick:this.setRevokeClick,children:"Revoke"})})]}),this.getDappButton()]})})}}]),n}(s.Component),z=function(e){Object(h.a)(n,e);var t=Object(f.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).state={txs:void 0,account:void 0},a.props=e,a}return Object(m.a)(n,[{key:"componentDidMount",value:function(){var e=this;document.getElementById("loading").hidden=!1,this.init().then((function(t){e.setState(t),0!==t.txs.length?(document.getElementById("revokeAll").hidden=!1,document.getElementById("loading").hidden=!0):document.getElementById("loading").innerText="No allowances found on this account"})).catch((function(e){console.log(e),document.getElementById("loading").innerText="No allowances found on this account"}))}},{key:"init",value:function(){var e=Object(w.a)(x.a.mark((function e(){var t,n,a,s,i,c,o;return x.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.props.web3.eth.requestAccounts();case 3:n=e.sent,t=n[0],e.next=13;break;case 7:return e.prev=7,e.t0=e.catch(0),e.next=11,window.ethereum.enable();case 11:a=e.sent,t=a[0];case 13:return e.next=15,this.props.web3.eth.getChainId();case 15:return s=e.sent,this.setState({chainId:s}),i=A(s,t),e.next=20,E(i);case 20:c=e.sent,e.t1=x.a.keys(c);case 22:if((e.t2=e.t1()).done){e.next=32;break}return o=e.t2.value,e.next=26,R(c[o].contract);case 26:return c[o].contractName=e.sent,e.next=29,R(c[o].approved);case 29:c[o].approvedName=e.sent,e.next=22;break;case 32:return e.abrupt("return",{txs:c,account:t});case 33:case"end":return e.stop()}}),e,this,[[0,7]])})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t="";if(void 0!==this.state.txs&&void 0!==this.state.chainId){var n=function(e){switch(e){case 1:return"https://etherscan.io/address/";case 3:return"https://ropsten.etherscan.io/address/";case 4:return"https://rinkeby.etherscan.io/address/";case 42:return"https://kovan.etherscan.io/address/";case 56:return"https://bscscan.com/address/";default:return""}}(this.state.chainId);t=this.state.txs.map((function(t){return Object(a.jsx)(V,{etherscanURL:n,tx:t,web3:e.props.web3,id:t.contract,account:e.state.account})}))}return Object(a.jsx)("div",{children:t})}}]),n}(s.Component),K=new u.a(u.a.givenProvider);var X=function(){return Object(a.jsxs)("div",{children:[Object(a.jsx)(v,{}),Object(a.jsx)(z,{web3:K})]})};o.a.render(Object(a.jsx)(i.a.StrictMode,{children:Object(a.jsx)(X,{})}),document.getElementById("root")),r()},47:function(e,t){e.exports={compound:"https://app.compound.finance/#",aave:"https://aave.com/",uniswap:"https://uniswap.org/",nest:"https://nestdapp.io/",cofi:"https://cofix.io/",chainlink:"https://chain.link/","usd coin":"https://www.centre.io/","tether usd":"https://tether.to/en/","true usd":"https://www.trueusd.com/",cryptokitties:"https://www.cryptokitties.co/","kyber network crystal":"https://kyber.network/","wrapped ether":"https://james-sangalli.github.io/weth-made-easy/","basic attention token":"https://basicattentiontoken.org/","dai stablecoin":"https://makerdao.com/en/",matic:"https://polygon.technology/",looksrare:"https://looksrare.org/","fantom token":"https://fantom.foundation/",kyber:"https://kyber.network/",trueusd:"https://trueusd.com/","decentraland mana":"https://decentraland.org/",sushitoken:"https://www.sushi.com/",mask:"https://mask.io/","ethereum name service":"https://ens.domains/",ape:"https://apecoin.com/",olympus:"https://www.olympusdao.finance/","shiba inu":"https://www.shibatoken.com/",zora:"https://zora.co/","0x protocol token":"https://www.0x.org/","shiba swap":"https://shibaswap.com/#/",lido:"https://lido.fi/",opensea:"https://opensea.io/"}},89:function(e,t){e.exports={ERC20ABI:[{constant:!0,inputs:[],name:"name",outputs:[{name:"",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"_spender",type:"address"},{name:"_value",type:"uint256"}],name:"approve",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"totalSupply",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"_from",type:"address"},{name:"_to",type:"address"},{name:"_value",type:"uint256"}],name:"transferFrom",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"decimals",outputs:[{name:"",type:"uint8"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"_owner",type:"address"}],name:"balanceOf",outputs:[{name:"balance",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"symbol",outputs:[{name:"",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"_to",type:"address"},{name:"_value",type:"uint256"}],name:"transfer",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{name:"_owner",type:"address"},{name:"_spender",type:"address"}],name:"allowance",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{payable:!0,stateMutability:"payable",type:"fallback"},{anonymous:!1,inputs:[{indexed:!0,name:"owner",type:"address"},{indexed:!0,name:"spender",type:"address"},{indexed:!1,name:"value",type:"uint256"}],name:"Approval",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"from",type:"address"},{indexed:!0,name:"to",type:"address"},{indexed:!1,name:"value",type:"uint256"}],name:"Transfer",type:"event"}],ERC721ABI:[{constant:!0,inputs:[],name:"name",outputs:[{name:"_name",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"_tokenId",type:"uint256"}],name:"getApproved",outputs:[{name:"_approved",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"_to",type:"address"},{name:"_tokenId",type:"uint256"}],name:"approve",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"implementsERC721",outputs:[{name:"_implementsERC721",type:"bool"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"totalSupply",outputs:[{name:"_totalSupply",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"_from",type:"address"},{name:"_to",type:"address"},{name:"_tokenId",type:"uint256"}],name:"transferFrom",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{name:"_owner",type:"address"},{name:"_index",type:"uint256"}],name:"tokenOfOwnerByIndex",outputs:[{name:"_tokenId",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"_tokenId",type:"uint256"}],name:"ownerOf",outputs:[{name:"_owner",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"_tokenId",type:"uint256"}],name:"tokenMetadata",outputs:[{name:"_infoUrl",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"_owner",type:"address"}],name:"balanceOf",outputs:[{name:"_balance",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"_owner",type:"address"},{name:"_tokenId",type:"uint256"},{name:"_approvedAddress",type:"address"},{name:"_metadata",type:"string"}],name:"mint",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"symbol",outputs:[{name:"_symbol",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"_to",type:"address"},{name:"_tokenId",type:"uint256"}],name:"transfer",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"numTokensTotal",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"_owner",type:"address"}],name:"getOwnerTokens",outputs:[{name:"_tokenIds",type:"uint256[]"}],payable:!1,stateMutability:"view",type:"function"},{anonymous:!1,inputs:[{indexed:!0,name:"_to",type:"address"},{indexed:!0,name:"_tokenId",type:"uint256"}],name:"Mint",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"_from",type:"address"},{indexed:!0,name:"_to",type:"address"},{indexed:!1,name:"_tokenId",type:"uint256"}],name:"Transfer",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"_owner",type:"address"},{indexed:!0,name:"_approved",type:"address"},{indexed:!1,name:"_tokenId",type:"uint256"}],name:"Approval",type:"event"}]}},90:function(e,t,n){}},[[446,1,2]]]);
//# sourceMappingURL=main.31797d25.chunk.js.map