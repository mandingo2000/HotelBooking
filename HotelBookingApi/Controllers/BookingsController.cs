using Microsoft.AspNetCore.Mvc;
using HotelBookingApi.Data;
using HotelBookingApi.Models;
using System.Linq;

namespace HotelBookingApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingsController : ControllerBase
    {
        private readonly HotelBookingContext _context;

        public BookingsController(HotelBookingContext context)
        {
            _context = context;
        }

        // POST: api/Bookings
        [HttpPost]
        public IActionResult CreateBooking([FromBody] Booking booking)
        {
            _context.Bookings.Add(booking);
            booking.TotalCost = CalculateTotalCost(booking);
            _context.SaveChanges();
            return CreatedAtAction(nameof(CreateBooking), new { id = booking.BookingId }, booking);
        }

        private double CalculateTotalCost(Booking booking)
        {
            double baseRate = booking.RoomType switch
            {
                "Standard" => 100,
                "Deluxe" => 150,
                "Suite" => 200,
                _ => 100
            };
            double total = baseRate * booking.NumberOfNights;
            total += 20; // Cleaning fee
            if (booking.BreakfastIncluded)
            {
                total += 15 * booking.NumberOfNights * booking.NumberOfPeople;
            }
            return total;
        }

        // GET: api/Bookings/mybookings
        [HttpGet("mybookings")]
        public IActionResult GetMyBookings(int userId)
        {
            var bookings = _context.Bookings.Where(b => b.UserId == userId).ToList();
            return Ok(bookings);
        }
    }
}
