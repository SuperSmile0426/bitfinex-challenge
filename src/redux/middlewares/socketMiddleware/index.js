import { WebSocketUrl } from "../../../consts";
import { AppActions } from "../../store";

export const socketMiddleware = (socket) => {
  return (params) => (next) => (action) => {
    const { dispatch } = params;
    const { type } = action;

    switch (type) {
      // Subscribe orderbook
      case AppActions.book.subscribe.type: {
        if (!socket || socket.readyState === WebSocket.CLOSED) {
          socket = new WebSocket(WebSocketUrl);

          socket.onopen = (e) => {
            // Send a subscribing messages
            if (socket.readyState === WebSocket.OPEN)
              socket.send(
                JSON.stringify({
                  event: "subscribe",
                  ...action.payload,
                })
              );
          };

          socket.onmessage = (e) => {
            const data = JSON.parse(e.data);

            const { event, chanId } = data;
            if (event === "subscribed") {
              if (data.chanId) {
                // Save chainId of subscription and use it for unsubscribing
                dispatch(AppActions.book.setChanId(chanId));
              }
            } else {
              // Receive realtime orderBook data
              if (Array.isArray(data)) dispatch(AppActions.book.setBooks(data));
            }
          };
        }

        break;
      }

      // Unsubscribe orderbook
      case AppActions.book.unsubscribe.type: {
        const { chainId } = action.payload;

        socket.onclosing = (e) => {
          socket.send(
            JSON.stringify({
              event: "unsubscribe",
              chainId,
            })
          );
        };

        socket.close();
        break;
      }
      default:
        break;
    }

    return next(action);
  };
};
