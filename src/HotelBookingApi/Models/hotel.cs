using System.Collections.Generic;

namespace HotelBookingApi.Models
{
    public class Hotel
{
    public int HotelId { get; set; }
    public string Name { get; set; } = string.Empty; 
    public string Location { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public double Price { get; set; }
    public double Rating { get; set; }
    public List<string> Images { get; set; } = new List<string>(); 
    public bool Liked { get; set; }
    public bool Booked { get; set; }
    public List<Booking> Bookings { get; set; } = new List<Booking>();
}

}
