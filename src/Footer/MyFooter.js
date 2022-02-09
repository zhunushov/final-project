import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SignalCellularOffIcon from "@mui/icons-material/SignalCellularOff";
// import "../HeadersHome/HeadersHome.css";
// import "../Cart/cart.css";

const MyFooter = () => (
  <>
    <AppBar position="static" elevation={0} component="footer" style={{marginTop: "-9px"}}>
      <Toolbar style={{ justifyContent: "space-between", margin: "20px" }}>
        <ul style={{listStyle: 'none'}}>
          <li>
            <AccountBoxIcon color="secondary" />
            <span>Связь с нами</span>
          </li>
          <li>
            <YouTubeIcon color="secondary" />
            <span>YouTube</span>
          </li>
        </ul>
        <ul  style={{listStyle: 'none'}}>
          <li>
            <TwitterIcon color="secondary" />
            <span>Twitter</span>
          </li>
          <li>
            <TelegramIcon color="secondary" />
            <span>Telegram</span>
          </li>
        </ul>
        <ul  style={{listStyle: 'none'}}>
          <li>
            <SupportAgentIcon color="secondary" />
            <span>Служба подержки</span>
          </li>
          <li>
            <SignalCellularOffIcon color="secondary" />
            <span>Перед полетом не забудьте выключить </span>
          </li>
        </ul>
        {/* <Typography variant="caption">©2020</Typography> */}
      </Toolbar>
    </AppBar>
  </>
);

export default MyFooter;