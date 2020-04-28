using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Models.Facilities
{
    public class WorkPlace
    {
        public int id { get; set; }
        public string name { get; set; }
        public int workareaid { get; set; }
        public int locationid { get; set; }
        public int floor { get; set; }
        public string comment { get; set; }
        public bool exist { get; set; }

        public WorkArea workArea { get; set; }

        public WorkPlace workPlace { get; set; }
    }
}
