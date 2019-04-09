const wc = require('@waves/waves-crypto');
const { invokeScript } = require('@waves/waves-transactions');

const { broadcastAndWait, broadcast } = require('./api');
const { sender } = require('./accounts');


const code = 888689;
const base58Code = wc.base58encode(Uint8Array.from(code.toString().split("")));

const params = {
  dappAddress: '3N3HUBnBZdc4oUZnkLUuvxRzDo6xb5kT3wr',
  call: {
    function: 'checkHash',
    args: [{
    	key: 'preimage',
      type: 'string',
      value: base58Code,
    }],
  },
  chainId: 84
}

const signedInvokeScriptTx = invokeScript(params, sender);

broadcastAndWait(signedInvokeScriptTx, 1000 * 60 * 2)
	.then(res => console.log(res))
	.catch(e => console.log(e));