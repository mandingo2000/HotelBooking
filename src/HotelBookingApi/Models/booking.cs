namespace HotelBookingApi.Models
{
    public class Booking
{
    public int BookingId { get; set; }
    public int HotelId { get; set; }
    public Hotel? Hotel { get; set; }  

    public int UserId { get; set; }  
    public string RoomType { get; set; }
    public int NumberOfNights { get; set; }
    public int NumberOfPeople { get; set; }
    public bool BreakfastIncluded { get; set; }
    public double TotalCost { get; set; }
}

}
