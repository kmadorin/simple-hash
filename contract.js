const getHashContractText = () => {
	const contract = `{-# STDLIB_VERSION 3 #-}
{-# CONTENT_TYPE DAPP #-}
{-# SCRIPT_TYPE ACCOUNT #-}

@Callable(i)
func checkHash(preimage: String) = {
    let hash = "5mkr4gvqD3vL5JLQCgd7UGx6hjtbUt4fdrPE6uMWsYoi"
    let caller = toBase58String(i.caller.bytes)
    if (hash == toBase58String(sha256(fromBase58String(preimage)))) then {
        WriteSet([DataEntry(caller, true)])
    } else {
        throw("preimage is not for the hash in the contract")
    }
}`;
	return contract;
}

module.exports = getHashContractText