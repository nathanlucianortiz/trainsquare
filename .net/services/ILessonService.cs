using Sabio.Models.Requests.Lesson;
using System;
using Sabio.Models;
using Sabio.Models.Domain;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Models.Domain.Lesson;

namespace Sabio.Services
{
    public interface ILessonService
    {
        int Create(LessonAddRequest model, int currentUserId);

        void Update(LessonUpdateRequest model, int currentUserId);

        void DeleteById(int id);

        Paged<Lesson> GetPaginate(int pageIndex, int pageSize);

        Lesson GetById(int id);

        Paged<Lesson> SearchPaginate(int pageIndex, int pageSize, string q);

        Paged<Lesson> GetByCreatedBy(int currentUserid, int pageIndex, int pageSize);
    }
}
