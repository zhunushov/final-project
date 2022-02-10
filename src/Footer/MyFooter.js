import React, { useContext } from "react";
import { AppBar, Badge, Toolbar } from "@material-ui/core";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import { Bookmark, Chat, Map, ShoppingCart } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { hotelsContext } from "../MyContext/MyContext";

const MyFooter = () => {
    const { cartLength, favoriteLength } = useContext(hotelsContext)

 return (
     <>
     <AppBar position="static" elevation={0} component="footer" 
    //  style={{marginTop: "-9px"}}
     >
      <Toolbar style={{ justifyContent: "space-between", margin: "20px" }}>
        <ul style={{listStyle: 'none',paddingLeft:'0'}}
        >
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
            <Link to="/map">
            <Map fontSize="large"  color="secondary"/>
            </Link>
          </li>

        </ul>
        <ul  style={{listStyle: 'none'}}>
          <li>
            <Link to="/cart">
            <Badge badgeContent={cartLength} color="secondary">
            <ShoppingCart color="secondary"/>
            </Badge>
            </Link>
          </li>
          <li>
            <Link to='fav'>
            <Badge badgeContent={favoriteLength} color="secondary">
              <Bookmark color="secondary" />
            </Badge>
            </Link>
          </li>
        </ul>
      </Toolbar>
    </AppBar>
  </>
  )

 }
export default MyFooter;