using PMS.DataAccess;
using PMS.Models.Facilities;
using System.Collections.Generic;

namespace PMS.Servises.IServises
{
    public interface IFacilitiesServise
    {
        public ApplicationContext Db { get; set; }

        public List<Location> GetAllLocation();

        public Location GetLocationById(int? id);

        public void PostLocation(Location location);

        public void UpdateLocation(Location location);

        public bool DeleteLocation(int? id);
    }
}