using HotelBookingApi.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Add the DbContext using in-memory database.
builder.Services.AddDbContext<HotelBookingContext>(options =>
    options.UseInMemoryDatabase("HotelBookings"));

// Add CORS policy to allow all origins, headers, and methods. Adjust as necessary for production.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy => 
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<HotelBookingContext>();
    // Force initialization by querying
    context.Hotels.Load();
}
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage(); // Use developer exception page in development for detailed errors.
}
app.UseHttpsRedirection(); // Enforce HTTPS
app.UseCors("AllowAll"); // Use CORS policy

app.MapControllers(); // Map controller routes
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<HotelBookingContext>();
    dbContext.Database.EnsureCreated();
}
app.Run(); // Run the application
