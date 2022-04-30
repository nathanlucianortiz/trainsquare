using Sabio.Data.Providers;
using Sabio.Models.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Sabio.Data;
using Sabio.Models.Requests.Lesson;
using Sabio.Models;
using System.Data.SqlClient;
using System.Data;
using Sabio.Models.Domain.Lesson;

namespace Sabio.Services
{
    public class LessonService : ILessonService
    {
        IDataProvider _data = null;
        ILookUp _lookMapper = null;


        public LessonService(IDataProvider data, ILookUp lookMapper)
        {
            _data = data;
            _lookMapper = lookMapper;
        }

        public Paged<Lesson> GetPaginate(int pageIndex, int pageSize)
        {
            Paged<Lesson> pagedList = null;
            List<Lesson> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                "dbo.Lessons_SelectAll",
                (param) =>

                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    Lesson lesson = MapLesson(reader, ref startingIndex);
                    totalCount = reader.GetSafeInt32(startingIndex);

                    if (list == null)
                    {
                        list = new List<Lesson>();
                    }

                    list.Add(lesson);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<Lesson>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Lesson GetById(int id)
        {
            string procName = "[dbo].[Lessons_Select_ById]";

            Lesson lesson = null;

            //CHANGE THIS?
            if (id > 1000)
            {
                throw new ArgumentOutOfRangeException("This is a simulated Error");
            }

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                lesson = MapLesson(reader, ref startingIndex);
            });

            return lesson;
        }

        public Paged<Lesson> GetByCreatedBy(int pageIndex, int pageSize, int currentUserId)
        {
            Paged<Lesson> pagedList = null;
            List<Lesson> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                "dbo.Lessons_Select_ByCreatedBy",
                (param) =>

                {
                    param.AddWithValue("@User", currentUserId);
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    Lesson lesson = MapLesson(reader, ref startingIndex);
                    totalCount = reader.GetSafeInt32(startingIndex);

                    if (list == null)
                    {
                        list = new List<Lesson>();
                    }

                    list.Add(lesson);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<Lesson>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<Lesson> SearchPaginate(int pageIndex, int pageSize, string q)
        {
            Paged<Lesson> pagedList = null;
            List<Lesson> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                "dbo.Lessons_Select_BySearch",
                (param) =>

                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                    param.AddWithValue("@Query", q);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    Lesson lesson = MapLesson(reader, ref startingIndex);
                    totalCount = reader.GetSafeInt32(startingIndex);

                    if (list == null)
                    {
                        list = new List<Lesson>();
                    }

                    list.Add(lesson);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<Lesson>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public int Create(LessonAddRequest model, int currentUserId)
        {
            int id = 0;

            string procName = "[dbo].[Lessons_Insert]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@CreatedBy", currentUserId);
                col.AddWithValue("@ModifiedBy", currentUserId);
                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);

            }, returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;

                int.TryParse(oId.ToString(), out id);

            });
            return id;

        }

        public void Update(LessonUpdateRequest model, int currentUserId)
        {
            string procName = "[dbo].[Lessons_Update]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("Id", model.Id);
                col.AddWithValue("@ModifiedBy", currentUserId);
            }, returnParameters: null);
        }

        public void DeleteById(int id)
        {
            string procName = "[dbo].[Lessons_Delete_ById]";

            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Id", id);
            });
        }


        private Lesson MapLesson(IDataReader reader, ref int startingIndex)
        {
            Lesson lesson = new Lesson();


            lesson.Id = reader.GetSafeInt32(startingIndex++);
            lesson.Title = reader.GetSafeString(startingIndex++);
            lesson.Description = reader.GetSafeString(startingIndex++);
            lesson.Type = _lookMapper.MapLookup(reader, ref startingIndex);
            lesson.ImageUrl = reader.GetSafeString(startingIndex++);
            lesson.FileUrl = reader.GetSafeString(startingIndex++); 
            lesson.SortOrder = reader.GetSafeInt32(startingIndex++);
            lesson.CreatedBy = reader.GetSafeInt32(startingIndex++);
            lesson.ModifiedBy = reader.GetSafeInt32(startingIndex++);
            lesson.DateCreated = reader.GetSafeDateTime(startingIndex++);
            lesson.DateModified = reader.GetSafeDateTime(startingIndex++);

            return lesson;
        }



        private static void AddCommonParams(LessonAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@Title", model.Title);
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@DurationTypeId", model.DurationTypeId);
            col.AddWithValue("@ImageUrl", model.ImageUrl);
            col.AddWithValue("@FileUrl", model.FileUrl);
            col.AddWithValue("@SortOrder", model.SortOrder);

        }
    }
}
