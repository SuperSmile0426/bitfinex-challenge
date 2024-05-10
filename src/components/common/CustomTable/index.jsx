import React from "react";
import { TableHeader } from "../../../consts";
import sumBy from "lodash/sumBy";
import { Table, Td, Th, Tr } from "./index.style";
import { ProgressLine } from "../ProgressLine";

const IncreaseTr = React.memo(function (props) {
  const { price, count, amount, total, size, status } = props;

  return (
    <Tr status={status} tablename="increase">
      <Td align="center">{count}</Td>
      <Td>{amount.toFixed(4)}</Td>
      <Td>{total.toFixed(4)}</Td>
      <Td>{price}</Td>
      <ProgressLine value={size} color="#03ca9b40" />
    </Tr>
  );
});

const DecreaseTr = React.memo(function (props) {
  const { price, count, amount, total, size, status } = props;

  return (
    <Tr status={status} tablename="decrease">
      <Td align="left">{price}</Td>
      <Td>{Math.abs(total.toFixed(4))}</Td>
      <Td>{Math.abs(amount.toFixed(4))}</Td>
      <Td align="center">{count}</Td>
      <ProgressLine value={size} color="#e44b4440" />
    </Tr>
  );
});

export const CustomTable = React.memo(function (props) {
  const { data, tablename } = props;
  const sum = sumBy(data, "amount");
  let total = 0;

  return (
    <Table>
      <thead>
        <tr>
          {(tablename === "increase"
            ? TableHeader
            : [...TableHeader].reverse()
          ).map((item, index) => (
            <Th key={index} tablename={tablename} value={item}>
              {item.toUpperCase()}
            </Th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.slice(0, 24).map(({ price, count, amount, status }, index) => {
          total += amount;
          const table =
            tablename === "increase" ? (
              <IncreaseTr
                key={index}
                price={price}
                count={count}
                amount={amount}
                total={total}
                size={(total / sum) * 100}
                status={status}
              />
            ) : (
              <DecreaseTr
                key={index}
                price={price}
                count={count}
                amount={amount}
                total={total}
                size={(total / sum) * 100}
                status={status}
              />
            );
          return table;
        })}
      </tbody>
    </Table>
  );
});
