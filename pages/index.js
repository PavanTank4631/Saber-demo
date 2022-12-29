import React, { useState } from "react";
import Box from "@mui/material/Box";
import SideDrawer from "src/components/SideDrawer";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import styles from "styles/Dashboard.module.scss";
import Transactions from "src/components/Transactions";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box>
      <Box
        className={styles.toggleButton}
        sx={{ left: isOpen ? 188 : 68 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </Box>
      <SideDrawer isOpen={isOpen} />
      <Transactions />
    </Box>
  );
};

export default Dashboard;
