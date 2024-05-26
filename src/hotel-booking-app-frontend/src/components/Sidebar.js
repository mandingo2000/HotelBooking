import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import HomeIcon from '@mui/icons-material/Home';
import ListItemIcon from '@mui/material/ListItemIcon';

import lakefrontImage from '../Assets/Icons/Lakefront.jpg';
import AmazingViewsImage from '../Assets/Icons/AmazingViews.jpg';
import AmazingPoolsImage from '../Assets/Icons/AmazingPools.jpg';
import trendingimage from '../Assets/Icons/Trending.jpg';
import countrysideImage from '../Assets/Icons/CountrySide.jpg';
import beachfrontImage from '../Assets/Icons/Beachfront.jpg';
import luxeImage from '../Assets/Icons/Luxe.jpg';
import logoImage from '../Assets/Icons/logo.png';

function Sidebar({ onFilterChange }) {
  const handleListItemClick = (filterType) => {
    onFilterChange(filterType === 'Home' ? '' : filterType); 
    console.log('Filter set to:', filterType);
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{ width: 240, flexShrink: 0, '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' } }}
    >
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar alt="Logo" src={logoImage} sx={{ width: 156, height: 156, display:'flex', justifyContent:'space-evenly'}} />
          </ListItemAvatar>
        </ListItem>
        <ListItem button key="Home" onClick={() => handleListItemClick('')}>
          <ListItemIcon>
              <HomeIcon style={{ fontSize: '40px' }} />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        <h2 style={{ marginLeft: '16px', marginTop: '20px' }}>Discover Hotels</h2>

        <ListItem button key="Lakefront" onClick={() => handleListItemClick('Lakefront')}>
          <ListItemAvatar>
            <Avatar alt="Lakefront" src={lakefrontImage} />
          </ListItemAvatar>
          <ListItemText primary="Lakefront" />
        </ListItem>
        <ListItem button key="AmazingViews" onClick={() => handleListItemClick('Amazing Views')}>
          <ListItemAvatar>
            <Avatar alt="Amazing Views" src={AmazingViewsImage} />
          </ListItemAvatar>
          <ListItemText primary="Amazing Views" />
        </ListItem>
        <ListItem button key="AmazingPools" onClick={() => handleListItemClick('Amazing Pools')}>
          <ListItemAvatar>
            <Avatar alt="Amazing Pools" src={AmazingPoolsImage} />
          </ListItemAvatar>
          <ListItemText primary="Amazing Pools" />
        </ListItem>
        <ListItem button key="Trending" onClick={() => handleListItemClick('Trending')}>
          <ListItemAvatar>
            <Avatar alt="Trending" src={trendingimage} />
          </ListItemAvatar>
          <ListItemText primary="Trending" />
        </ListItem>
        <ListItem button key="CountrySide" onClick={() => handleListItemClick('Countryside')}>
          <ListItemAvatar>
            <Avatar alt="Countryside" src={countrysideImage} />
          </ListItemAvatar>
          <ListItemText primary="Countryside" />
        </ListItem>
        <ListItem button key="Beachfront" onClick={() => handleListItemClick('Beachfront')}>
          <ListItemAvatar>
            <Avatar alt="Beachfront" src={beachfrontImage} />
          </ListItemAvatar>
          <ListItemText primary="Beachfront" />
        </ListItem>
        <ListItem button key="Luxe" onClick={() => handleListItemClick('Luxe')}>
          <ListItemAvatar>
            <Avatar alt="Luxe" src={luxeImage} />
          </ListItemAvatar>
          <ListItemText primary="Luxe" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
