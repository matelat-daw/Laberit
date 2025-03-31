using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MongoTest.Models;
using MongoTest.Services;

namespace MongoTest.Controllers
{
    public class UsersController(UsersService service) : Controller
    {
        public async Task<IActionResult> Index()
        {
            var users = await service.GetAsync();
            return View(users);
        }

        // GET: User/Details/5
        public async Task<IActionResult> Details(string? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            // var user = await context.Users
            var user = await service.GetAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            return View(user);
        }

        // GET: Cars/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Cars/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,nombre,email,edad")] Users user)
        {
            if (ModelState.IsValid)
            {
                await service.CreateAsync(user);
                return RedirectToAction(nameof(Index));
            }
            return View(user);
        }

        // GET: Cars/Edit/5
        public async Task<IActionResult> Edit(string? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var user = await service.GetAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return View(user);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(string id, [Bind("Id,nombre,email,edad")] Users user)
        {
            if (id != user.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    await service.UpdateAsync(id, user);
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!UserExists(user.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(user);
        }

        // GET: Cars/Delete/5
        public async Task<IActionResult> Delete(string? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var user = await service.GetAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            return View(user);
        }

        // POST: Cars/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(string id)
        {
            var user = await service.GetAsync(id);
            if (user != null)
            {
                await service.RemoveAsync(id);
            }

            return RedirectToAction(nameof(Index));
        }

        private bool UserExists(string id)
        {
            var user = service.GetAsync(id);
            if (user == null)
            {
                return false;
            }
            return true;
        }
    }
}