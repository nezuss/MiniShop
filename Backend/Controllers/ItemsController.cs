using Microsoft.AspNetCore.Mvc;
using Backend.DTO.Item;
using Backend.DTO.Search;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/")]
    public class ItemsController : ControllerBase
    {
        private readonly DB _appDbContext;

        public ItemsController(DB appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpGet("categories/")]
        public IActionResult GetCategories()
        {
            try
            {
                var categories = _appDbContext.Items
                    .SelectMany(i => i.Categories)
                    .Distinct()
                    .ToList();
                if (categories.Count == 0)
                    return NotFound(new { message = "No categories found!" });

                return Ok(categories);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return BadRequest(new { message = "Error while fetching categories!" });
            }
        }

        [HttpGet("item/{id}")]
        public async Task<IActionResult> GetItems(int id)
        {
            try
            {
                var item = await _appDbContext.Items.FirstOrDefaultAsync(i => i.Id == id);
                if (item == null)
                    return NotFound(new { message = "No item found!" });
                return Ok(item);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return BadRequest(new { message = "Error while fetching items!" });
            }
        }

        [HttpGet("items/")]
        public IActionResult GetItem()
        {
            try
            {
                var items = _appDbContext.Items.ToList();
                if (items.Count == 0)
                    return NotFound(new { message = "No items found!" });
                return Ok(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return BadRequest(new { message = "Error while fetching items!" });
            }
        }

        [HttpPost("search/")]
        public IActionResult GetItemsBySearch([FromBody] SearchDTO dto)
        {
            if (dto.Name == null && dto.Category == null)
                return BadRequest(new { message = "No search parameters provided!" });
            if (dto.Name != null && dto.Name.Length != 0 && dto.Name.Length < 3)
                return BadRequest(new { message = "Search name is too short!" });
            if (dto.Category != null && dto.Category.Length != 0 && dto.Category.Length < 1)
                return BadRequest(new { message = "Search categories are too short!" });

            try
            {
                var query = _appDbContext.Items.AsQueryable();

                if (!string.IsNullOrEmpty(dto.Name))
                    query = query.Where(i => i.Name.Contains(dto.Name));

                if (dto.Category != null && dto.Category.Any())
                    query = query.Where(i => i.Categories.Any(category => dto.Category.Contains(category)));

                var items = query.ToList();

                return Ok(items);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return BadRequest(new { message = "Error while searching!" });
            }
        }

        [HttpGet("check-admin/")]
        [Authorize]
        public async Task<IActionResult> CheckAdminAsync()
        {
            var name = User.Identity?.Name;
            if (string.IsNullOrEmpty(name))
                return BadRequest(new { message = "User not found!" });

            var user = await _appDbContext.Users.FirstOrDefaultAsync(u => u.Username == name);

            if (user == null || user.IsAdmin != true)
                return BadRequest(new { message = "User is not an admin!" });

            return Ok(true);
        }

        [HttpPost("add/")]
        [Authorize]
        public async Task<IActionResult> AddItem([FromBody] CreateDTO dto)
        {

            var name = User.Identity?.Name;
            if (string.IsNullOrEmpty(name))
                return BadRequest(new { message = "User not found!" });

            var user = await _appDbContext.Users.FirstOrDefaultAsync(u => u.Username == name);

            if (dto.Name.Length < 3)
                return BadRequest(new { message = "Item name is too short!" });
            if (dto.Description.Length < 3)
                return BadRequest(new { message = "Item description is too short!" });
            if (dto.Price < 1)
                return BadRequest(new { message = "Item price is too low!" });

            try
            {
                var item = new Item
                {
                    Name = dto.Name,
                    Description = dto.Description,
                    Price = dto.Price,
                    Categories = dto.Categories,
                    UserId_Created = user.Id,
                    UserId_Updated = user.Id
                };
                _appDbContext.Items.Add(item);
                _appDbContext.SaveChanges();

                return Ok(new { message = "Item added successfully!" });
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return BadRequest(new { message = "Error while adding!" });
            }
        }

        [HttpPut("update/")]
        [Authorize]
        public async Task<IActionResult> UpdateItem([FromBody] UpdateDTO dto)
        {
            if (dto.Name.Length < 3)
                return BadRequest(new { message = "Item name is too short!" });
            if (dto.Description.Length < 3)
                return BadRequest(new { message = "Item description is too short!" });
            if (dto.Price < 1)
                return BadRequest(new { message = "Item price is too low!" });

            try
            {
                var name = User.Identity?.Name;
                if (string.IsNullOrEmpty(name))
                    return BadRequest(new { message = "User not found!" });

                var user = await _appDbContext.Users.FirstOrDefaultAsync(u => u.Username == name);
                var item = _appDbContext.Items.FirstOrDefault(i => i.Id == dto.Id);

                if (item == null)
                    return NotFound(new { message = "Item not found!" });

                item.Name = dto.Name;
                item.Description = dto.Description;
                item.Price = dto.Price;
                item.Categories = dto.Categories;
                item.UserId_Updated = user.Id;
                _appDbContext.Items.Update(item);
                _appDbContext.SaveChanges();

                return Ok(new { message = "Item successfully updated!" });
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return BadRequest(new { message = "Error while updating!" });
            }
        }

        [HttpDelete("delete/{id}")]
        [Authorize]
        public IActionResult DeleteItem(int id)
        {
            try
            {
                var item = _appDbContext.Items.FirstOrDefault(i => i.Id == id);
                if (item == null)
                    return NotFound(new { message = "Item not found!" });
                _appDbContext.Items.Remove(item);
                _appDbContext.SaveChanges();
                return Ok(new { message = "Item successfully deleted!" });
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return BadRequest(new { message = "Error while deleting!" });
            }
        }
    }
}
