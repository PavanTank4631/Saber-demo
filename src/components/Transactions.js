import React from "react";
import Box from "@mui/material/Box";
import styles from "styles/Transactions.module.scss";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import TransactionTable from './TransactionTable';

const Transactions = () => {
  return (
    <Container className={styles.main}>
      <Box className={styles.header}>
        <Typography fontSize={22} fontWeight={500}>Transactions</Typography>
        <Box display='flex' gap={2}>
          <FilledInput
            size="small"
            className={styles.searchBox}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
          <Box className={styles.calenderButton}>
            <img src="/assets/svg/calender.svg" alt="icon" />
          </Box>
        </Box>
      </Box>

      <TransactionTable />
    </Container>
  );
};

export default Transactions;
