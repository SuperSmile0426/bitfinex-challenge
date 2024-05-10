import React, { useEffect } from "react";
import { AppActions } from "./redux/store";
import { useDispatch, useSelector } from "react-redux";

import { OrderBook } from "./components/view";

function App() {
  const dispatch = useDispatch();
  const { chanId } = useSelector((root) => root.book);

  const handleConnect = () => {
    dispatch(
      AppActions.book.subscribe({
        channel: "book",
        symbol: "tBTCUSD",
        prec: "P0",
        len: 25,
        freq: "F0",
      })
    );
  };

  const handleDisconnect = () => {
    dispatch(
      AppActions.book.unsubscribe({
        chanId: chanId,
      })
    );
  };

  useEffect(() => {
    handleConnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <OrderBook
      handleConnect={handleConnect}
      handleDisconnect={handleDisconnect}
    />
  );
}

export default App;
