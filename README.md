# Bitfinex Order Book Widget

This project is a simplified web application that replicates the functionality of the Order Book widget from the Bitfinex trading page. It displays real-time order book data with the ability to adjust the price precision, and it maintains its state after network disconnections.

## Features

- Real-time order book updates.
- Precision control for the price column.
- Ability to reconnect after losing network connection.
- "Connect" and "Disconnect" buttons to manage WebSocket connection.

## Installation

Make sure you have [Node.js](https://nodejs.org/) installed on your system. You can then set up the project with the following commands:

```bash
# Clone the repository
git clone https://github.com/SuperSmile0426/bitfinex-challenge.git

# Go into the project directory
cd bitfinex-challenge

# Install dependencies
npm install

# Start the development server
npm start
```

This will launch the application in your default web browser at `http://localhost:3000/`.

## Usage

Once the application is running, you can interact with the widget as follows:

- Use the precision control to change the granularity of the price column.
- Click the "Connect" button to establish a connection to the Bitfinex WebSocket API and start receiving live data.
- Click the "Disconnect" button to close the WebSocket connection.

## Technologies Used

- [React](https://reactjs.org/): A JavaScript library for building user interfaces.
- [Redux](https://redux.js.org/): A predictable state container for JavaScript applications.
- [Bitfinex WebSocket V2 API](https://docs.bitfinex.com/v2/docs): Provides the real-time market data.

## Acknowledgements

- [Bitfinex](https://www.bitfinex.com/trading) for the API and design inspiration.
- [Create React App](https://github.com/facebook/create-react-app) for the project template.