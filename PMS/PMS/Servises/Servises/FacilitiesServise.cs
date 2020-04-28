using Microsoft.EntityFrameworkCore;
using PMS.DataAccess;
using PMS.Models.Facilities;
using PMS.Servises.IServises;
using System.Collections.Generic;
using System.Linq;

namespace PMS.Servises.Servises
{
    public class FacilitiesServise :IFacilitiesServise
    {
        public ApplicationContext Db { get; set; }

        public List<Location> GetAllLocation()
        {
            List <Location> locations = Db.Locations
                .Include(l => l.address)
                .ToList();
            return locations;
        }

        public Location GetLocationById(int ?id)
        {
            Location location = Db.Locations.FirstOrDefault(x => x.id == id);
            return location;
        }

        public void PostLocation (Location location)
        {
            Db.Addresses.All(a => location.address.street == "");
            Db.Addresses.Add(location.address);
            Db.SaveChanges();
            Db.Locations.Add(location);
            Db.SaveChanges();
        }

        public void UpdateLocation(Location location)
        {
            Db.Addresses.Update(location.address);
            Db.SaveChanges();
            Db.Locations.Update(location);
            Db.SaveChanges();
        }

        public bool DeleteLocation(int ?id)
        {
            Location location = GetLocationById(id);
            if (location == null)
                return false;
            Db.Locations.Remove(location);
            Db.SaveChanges();
            Db.Addresses.Remove(location.address);
            Db.SaveChanges();
            return true;
        }
    }
}