const { setScript } = require('@waves/waves-transactions');
const wc = require('@waves/waves-crypto');
const { broadcastAndWait } = require("./api");
const compile = require('./compile');
const { simpleHashAcc } = require('./accounts');
const getHashContractText = require('./contract');


const deploy = (seed, contract) => {
  console.log(wc.address(seed, 'T'));
  const compiledContract = compile(contract);

  const params = {
    script: compiledContract, 
    fee: 1400000,
    chainId: 84
  }
  
  const signedSetScriptTx = setScript(params, seed);
  broadcastAndWait(signedSetScriptTx, 1000 * 60 * 2)
    .then(res => console.log(res))
    .catch(e => console.log(e));
}

deploy(simpleHashAcc, getHashContractText())
