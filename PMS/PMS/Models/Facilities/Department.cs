using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Models.Facilities
{
    public class Department
    {
        public int id { get; set; }
        public string name { get; set; }
        public int typeid { get; set; }
        public bool exist { get; set; }

        public TypeOfDepartment typeOfDepartment { get; set; }
    }
}
