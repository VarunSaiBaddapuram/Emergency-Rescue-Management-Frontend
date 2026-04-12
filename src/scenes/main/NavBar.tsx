import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/auth";
import { Role } from "../../types/auth.types";

const drawerWidth = 240;

interface NavItem {
  name: string;
  link: string;
}

const mainNavItems: NavItem[] = [
  { name: "Home", link: "/" },
  { name: "Do's and Don'ts", link: "/do&donts" },
  { name: "Support", link: "/Donate" },
  { name: "News Feed", link: "/NewsFeed" },
];

const reliefNavItems: NavItem[] = [
  ...mainNavItems,
  { name: "Relief Centers", link: "/agency/relief-center" },
  { name: "My Relief Center", link: "/agency/my-relief-center" },
];

const collectionNavItems: NavItem[] = [
  ...mainNavItems,
  { name: "Collection Centers", link: "/agency/collection-center" },
  { name: "My Collection Center", link: "/agency/my-collection-center" },
];

interface DrawerAppBarProps {
  window?: () => Window;
}

const NavBar: React.FC<DrawerAppBarProps> = (props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate(`/agency`);
  };

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItemsByRole: Record<Role | "default", NavItem[]> = {
    default: mainNavItems,
    reliefCenter: reliefNavItems,
    collectionCenter: collectionNavItems,
    admin: [...mainNavItems, ...reliefNavItems, ...collectionNavItems], // Access to all
  };

  let currentNavItems = mainNavItems;
  if (isAuthenticated && user && user.role) {
    currentNavItems = navItemsByRole[user.role] || mainNavItems;
  }

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        ALERT
      </Typography>
      <Divider />
      <List>
        {currentNavItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton
              component={Link}
              to={item.link}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" position="sticky">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            ALERT
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {currentNavItems.map((item) => (
              <Button
                key={item.name}
                component={Link}
                to={item.link}
                sx={{ color: "#fff" }}
              >
                {item.name}
              </Button>
            ))}
            {!isAuthenticated ? (
              <Button component={Link} to="/agency" sx={{ color: "#fff" }}>
                Agency Login
              </Button>
            ) : (
              <Button onClick={handleLogout} sx={{ color: "#fff" }}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default NavBar;
