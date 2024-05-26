using Microsoft.AspNetCore.Mvc;
using HotelBookingApi.Data;
using HotelBookingApi.Models;
using System.Linq;

namespace HotelBookingApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HotelsController : ControllerBase
    {
        private readonly HotelBookingContext _context;

        public HotelsController(HotelBookingContext context)
        {
            _context = context;
        }

        // GET: api/Hotels
        [HttpGet]
        public IActionResult GetHotels()
        {
            var hotels = _context.Hotels.ToList();
            if (hotels == null || !hotels.Any())
            {
                return NoContent(); // No hotels found, return No Content
            }
            return Ok(hotels); // Return list of hotels with OK status
        }

        // GET: api/Hotels/search?location=city center
        [HttpGet("search")]
        public IActionResult SearchHotels([FromQuery] string location)
        {
            var hotels = _context.Hotels.Where(h => h.Location.Contains(location)).ToList();
            if (hotels == null || !hotels.Any())
            {
                return NoContent(); // No matching hotels found, return No Content
            }
            return Ok(hotels); // Return filtered list of hotels with OK status
        }
    }
}
