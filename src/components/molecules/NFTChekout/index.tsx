import { useEffect } from "react";
import { TransakConfig, Transak } from "@transak/transak-sdk";
import { Interface } from "ethers";
import keysABI from "../../../abi/keysABI.json";

const getSupplyCalldata = () => {
  const ABI = keysABI;
  return new Interface(ABI).encodeFunctionData("mintByAuth", []);
};

const NFTChekout = ({ setOpenTokens }: any) => {
  const calldata = getSupplyCalldata();
  const nftData: any = [
    {
      imageURL: process.env.REACT_APP_ASSETS_URL + "/keys/image/basic.jpg",
      nftName: "KEYS",
      collectionAddress:
        process.env.REACT_APP_TRANSAK_KEYS_CONTRACT || "0x649a01A7D3DF5a7E5Ee4783cCD43FBb658419001",
      tokenID: ["6", "7", "8"],
      price: [1, 1, 1],
      quantity: 3,
      nftType: "ERC721",
    },
  ];

  const transakConfig: TransakConfig = {
    apiKey: process.env.REACT_APP_TRANSAK_API_KEY || "07a89245-0fe3-40d3-9e4c-42ac7cbf19d1",
    environment:
      process.env.REACT_APP_NODE_ENV !== "production"
        ? Transak.ENVIRONMENTS.STAGING
        : Transak.ENVIRONMENTS.PRODUCTION,
    isNFT: true,
    contractId: process.env.REACT_APP_TRANSAK_CONTRACT_ID || "66c4d76d061af08419d4577f",
    nftData: nftData,
    calldata: calldata,
    cryptoCurrencyCode: "USDC",
    estimatedGasLimit: 334399,
  };

  console.log(transakConfig);

  const transak = new Transak(transakConfig);

  useEffect(() => {
    transak.init();

    return () => {
      transak.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  Transak.on("*", (data) => {
    console.log(data);
  });

  Transak.on(Transak.EVENTS.TRANSAK_WIDGET_CLOSE, () => {
    console.log("Transak SDK closed!");
    setOpenTokens(false);
  });

  Transak.on(Transak.EVENTS.TRANSAK_ORDER_CREATED, (orderData) => {
    console.log(orderData);
  });

  Transak.on(Transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
    console.log(orderData);
    transak.close();
  });

  Transak.on(Transak.EVENTS.TRANSAK_ORDER_FAILED, (orderData) => {
    console.log(orderData);
    transak.close();
  });

  return (
    <div>
      <h1>NFT Chekout</h1>
    </div>
  );
};

export default NFTChekout;
