import React, { useState } from "react";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import styles from "styles/SideDrawer.module.scss";
import Typography from "@mui/material/Typography";
import { tab_data } from "src/utils/helper";

const StyledBox = styled(Box)`
  background-color: #131b26;
  height: 100vh;
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.open ? "200px" : "auto")};
  color: white;
`;

const SideDrawer = ({ isOpen }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <MuiDrawer variant="permanent" open={isOpen}>
      <StyledBox open={isOpen}>
        <Box className={styles.logoContainer}>
          <img
            className={styles.logoImg}
            src="/assets/svg/app-logo.svg"
            alt="img"
          />
          {isOpen && (
            <Typography fontWeight={600} ml={2}>
              Dashboard
            </Typography>
          )}
        </Box>
        <Box className={styles.drawerBody}>
          <Box>
            {tab_data?.map((i, index) => (
              <Box
                key={index}
                className={styles.tab}
                data-is-active-tab={index === selectedTab}
                onClick={() => setSelectedTab(index)}
              >
                <Box className={styles.activeBar} />
                <img
                  src={`/assets/svg/${
                    index === selectedTab ? `${i.icon}-active` : i.icon
                  }.svg`}
                  alt="icon"
                />
                {isOpen && (
                  <Typography fontWeight={500} ml={2}>
                    {i.name}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
          <Box className={styles.bottomSection}>
            <Box className={styles.tab}>
              <img src="/assets/svg/profile.svg" alt="icon" />
              {isOpen && (
                <Typography fontWeight={500} ml={2}>
                  Profile
                </Typography>
              )}
            </Box>
            <Box className={styles.tab}>
              <img src="/assets/svg/help.svg" alt="icon" />
              {isOpen && (
                <Typography fontWeight={500} ml={2}>
                  Help
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </StyledBox>
    </MuiDrawer>
  );
};

export default SideDrawer;
