using System.ComponentModel.DataAnnotations;

namespace PMS.Models.Facilities
{
    public class Address
    {
        public int id { get; set; }

        [Required]
        public string city { get; set; }

        [Required]
        public string street { get; set; }

        [Range(1, int.MaxValue)]
        public int buildingnumber { get; set; }
    }
}