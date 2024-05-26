using Microsoft.EntityFrameworkCore;
using HotelBookingApi.Models;
using System.Collections.Generic;

namespace HotelBookingApi.Data
{
    public class HotelBookingContext : DbContext
    {
        public HotelBookingContext(DbContextOptions<HotelBookingContext> options) : base(options)
        {
        }

        public DbSet<Hotel> Hotels { get; set; }
        public DbSet<Booking> Bookings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
         
            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Hotel)  
                .WithMany(h => h.Bookings)  
                .HasForeignKey(b => b.HotelId);  

            modelBuilder.Entity<Hotel>().HasData(
                new Hotel { HotelId = 1, Name = "Seaside Escape", Location = "California", Type = "Beachfront", Price = 250, Rating = 4.8, Images = new List<string> { "/images/hotelimg1.webp", "/images/hotelimg2.webp", "/images/hotelimg3.webp" }, Liked = false, Booked = false },
                new Hotel { HotelId = 2, Name = "Mountain View Retreat", Location = "Colorado", Type = "Amazing Views", Price = 300, Rating = 4.7, Images = new List<string> { "/images/hotelimg1.webp", "/images/hotelimg2.webp", "/images/hotelimg3.webp" }, Liked = false, Booked = false },
                new Hotel { HotelId = 3, Name = "Urban Boutique Hotel", Location = "New York", Type = "Trending", Price = 220, Rating = 4.5, Images = new List<string> { "/images/hotelimg1.webp", "/images/hotelimg2.webp", "/images/hotelimg3.webp" }, Liked = false, Booked = false },
                new Hotel { HotelId = 4, Name = "Lakeside Bungalow", Location = "Michigan", Type = "Lakefront", Price = 180, Rating = 4.2, Images = new List<string> { "/images/hotelimg1.webp", "/images/hotelimg2.webp", "/images/hotelimg3.webp" }, Liked = false, Booked = false },
                new Hotel { HotelId = 5, Name = "Country Cottage", Location = "Vermont", Type = "Countryside", Price = 150, Rating = 4.0, Images = new List<string> { "/images/hotelimg1.webp", "/images/hotelimg2.webp", "/images/hotelimg3.webp" }, Liked = false, Booked = false },
                new Hotel { HotelId = 6, Name = "Luxury Spa Resort", Location = "California", Type = "Luxe", Price = 400, Rating = 4.9, Images = new List<string> { "/images/hotelimg1.webp", "/images/hotelimg2.webp", "/images/hotelimg3.webp" }, Liked = false, Booked = false },
                new Hotel { HotelId = 7, Name = "Desert Oasis", Location = "Nevada", Type = "Amazing Pools", Price = 210, Rating = 4.3, Images = new List<string> { "/images/hotelimg1.webp", "/images/hotelimg2.webp", "/images/hotelimg3.webp" }, Liked = false, Booked = false },
                new Hotel { HotelId = 8, Name = "Forest Hideaway", Location = "Washington", Type = "Trending", Price = 200, Rating = 4.6, Images = new List<string> { "/images/hotelimg1.webp", "/images/hotelimg2.webp", "/images/hotelimg3.webp" }, Liked = false, Booked = false },
                new Hotel { HotelId = 9, Name = "Skyline Hotel", Location = "Chicago", Type = "Urban", Price = 240, Rating = 4.1, Images = new List<string> { "/images/hotelimg1.webp", "/images/hotelimg2.webp", "/images/hotelimg3.webp" }, Liked = false, Booked = false },
                new Hotel { HotelId = 10, Name = "Beachfront Villa", Location = "Florida", Type = "Beachfront", Price = 350, Rating = 4.8, Images = new List<string> { "/images/hotelimg1.webp", "/images/hotelimg2.webp", "/images/hotelimg3.webp" }, Liked = false, Booked = false }
            );
        }
    }
}
