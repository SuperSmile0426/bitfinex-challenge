import React, { useEffect, useState } from "react";

import { ProgressLineContainer, Bar } from "./index.style";

export const ProgressLine = (props) => {
  const { value, color } = props;
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // You need to wrap it to trigger the animation
    requestAnimationFrame(() => {
      setWidth(value);
    });
  }, [value]);

  return (
    <ProgressLineContainer className="progress-line-container">
      <Bar
        /* eslint-disable-next-line react/no-array-index-key */
        style={{ width: `${width}%` }}
        color={color}
      />
    </ProgressLineContainer>
  );
};