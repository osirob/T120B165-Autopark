using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Triperis.Data;
using Triperis.Models;

namespace Triperis.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarsController : ControllerBase
    {
        private readonly AppDbContext dbContext;
        private UserManager<AppUser> _userManager;

        public CarsController(AppDbContext dbContext, UserManager<AppUser> userManager)
        {
            this.dbContext = dbContext;
            this._userManager = userManager;
        }

        //GET all cars
        // api/Cars
        [HttpGet]
        public async Task<IActionResult> GetAllCars()
        {
            var cars = await dbContext.Cars.Where(c => c.Parduotas == false).ToListAsync();
            var carDtos = new List<CarDto>();

            foreach (var car in cars)
            {
                AppUser user = await _userManager.FindByIdAsync(car.UserId.ToString());

                var carDto = new CarDto()
                {
                    Id = car.Id,
                    Marke = car.Marke,
                    Modelis = car.Modelis,
                    Metai = car.Metai,
                    KuroTipas = car.KuroTipas,
                    KebuloTipas = car.KebuloTipas,
                    VariklioTuris = car.VariklioTuris,
                    Galia = car.Galia,
                    Rida = car.Rida,
                    Defektai = car.Defektai,
                    Spalva = car.Spalva,
                    PavaruDeze = car.PavaruDeze,
                    Aprasymas = car.Aprasymas,
                    SukurimoData = car.SukurimoData,
                    AtnaujintasData = car.AtnaujintasData,
                    Parduotas = car.Parduotas,
                    Kaina = car.Kaina,
                    Vin = car.Vin,
                    Ispejimas = car.Ispejimas,
                    UserId = car.UserId
                };
                carDtos.Add(carDto);
            }
            return Ok(carDtos);
        }

        [HttpGet]
        [Route("UserCars/{id}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetAllCarsUser([FromRoute] int id)
        {
            var claimsUserId = int.Parse(User.Claims.FirstOrDefault(x => x.Type.Equals("UserId")).Value);
            if(claimsUserId != id)
            {
                return Forbid();
            }

            var cars = await dbContext.Cars.Where(c => c.UserId == id).Where(c => c.Parduotas == false).ToListAsync();
            var carDtos = new List<CarDto>();

            if(cars == null)
            {
                return NotFound("User has no available cars");
            }

            foreach (var car in cars)
            {
                AppUser user = await _userManager.FindByIdAsync(car.UserId.ToString());

                var carDto = new CarDto()
                {
                    Id = car.Id,
                    Marke = car.Marke,
                    Modelis = car.Modelis,
                    Metai = car.Metai,
                    KuroTipas = car.KuroTipas,
                    KebuloTipas = car.KebuloTipas,
                    VariklioTuris = car.VariklioTuris,
                    Galia = car.Galia,
                    Rida = car.Rida,
                    Defektai = car.Defektai,
                    Spalva = car.Spalva,
                    PavaruDeze = car.PavaruDeze,
                    Aprasymas = car.Aprasymas,
                    SukurimoData = car.SukurimoData,
                    AtnaujintasData = car.AtnaujintasData,
                    Parduotas = car.Parduotas,
                    Kaina = car.Kaina,
                    Vin = car.Vin,
                    Ispejimas = car.Ispejimas,
                    UserId = car.UserId
                };
                carDtos.Add(carDto);
            }
            return Ok(carDtos);
        }

        [HttpGet]
        [Route("UserCarsSold/{id}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetAllCarsUserSold([FromRoute] int id)
        {
            var claimsUserId = int.Parse(User.Claims.FirstOrDefault(x => x.Type.Equals("UserId")).Value);
            if (claimsUserId != id)
            {
                return Forbid();
            }

            var cars = await dbContext.Cars.Where(c => c.UserId == id).Where(c => c.Parduotas == true).ToListAsync();
            var carDtos = new List<CarDto>();

            if (cars == null)
            {
                return NotFound("User has no sold cars");
            }

            foreach (var car in cars)
            {
                AppUser user = await _userManager.FindByIdAsync(car.UserId.ToString());

                var carDto = new CarDto()
                {
                    Id = car.Id,
                    Marke = car.Marke,
                    Modelis = car.Modelis,
                    Metai = car.Metai,
                    KuroTipas = car.KuroTipas,
                    KebuloTipas = car.KebuloTipas,
                    VariklioTuris = car.VariklioTuris,
                    Galia = car.Galia,
                    Rida = car.Rida,
                    Defektai = car.Defektai,
                    Spalva = car.Spalva,
                    PavaruDeze = car.PavaruDeze,
                    Aprasymas = car.Aprasymas,
                    SukurimoData = car.SukurimoData,
                    AtnaujintasData = car.AtnaujintasData,
                    Parduotas = car.Parduotas,
                    Kaina = car.Kaina,
                    Vin = car.Vin,
                    Ispejimas = car.Ispejimas,
                    UserId = car.UserId
                };
                carDtos.Add(carDto);
            }
            return Ok(carDtos);
        }

        //Get one car by id
        // api/Cars/5
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetCar([FromRoute] int id)
        {
            var car = await dbContext.Cars.FirstOrDefaultAsync(x => x.Id == id);
            if (car == null)
            {
                return NotFound("Car not found");
            }
            else
            {
                AppUser user = await _userManager.FindByIdAsync(car.UserId.ToString());
                var carDto = new CarDto()
                {
                    Id = car.Id,
                    Marke = car.Marke,
                    Modelis = car.Modelis,
                    Metai = car.Metai,
                    KuroTipas = car.KuroTipas,
                    KebuloTipas = car.KebuloTipas,
                    VariklioTuris = car.VariklioTuris,
                    Galia = car.Galia,
                    Rida = car.Rida,
                    Defektai = car.Defektai,
                    Spalva = car.Spalva,
                    PavaruDeze = car.PavaruDeze,
                    Aprasymas = car.Aprasymas,
                    SukurimoData = car.SukurimoData,
                    AtnaujintasData = car.AtnaujintasData,
                    Parduotas = car.Parduotas,
                    Kaina = car.Kaina,
                    Vin = car.Vin,
                    Ispejimas = car.Ispejimas,
                    UserId = car.UserId
                };
                return Ok(carDto);
            }
        }

        //Add car to db
        [HttpPost]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> AddCar([FromBody] CarCreateDto car)
        {
            bool warning = false;
            var dupicate = await dbContext.Cars.Where(c => c.Vin == car.Vin).OrderByDescending(c => c.AtnaujintasData).FirstOrDefaultAsync();
            if (dupicate != null)
            {
                if((DateTime.Now - dupicate.AtnaujintasData).TotalDays < 14)
                {
                    warning = true;
                }
            }

            var newCar = new Car() {
                Marke = car.Marke,
                Modelis = car.Modelis,
                Metai = car.Metai,
                KebuloTipas = car.KebuloTipas,
                KuroTipas = car.KuroTipas,
                VariklioTuris = car.VariklioTuris,
                Galia = car.Galia,
                Rida = car.Rida,
                Defektai = car.Defektai,
                Spalva = car.Spalva,
                PavaruDeze = car.PavaruDeze,
                Aprasymas = car.Aprasymas,
                Kaina = car.Kaina,
                Vin = car.Vin,

                SukurimoData = DateTime.Now,
                AtnaujintasData = DateTime.Now,
                Parduotas = false,
                Ispejimas = warning,
                UserId = car.UserId,
            };
            dbContext.Cars.Add(newCar);
            await dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCar), new { id = newCar.Id }, newCar);
        }

        //Update car
        [HttpPut]
        [Route("{id}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> UpdateCar([FromRoute] int id, [FromBody] CarCreateDto car)
        {
            var existingCar = await dbContext.Cars.FirstOrDefaultAsync(x => x.Id == id);
            var claimsUserId = int.Parse(User.Claims.FirstOrDefault(x => x.Type.Equals("UserId")).Value);
            if (claimsUserId != existingCar.UserId)
            {
                return Forbid();
            }

            if (existingCar != null)
            {
                existingCar.Marke = car.Marke;
                existingCar.Modelis = car.Modelis;
                existingCar.Metai = car.Metai;
                existingCar.KuroTipas = car.KuroTipas;
                existingCar.KebuloTipas = car.KebuloTipas;
                existingCar.VariklioTuris = car.VariklioTuris;
                existingCar.Galia = car.Galia;
                existingCar.Rida = car.Rida;
                existingCar.Defektai = car.Defektai;
                existingCar.Spalva = car.Spalva;
                existingCar.PavaruDeze = car.PavaruDeze;
                existingCar.Aprasymas = car.Aprasymas;
                existingCar.Parduotas = car.Parduotas;
                existingCar.Kaina = car.Kaina;
                existingCar.Vin = car.Vin;

                existingCar.AtnaujintasData = DateTime.Now;
                await dbContext.SaveChangesAsync();
                return Ok(existingCar);
            }
            return NotFound("Car not found");
        }

        //Delete car
        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = "User, Admin")]
        public async Task<IActionResult> DeleteCar([FromRoute] int id)
        {
            var existingCar = await dbContext.Cars.FirstOrDefaultAsync(x => x.Id == id);
            if (existingCar != null)
            {
                dbContext.Cars.Remove(existingCar);
                await dbContext.SaveChangesAsync();
                return Ok(existingCar);
            }
            return NotFound("Car not found");
        }

        [HttpPut]
        [Route("ChangeTag")]
        [Authorize(Roles = "User, Admin")]
        public async Task<IActionResult> ChangeTag([FromBody] int id)
        {
            var existingCar = await dbContext.Cars.FirstOrDefaultAsync(x => x.Id == id);
            if(existingCar != null)
            {
                existingCar.Parduotas = !existingCar.Parduotas;
                existingCar.AtnaujintasData = DateTime.Now;
                await dbContext.SaveChangesAsync();
                return Ok (existingCar);
            }
            return NotFound("Car not found");
        }

        [HttpGet]
        [Route("{carId}/Comments/{commentId}/Reactions")]
        [Authorize(Roles = "User, Admin")]
        public async Task<IActionResult> GetCarCommentReactions([FromRoute] int carId, [FromRoute] int commentId)
        {
            var car = await dbContext.Cars
                .Where(c => c.Id == carId)
                .Include(c => c.Comments.Where(c => c.Id == commentId))
                    .ThenInclude(c => c.Reactions)
                        .ThenInclude(r => r.User)
                .Include(c => c.Comments.Where(c => c.Id == commentId))
                    .ThenInclude(c => c.User)
                .FirstOrDefaultAsync();

            var reactions = new List<ReactionDto>();
            foreach(Reaction r in car.Comments[0].Reactions)
            {
                reactions.Add(new ReactionDto()
                {
                    Id = r.Id,
                    UserId = r.User.Id,
                    CommentId = r.CommentId,
                    ReactionType = r.ReactionType
                });
            }

            CarHierarchy ret = new CarHierarchy()
            {
                Id = car.Id,
                Marke = car.Marke,
                Modelis = car.Modelis,
                Metai = car.Metai,
                KuroTipas = car.KuroTipas,
                KebuloTipas = car.KebuloTipas,
                VariklioTuris = car.VariklioTuris,
                Galia = car.Galia,
                Rida = car.Rida,
                Defektai = car.Defektai,
                Spalva = car.Spalva,
                PavaruDeze = car.PavaruDeze,
                Aprasymas = car.Aprasymas,
                SukurimoData = car.SukurimoData,
                AtnaujintasData = car.AtnaujintasData,
                Parduotas = car.Parduotas,
                Kaina = car.Kaina,
                Vin = car.Vin,
                Ispejimas = car.Ispejimas,
                UserId = car.UserId,
                Comment = new CommentHierarchy()
                {
                    Id = car.Comments[0].Id,
                    Text = car.Comments[0].Text,
                    CreationDate = car.Comments[0].CreationDate,
                    Username = car.Comments[0].User != null ? car.Comments[0].User.UserName : "[ištrintas]",
                    CarId = car.Comments[0].CarId,
                    IsEdited = car.Comments[0].IsEdited,
                    Reactions = reactions
                }
            };

            return Ok(ret);

        }
    }

}
