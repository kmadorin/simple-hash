const axios = require('axios');

const { baseUri } = require('./config');

const waitForTx = async (txId, timeout, interval) => {
	const endTime = Number(new Date()) + (timeout);
  
	const run = (resolve, reject) => {
     	axios.get(`${baseUri}transactions/info/${txId}`, { validateStatus: function (status) {
        return status < 500; // Reject only if the status code is greater than or equal to 500
      }}).then(res => {
        if (res.status == 200) {
          resolve(res.data.id)
        } else if (res.data.status == 'error') {
          if (Number(new Date()) < endTime) {
            console.log("Transaction has not been added to blockchain yet");
            setTimeout(run, interval, resolve, reject);
          } else reject(new Error('timed out while wating transaction adding to blockchain'));
        }
        else reject(new Error('request error'));      
      });
  };
  return new Promise(run);
}

const broadcast = async (tx) =>
  await axios.post(baseUri + 'transactions/broadcast', tx, { headers: { 'Content-Type': 'application/json' } })
    .then(x => x.data)

const broadcastAndWait = async (tx, timeout = 1000 * 60 * 2, interval = 1000) => {
  const r = await broadcast(tx);
  return await waitForTx(r.id, timeout, interval)
}

module.exports = {broadcast, broadcastAndWait, waitForTx}
