import Web3 from "web3";

export const web3provider = new Web3();

export const getWeb3Provider = (provider: any) => new Web3(provider);

export const isAddress = (address: string) => web3provider.utils.isAddress(address);

export const toWei = (value: any, unit: any) => web3provider.utils.toWei(value, unit);

export const toHex = (value: any) => web3provider.utils.toHex(value);

export const toASCII = (value: any) => web3provider.utils.toAscii(value);

export const getContractMethod = (abi: any[], name: any) =>
  abi.find((item) => item.name === name && item.type === "function");

export const getMethodId = (txInput: string) => {
  const methodSignature = txInput.substring(0, 10);
  return methodSignature;
};

export const getMethodSignature = (name: string, params: null) => {
  const methodId = web3provider.eth.abi.encodeFunctionSignature(name);
  return methodId;
};

export const isTxOf = (abi: any[], name: any, txInput: string) => {
  const method = getContractMethod(abi, name);
  if (!method) return false;
  const methodId = getMethodId(txInput);
  const methodSignature = getMethodSignature(method, null);
  return methodSignature === methodId;
};

export const toChecksumAddress = (address: any) => {
  return web3provider.utils.toChecksumAddress(address);
};

export const getRPCError = (error: { message: string }) => {
  console.log("error: ", error);
  if (!error) return "";
  return error.message
    ?.split("\n")
    ?.filter((d) => d.includes("message"))[0]
    ?.split(":")
    ?.splice(1)
    ?.join(":");
};

export const gasRecommended = web3provider.utils.toHex(web3provider.utils.toWei("400", "gwei"));
