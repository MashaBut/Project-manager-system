using Microsoft.EntityFrameworkCore;
using PMS.Models.Facilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.DataAccess
{
    public class ApplicationContext: DbContext
    {
        //--------------------------Facilities-------------------------------
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<TypeOfDepartment> TypeOfDepartments { get; set; }
        public DbSet<WorkArea> WorkAreas { get; set; }
        public DbSet<WorkPlace> workPlaces { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        { }
    }
}
