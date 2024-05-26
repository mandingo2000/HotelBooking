import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Sidebar from './components/Sidebar';
import { HotelCard } from './components/HotelCard';
import Masonry from 'react-masonry-css';
import './App.css';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import axios from 'axios';
// import { fil } from 'date-fns/locale';

function App() {
  const [hotels, setHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);


  useEffect(() => {
    axios.get('http://localhost:5200/api/Hotels')
      .then(response => {
        setHotels(response.data);
      })
      .catch(error => console.error('Error fetching hotels:', error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleLike = (HotelId) => {
    const updatedHotels = hotels.map(hotel => {
      const newHotel = hotel.hotelId === HotelId ? { ...hotel, liked: !hotel.liked } : hotel
      return newHotel
    }
    );
    setHotels(updatedHotels);
    // console.log("Like doggled on hotel ID:", HotelId);
    // console.log("Updated hotels", updatedHotels)
  };

  const bookHotel = (HotelId) => {
    const updatedHotels = hotels.map(hotel =>
      hotel.hotelId === HotelId ? { ...hotel, booked: true } : hotel

    );
    setHotels(updatedHotels);
    // console.log("Booking hotel with ID:", HotelId);

  };


  // const sidebarfilter = filter ? hotels.filter(hotel => hotel.Type === filter) : hotels;

    let filteredHotels = hotels.filter(hotel => {
      const isFiltered = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                     (!filter || hotel.type === filter ||
                     (filter === 'liked' && hotel.liked) ||
                     (filter === 'booked' && hotel.booked));
  if (filter === 'booked') {
    console.log('Filtering for booked hotels:', hotel.name, 'Booked:', hotel.booked);
  }
  return isFiltered;

  });
  
  filteredHotels = filteredHotels.filter(hotel => {
    if (filter === 'booked'){
      return hotel.booked 
    }else{return true}

  })
  
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleMyBookings = () => {
    setFilter('booked');
  };

  const handleFavoritesFilterChange = () => {
    setFilter('liked');
  };
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
  };

  const StyledButton = styled(Button)({
    backgroundColor: '#1976d2',
    color: 'white',
    padding: '6px 16px',
    fontSize: '0.875rem',
    margin: '0 8px',
    '&:hover': {
      backgroundColor: '#115293',
    },
  });

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar onFilterChange={handleFilterChange} />
      <main style={{ flexGrow: 1, padding: '20px', paddingTop:'70px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <TextField
            fullWidth
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search hotels by location..."
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            style={{ width: '40%', margin: 0 }}
          />
          <StyledButton onClick={handleMyBookings}>My Bookings</StyledButton>
          <StyledButton onClick={handleFavoritesFilterChange}>{showFavorites ? 'Show All' : 'My Favorites'}</StyledButton>

        </div>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {filteredHotels.map(hotel => (
            <HotelCard key={hotel.hotelId} hotel={hotel} toggleLike={toggleLike} bookHotel={bookHotel}/>
          ))}
        </Masonry>
      </main>
    </div>
  );
}

export default App;
