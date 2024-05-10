import React from "react";
import { CustomTable } from "../../common/CustomTable";
import {
  BackgroundStyle,
  ButtonContainer,
  TableContainer,
} from "./index.style";
import { Button } from "../../common";
import { useSelector } from "react-redux";

export const OrderBook = React.memo((props) => {
  const { increase, decrease } = useSelector((root) => root.book);
  const { handleConnect, handleDisconnect } = props;

  return (
    <BackgroundStyle>
      <TableContainer>
        <CustomTable data={increase} tablename="increase" />
        <CustomTable data={decrease} tablename="decrease" />
      </TableContainer>
      <ButtonContainer>
        <Button onClick={handleConnect}>Connect</Button>
        <Button onClick={handleDisconnect}>Disconnect</Button>
      </ButtonContainer>
    </BackgroundStyle>
  );
});
