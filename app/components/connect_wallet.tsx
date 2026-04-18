import { useConnect, useConnectors, useConnection, useDisconnect } from "wagmi";

export function ConnectWallet() {
  const connect = useConnect();
  const connectors = useConnectors();
  const connection = useConnection();
  const address = connection.address;
  const disconnect = useDisconnect();

  if (connect.isSuccess) {
    return (
      <div>
        <p>
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </p>
        <button onClick={() => disconnect.mutate()}>Disconnect</button>
      </div>
    );
  }

  return (
    <div className="text-3xl color-white">
      aaa
      {connectors.map((connector) => (
        <p key={connector.uid}>
          <button
            className="text-white"
            type="button"
            onClick={() => {
              console.log("I am clicked");
              connect.mutate(
                { connector },
                {
                  onError: (err) => console.error("connect error", err),
                  onSuccess: (data) => console.log("connect success", data),
                },
              );
            }}
          >
            {connector.name}
          </button>{" "}
        </p>
      ))}
      {connect.error && (
        <p className="text-red-500 text-base">Error: {connect.error.message}</p>
      )}
    </div>
  );
}
