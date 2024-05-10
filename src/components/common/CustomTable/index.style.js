import styled, { keyframes } from "styled-components";
import { BookStatus } from "../../../consts";

//animation keyframes to remove one row to table.
const fadeOut = keyframes`
  from {opacity: 1; color: white}
  to {opacity: 0.1; color: grey}
`;

//animation keyframes to add a new row to table.
const fadeIn = (tablename) => keyframes`
  from {background: ${tablename === "increase" ? "#03ca9b40" : "#e44b4440"};}
  to {background: none;}
`;

//table header depends on table name and field value
const thAlign = (tablename, key) => {
  switch (key) {
    case "count":
      return "center";
    case "price":
      return tablename === "increase" ? "right" : "left";
    default:
      return "right";
  }
};

export const Table = styled.table`
  width: 50%;
  border-spacing: 0px;
  margin-left: 1px;
`;

export const Td = styled.td`
  text-align: ${(props) => (props.align ? props.align : "right")};
  padding: 0 5px;
`;

export const Th = styled.th`
  text-align: ${(props) => thAlign(props.tablename, props.value)};
  color: #999999;
  font-size: 12px;
  padding: 0 5px;
`;

export const Tr = styled.tr`
  position: relative;
  animation: ${(props) =>
      props.status &&
      (props.status === BookStatus.REMOVABLE
        ? fadeOut
        : fadeIn(props.tablename))}
    0.5s ease-out;
  .progress-line-container {
    flex-direction: ${(props) =>
      props.tablename === "increase" ? "row-reverse" : "unset"};
  }
`;
