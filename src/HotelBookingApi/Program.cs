using HotelBookingApi.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<HotelBookingContext>(options =>
    options.UseInMemoryDatabase("HotelBookings"));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy => 
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<HotelBookingContext>();
    context.Hotels.Load();
}
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage(); 
}
app.UseHttpsRedirection(); 
app.UseCors("AllowAll"); 

app.MapControllers(); 
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<HotelBookingContext>();
    dbContext.Database.EnsureCreated();
}
app.Run(); 
