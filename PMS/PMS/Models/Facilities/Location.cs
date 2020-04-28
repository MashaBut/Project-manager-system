using System.ComponentModel.DataAnnotations;

namespace PMS.Models.Facilities
{
    public class Location
    {
        public int id { get; set; }
        public int addressid { get; set; }
        public bool exist { get; set; }

        public Address address { get; set; }
    }
}
