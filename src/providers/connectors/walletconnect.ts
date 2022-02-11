import { IAbstractConnectorOptions, getChainId } from "../../helpers";

export interface IWalletConnectConnectorOptions
  extends IAbstractConnectorOptions {
  infuraId?: string;
  rpc?: { [chainId: number]: string };
  bridge?: string;
  qrcode?: boolean;
  qrcodeModalOptions?: { mobileLinks?: string[] };    
  pollingInterval?: number;
}

const ConnectToWalletConnect = (
  WalletConnectProvider: any,
  opts: IWalletConnectConnectorOptions
) => {
  return new Promise(async (resolve, reject) => {
    let bridge = "https://bridge.walletconnect.org";
    let qrcode = true;
    let infuraId = "";
    let rpc = undefined;
    let chainId = 1;
    let pollingInterval = 1500000;

    if (opts) {
      bridge = opts.bridge || bridge;
      qrcode = typeof opts.qrcode !== "undefined" ? opts.qrcode : qrcode;
      infuraId = opts.infuraId || "";
      rpc = opts.rpc || undefined;
      chainId =
        opts.network && getChainId(opts.network) ? getChainId(opts.network) : 1;
      qrcodeModalOptions = opts.qrcodeModalOptions || undefined;
      pollingInterval = opts.pollingInterval || 1500000;
    }

    const provider = new WalletConnectProvider({
      bridge,
      qrcode,
      infuraId,
      rpc,
      chainId,
      pollingInterval,
      qrcodeModalOptions
    });
    try {
      await provider.enable();
      resolve(provider);
    } catch (e) {
      reject(e);
    }
  });
};

export default ConnectToWalletConnect;
