import React, { useState, useMemo, useCallback } from "react";
import styles from "styles/TransactionTable.module.scss";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { table_data, table_head_titles } from "src/utils/helper";
import Typography from "@mui/material/Typography";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import usePagination from "src/hooks/usePagination";
import { Button } from "@mui/material";

const TransactionTable = () => {
  const [collapsedIndex, setCollapsedIndex] = useState();
  const [selections, setSelections] = useState([]);

  const pagination = usePagination(table_data, 3);

  const onSelectAll = (e) => {
    if (!e.target.checked) {
      setSelections([]);
    } else {
      setSelections(pagination.data?.map((i, index) => index));
    }
  };

  const onSelect = (index) => {
    if (selections?.includes(index)) {
      setSelections(selections?.filter((i) => i !== index));
    } else {
      setSelections([...selections, index]);
    }
  };

  const onNextPage = useCallback(() => {
    setSelections([]);
    setCollapsedIndex();
    pagination.setPage((prevState) => {
      if (prevState < pagination.totalPages) {
        return prevState + 1;
      }

      return prevState;
    });
  }, [pagination.totalPages]);

  const onPrevPage = useCallback(() => {
    setSelections([]);
    setCollapsedIndex();
    pagination.setPage((prevState) => {
      if (prevState > 0) {
        return prevState - 1;
      }

      return prevState;
    });
  }, []);

  return (
    <Box className={styles.main}>
      <Box className={styles.header}>
        <Checkbox
          onChange={onSelectAll}
          checked={selections?.length === pagination.data?.length}
          sx={{ "& .MuiSvgIcon-root": { fontSize: 40 }, color: "gray" }}
        />
        {table_head_titles?.map((i, index) => (
          <Box key={index} fontWeight={500}>
            {i} <img src="/assets/svg/dropdown.svg" alt="icon" />
          </Box>
        ))}

        <Box className={styles.moreIcon}>
          <MoreVertIcon />
        </Box>
      </Box>
      <Box className={styles.list}>
        {pagination.data?.map((i, index) => {
          return (
            <>
              <Box
                key={index}
                className={styles.listItem}
                data-is-collapsed={index === collapsedIndex}
              >
                <Checkbox
                  checked={selections?.includes(index)}
                  onChange={() => onSelect(index)}
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 40 }, color: "gray" }}
                />
                <Typography fontWeight={500}>{i.card_number}</Typography>
                <Typography fontWeight={500}>{i.processed_date}</Typography>
                <Typography fontWeight={500}>${i.purchase_amount}</Typography>
                <Box
                  sx={{
                    bgcolor:
                      i.transaction_status === "completed" ? "#46B474" : "#B44646",
                  }}
                >
                  {i.transaction_status}
                </Box>
                {index === collapsedIndex ? (
                  <img
                    src="/assets/svg/close.svg"
                    alt="icon"
                    onClick={setCollapsedIndex}
                  />
                ) : (
                  <img
                    src="/assets/svg/plus.svg"
                    alt="icon"
                    onClick={() => setCollapsedIndex(index)}
                  />
                )}
              </Box>
              {index === collapsedIndex && (
                <Box className={styles.details}>
                  <Box className={styles.itemDetails}>
                    <Typography>Transaction ID: SB0784-1494818</Typography>
                    <Typography>Recharges: 1/3</Typography>
                    <Typography>Disputed: False</Typography>
                    <Typography>Order Number: #10001</Typography>
                  </Box>
                  <Box className={styles.itemDetails}>
                    <Typography>Time Charged: 1:35 PM PST</Typography>
                    <Typography>Rechargeable: True</Typography>
                    <Typography>Fee: $1.69</Typography>
                    <Typography>Payment: $22.2</Typography>
                  </Box>
                  <Box className={styles.itemDetails}>
                    <Typography>
                      Billing Descriptor: SBLiquid123 5598548614
                    </Typography>
                    <Typography>Response Code: 1</Typography>
                    <Typography>Payout Completed: True</Typography>
                    <Typography>Rate: 90%</Typography>
                  </Box>
                </Box>
              )}
            </>
          );
        })}
      </Box>
      <Box className={styles.footer}>
        <Button
          className={styles.paginationButton}
          onClick={onPrevPage}
          disabled={pagination.page === 0}
        >
          <ArrowBackIosIcon sx={{ mr: 1 }} />
          Previous
        </Button>
        <Typography>
          Page {pagination.page + 1} of {pagination.totalPages}
        </Typography>
        <Button
          disabled={pagination.totalPages === pagination.page + 1}
          className={styles.paginationButton}
          onClick={onNextPage}
        >
          Next
          <ArrowForwardIosIcon sx={{ ml: 1 }} />
        </Button>
      </Box>
    </Box>
  );
};

export default TransactionTable;
