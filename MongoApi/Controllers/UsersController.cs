using Microsoft.AspNetCore.Mvc;
using MongoApi.Models;
using MongoApi.Services;

namespace MongoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController(UsersService usersService) : ControllerBase
    {
        [HttpGet]
        public async Task<List<Users>> Get() =>
            await usersService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Users>> Get(string id)
        {
            var user = await usersService.GetAsync(id);

            if (user is null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Users newUser)
        {
            await usersService.CreateAsync(newUser);

            // return CreatedAtAction(nameof(Get), new { id = newUser._id }, newUser);
            return CreatedAtAction(nameof(Get), new { }, newUser);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Users updatedUser)
        {
            var user = await usersService.GetAsync(id);

            if (user is null)
            {
                return NotFound();
            }

            // updatedUser._id = user._id;

            await usersService.UpdateAsync(id, updatedUser);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var user = await usersService.GetAsync(id);

            if (user is null)
            {
                return NotFound();
            }

            await usersService.RemoveAsync(id);

            return NoContent();
        }
    }
}