using System.Collections.Generic;

namespace HotelBookingApi.Models
{
    public class Hotel
{
    public int HotelId { get; set; }
    public string Name { get; set; } = string.Empty; // Initialize with empty string to avoid null
    public string Location { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public double Price { get; set; }
    public double Rating { get; set; }
    public List<string> Images { get; set; } = new List<string>(); // Initialized to avoid null
    public bool Liked { get; set; }
    public bool Booked { get; set; }
    // Assuming Bookings might be loaded later
    public List<Booking> Bookings { get; set; } = new List<Booking>();
}

}
