using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PMS.DataAccess;
using PMS.Models.Facilities;
using PMS.Servises.IServises;

namespace PMS.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FacilitiesController : ControllerBase
    {
        private readonly IFacilitiesServise facilitiesServise;
        public FacilitiesController(IFacilitiesServise facilities,ApplicationContext context)
        {
            facilitiesServise = facilities;
            facilitiesServise.Db = context;
        }

        [HttpGet]
        public IActionResult GetLocations()
        {
            List<Location> locations = facilitiesServise.GetAllLocation();
            if (locations == null)
                return BadRequest();
            return StatusCode(200, locations);
        }

        [HttpGet("{id}")]
        public IActionResult GetLocationById(int? id)
        {
            Location location = facilitiesServise.GetLocationById(id);
            if (location == null)
                return NotFound();
            return StatusCode(200, location);
        }

        [HttpPost]
        public IActionResult PostLocation([FromBody]Location location)
        {
            if (ModelState.IsValid)
            {
                facilitiesServise.PostLocation(location);
                return StatusCode(201, location);
            }
            return BadRequest();
        }

        [HttpPut("form")]
        public IActionResult UpdateLocation([FromBody]Location location)
        {
            if (ModelState.IsValid)
            {
                facilitiesServise.UpdateLocation(location);
                return StatusCode(201, location);
                
            }
            return BadRequest();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteLocationById(int ?id)
        {
            return facilitiesServise.DeleteLocation(id) == true ? StatusCode(200) : NotFound();
        }
    }
}