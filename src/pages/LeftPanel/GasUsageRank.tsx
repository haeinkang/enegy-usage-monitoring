import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { map } from "lodash";
import { GasUsageByLclgv } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { getGasUsageColor } from "../../utils";

function GasUsageRank() {
  const gasUsage = useSelector((state: RootState) => state.gasUsage.data);

  return (
    <Grid
      container
      flexDirection="column"
      flexWrap="nowrap"
      sx={{ height: "100%" }}
    >
      <Grid item flexGrow={1} sx={{ overflow: "auto" }}>
        <List dense disablePadding sx={{ width: "100%", overflow: "auto" }}>
          {map(gasUsage, (item, idx) => (
            <GasUsageItem key={`pm10-${idx}`} item={item} index={idx} />
          ))}
        </List>
      </Grid>
    </Grid>
  );
}

const GasUsageItem = ({
  item,
  index,
}: {
  item: GasUsageByLclgv;
  index: number;
}) => {
  const maxGasUsage = useSelector((state: RootState) => state.gasUsage.max);

  const listItemRef = useRef<HTMLLIElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 } // 요소가 50% 이상 보일 때 감지
    );

    if (listItemRef.current) {
      observer.observe(listItemRef.current);
    }

    return () => {
      if (listItemRef.current) {
        observer.unobserve(listItemRef.current);
      }
    };
  }, []);

  const region = item.lclgvNm.split(" ");

  return (
    <ListItem
      ref={listItemRef}
      disablePadding
      sx={{
        borderRadius: "3px",
        marginBottom: 0.5,
        bgcolor: isVisible
          ? "rgba(255, 255, 255, 0.09)"
          : "rgba(255, 255, 255, 0.3)",
        transition: "background-color 0.3s ease",
      }}
    >
      <ListItemButton dense>
        <Grid container gap={1.5} alignItems="center">
          <span>{index + 1}</span>
          <Mark value={item.avgUseQnt} max={maxGasUsage?.avgUseQnt || 0} />
          <ListItemText primary={region[0]} secondary={region[1]} />
          <span>{`${item.avgUseQnt} ㎥`}</span>
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

export default GasUsageRank;

const Mark = styled.div<{ value: number; max: number }>`
  width: 1rem;
  height: 1rem;
  border-radius: 0.125rem;
  background: ${(props) => getGasUsageColor(props.max, props.value)};
`;
