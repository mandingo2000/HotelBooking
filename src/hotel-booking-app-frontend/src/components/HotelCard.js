import React, { useState } from 'react';
import {
  Card, CardMedia, CardContent, Typography, IconButton, Dialog, DialogTitle,
  DialogContent, DialogActions, Button, TextField, Box,
  FormControl, InputLabel, Select, MenuItem, FormControlLabel, Checkbox
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { differenceInCalendarDays } from 'date-fns';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const HotelCard = ({ hotel, toggleLike, bookHotel }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [numPeople, setNumPeople] = useState(1);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [roomType, setRoomType] = useState('standard');
  const [breakfastIncluded, setBreakfastIncluded] = useState(false);

  const calculateTotalCost = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const roomRates = {
      standard: 100,
      deluxe: 150,
      suite: 200
    };
    const cleaningFee = 20;
    const breakfastPricePerPersonPerDay = 15;
    const numberOfNights = differenceInCalendarDays(new Date(checkOutDate), new Date(checkInDate));
    const nights = numberOfNights > 0 ? numberOfNights : 1;
    const roomCost = nights * (roomRates[roomType] || 0);
    const breakfastCost = breakfastIncluded ? (nights * numPeople * breakfastPricePerPersonPerDay) : 0;
    return roomCost + breakfastCost + cleaningFee;
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleLike(hotel.hotelId);
  };

  const handleBook = (e) => {
    e.stopPropagation();
    if (!hotel.booked) {
      bookHotel(hotel.hotelId, numPeople, checkInDate, checkOutDate);
    }
    handleClose();
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const nextImage = (e) => {
    e.stopPropagation();
    setImageIndex((prevIndex) => (prevIndex + 1) % hotel.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setImageIndex((prevIndex) => (prevIndex - 1 + hotel.images.length) % hotel.images.length);
  };
    
    return (
        <>
            <Card className='' sx={{ maxWidth: 345, position: 'relative', marginBottom: 2 }} onClick={handleClickOpen}>
                <div style={{ position: 'relative' }}>
                    <CardMedia
                        component="img"
                        height="300"
                        image={hotel.images[imageIndex]}
                        alt={hotel.name}
                    />
                    <IconButton
                        onClick={(e) => handleFavoriteClick(e, hotel.HotelId)}
                        style={{ position: 'absolute', top: 10, right: 10, color: 'white' }}
                    >
                        {hotel.liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                    </IconButton>
                    <IconButton
                        onClick={prevImage}
                        style={{ position: 'absolute', left: 10, top: '50%', color: 'white' }}
                    >
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <IconButton
                        onClick={nextImage}
                        style={{ position: 'absolute', right: 10, top: '50%', color: 'white' }}
                    >
                        <ArrowForwardIosIcon />
                    </IconButton>
                </div>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {hotel.name}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                        {hotel.location}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary">
                        ${hotel.price} per night
                    </Typography> */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <StarIcon fontSize="small" style={{ marginRight: 4 }} />
                        <Typography variant="body2" color="text.secondary" style={{ lineHeight: 'normal' }}>
                            {hotel.rating}/5
                        </Typography>
                    </div>
                </CardContent>
            </Card>

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>Booking Information</DialogTitle>
            <DialogContent>
                <Box style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconButton
                onClick={() => setImageIndex((imageIndex - 1 + hotel.images.length) % hotel.images.length)}
                style={{ position: 'absolute', left: 0, zIndex: 1000 }}
            >
                <ArrowBackIosNewIcon />
            </IconButton>
            <CardMedia
                component="img"
                height="300"
                image={hotel.images[imageIndex]}
                alt={hotel.name}
                style={{ width: '100%', objectFit: 'contain', maxHeight: '300px' }} 
            />
            <IconButton
                onClick={() => setImageIndex((imageIndex + 1) % hotel.images.length)}
                style={{ position: 'absolute', right: 0, zIndex: 1000 }}
            >
                <ArrowForwardIosIcon />
            </IconButton>
        </Box>
        <Typography variant="h6">{hotel.name} - {hotel.location}</Typography>
        {/* <Typography variant="body2">${hotel.price} per night</Typography> */}
        {hotel.booked ? (
            <>
                <Typography variant="body1">Check-in Date: {new Date(checkInDate).toLocaleDateString()}</Typography>
                <Typography variant="body1">Check-out Date: {new Date(checkOutDate).toLocaleDateString()}</Typography>
                <Typography variant="body1">Number of Guests: {numPeople}</Typography>
                <Typography variant="body2">Breakfast per person: $15</Typography>
                <Typography variant="body2">Cleaning fee: $20</Typography>
                <Typography variant="h6" sx={{ mt: 2 }}>Total Cost: ${calculateTotalCost()}</Typography>
            </>
        ) : (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Check-in Date"
                    value={checkInDate}
                    onChange={setCheckInDate}
                    renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}
                />
                <DatePicker
                    label="Check-out Date"
                    value={checkOutDate}
                    onChange={setCheckOutDate}
                    renderInput={(params) => <TextField {...params} fullWidth margin="dense" />}
                />
                <TextField
                    margin="dense"
                    id="numPeople"
                    label="Number of People"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={numPeople}
                    onChange={(e) => setNumPeople(e.target.value)}
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel id="room-type-label">Room Type</InputLabel>
                    <Select
                        labelId="room-type-label"
                        id="room-type"
                        value={roomType}
                        label="Room Type"
                        onChange={(e) => setRoomType(e.target.value)}
                    >
                        <MenuItem value="standard">Standard</MenuItem>
                        <MenuItem value="deluxe">Deluxe</MenuItem>
                        <MenuItem value="suite">Suite</MenuItem>
                    </Select>
                    <FormControlLabel
                    control={<Checkbox checked={breakfastIncluded} onChange={(e) => setBreakfastIncluded(e.target.checked)} />}
                    label={`Breakfast ($15 per person per day)`}
                    />
                </FormControl>
                <Typography variant="h7" style={{ marginTop: '20px' }}>
                    Cleaning fee: $20
                </Typography>
                <Typography variant="h6" style={{ marginTop: '20px' }}>
                    Total Cost: ${calculateTotalCost()}
                </Typography>
            </LocalizationProvider>
        )}
    </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    {!hotel.booked && <Button onClick={handleBook}>Confirm Booking</Button>}
                </DialogActions>
            </Dialog>
        </>
    );
};
