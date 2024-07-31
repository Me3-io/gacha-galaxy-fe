import { Menu, MenuItem, ListItemIcon } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// flags ---
import aeIcon from "assets/flags/AE.svg";
import brIcon from "assets/flags/BR.svg";
import cnIcon from "assets/flags/CN.svg";
import idIcon from "assets/flags/ID.svg";
import jpIcon from "assets/flags/JP.svg";
import krIcon from "assets/flags/KR.svg";
import trIcon from "assets/flags/TR.svg";
import gbIcon from "assets/flags/GB.svg";
import vnIcon from "assets/flags/VN.svg";

import styled from "./styled.module.scss";

const languages = [
  { name: "English", code: "en", icon: gbIcon },
  { name: "Türkçe", code: "tr", icon: trIcon },
  { name: "Português", code: "pt", icon: brIcon },
  { name: "العربية", code: "ar", icon: aeIcon },
  { name: "한국어", code: "ko", icon: krIcon },
  { name: "日本語", code: "ja", icon: jpIcon },
  { name: "Tiếng Việt", code: "vi", icon: vnIcon },
  { name: "Bahasa Indonesia", code: "id", icon: idIcon },
  { name: "简体中文", code: "cn", icon: cnIcon },
];

const LanguageMenu = ({ anchorEl, open, handleClose }: any) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const changeLanguageHandler = (code: string) => {
    i18n.changeLanguage(code);
    navigate(`/${code}/`);
    handleClose();
  };

  return (
    <Menu
      id="language-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      className={styled.menu}
      sx={{
        "& .MuiMenu-paper": {
          backgroundColor: "#150a21",
          padding: "10px",
          marginTop: "20px",
        },
      }}
    >
      {languages.map((item, pos) => (
        <MenuItem
          key={pos}
          className={styled.item}
          onClick={() => changeLanguageHandler(item.code)}
        >
          <ListItemIcon aria-label="icon" color="inherit">
            <img src={item.icon} alt="flag" />
          </ListItemIcon>
          {item.name}
        </MenuItem>
      ))}
    </Menu>
  );
};
export default LanguageMenu;
