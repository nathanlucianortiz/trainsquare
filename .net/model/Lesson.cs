using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Lesson
{
    public class Lesson
    {
        public int Id { get; set; } 

        public string Title { get; set; }

        public string Description { get; set; }

        public LookUp Type { get; set; }

        public string ImageUrl { get; set; }

        public string FileUrl { get; set; }

        public int SortOrder { get; set; }

        public int CreatedBy { get; set; }

        public int ModifiedBy { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateModified { get; set; }

    }
}
