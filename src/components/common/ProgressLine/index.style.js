import styled from "styled-components";

export const ProgressLineContainer = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  display: flex;
  width: 100%;
  height: 100%;
`;

export const Bar = styled.div`
  transition: width 0.5s;
  background-color: ${(props) => props.color};
`;