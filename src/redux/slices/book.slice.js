import { createSlice } from "@reduxjs/toolkit";
import { DECREASE, INCREASE, BookStatus } from "../../consts";
import findIndex from "lodash/findIndex";

const initialState = {
  chanId: "",
  channel: "",
  increase: [],
  decrease: [],
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    subscribe(state, action) {},
    unsubscribe(state, action) {},

    setChanId(state, action) {
      state.chanId = action.payload;
    },
    setChannel(state, action) {
      state.channel = action.payload;
    },

    // Store orderBook data and process it. Divide it into increate and descrease arrays
    setBooks(state, action) {
      const [chainId, books] = action.payload;

      if (chainId === state.chanId && Array.isArray(books)) {
        // The first received data is an array of 50 order books but from second data it receives order book data one by one
        if (Array.isArray(books[0])) {
          state.increase = [];
          state.decrease = [];

          // Divide the books into increase and descrease arrays depending on amount of an book element
          books.forEach((book) => {
            // eslint-disable-next-line no-unused-vars
            const [price, count, amount] = book;
            if (amount > 0) {
              state.increase.push({
                price,
                count,
                amount,
                status: BookStatus.DEFAULT,
              });
            } else {
              state.decrease.push({
                price,
                count,
                amount,
                status: BookStatus.DEFAULT,
              });
            }
          });
        } else {
          const [price, count, amount] = books;
          const bookType = amount > 0 ? INCREASE : DECREASE;

          // Remove orderBook data from increase and decrease array to keep the length of table
          if (state[bookType].length > 25) {
            let removableCount = state[bookType].length - 25;
            state[bookType] = state[bookType].filter((item) => {
              if (!removableCount) return true;
              if (item.status === BookStatus.REMOVABLE) removableCount--;
              return item.status !== BookStatus.REMOVABLE;
            });
          }

          const index = findIndex(state[bookType], {
            price,
          });

          if (count === 0) {
            // This orderBook is removable data
            state[bookType][index].status = BookStatus.REMOVABLE;
          } else if (index >= 0) {
            // OrderBook price is existing in the current array, just update it
            state[bookType][index] = {
              price,
              count,
              amount,
              status: BookStatus.DEFAULT,
            };
          } else {
            // OrderBook price is not exist so need to be added
            state[bookType].push({
              price,
              count,
              amount,
              status: BookStatus.CREATED,
            });
          }
        }
      }

      // sort data
      state.increase.sort((book1, book2) => book2.price - book1.price);
      state.decrease.sort((book1, book2) => book2.price - book1.price);
    },
  },
});

export const reducer = bookSlice.reducer;
export const actions = bookSlice.actions;
