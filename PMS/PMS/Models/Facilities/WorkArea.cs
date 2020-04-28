using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Models.Facilities
{
    public class WorkArea
    {
        public int id { get; set; }
        public string name { get; set; }
        public int departmentid { get; set; }
        public bool exist { get; set; }

        public Department department { get; set; }
    }
}
