using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.Lesson;
using Sabio.Models.Requests.Lesson;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;


namespace Sabio.Web.Api.Controllers
{
    [Route("api/lessons")]
    [ApiController]
    public class LessonApiController : BaseApiController
    {
        private ILessonService _service = null;
        private IAuthenticationService<int> _authService = null;

        public LessonApiController(ILessonService service
            , ILogger<LessonApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        // GET api/lessons/paginate
        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<Lesson>>> GetPaginate(int pageIndex, int pageSize)
        {
            //ActionResult result = null;
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                Paged<Lesson> paged = _service.GetPaginate(pageIndex, pageSize);

                if (paged == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Lesson>> { Item = paged };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(iCode, response);
        }

        // GET api/lessons/creator/paginate
        [HttpGet("creator/paginate")]
        public ActionResult<ItemResponse<Paged<Lesson>>> GetByCreatedBy(int pageIndex, int pageSize)
        {
            IUserAuthData currentUser = _authService.GetCurrentUser();
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                int currentUserId = _authService.GetCurrentUserId();
                Paged<Lesson> paged = _service.GetByCreatedBy(pageIndex, pageSize, currentUser.Id);

                if (paged == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Record not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Lesson>> { Item = paged };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(iCode, response);
        }

        // GET api/lessons/{id:int}
        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Lesson>> GetById(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                Lesson lesson = _service.GetById(id);

                if (lesson == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Record not found.");
                }
                else
                {
                    response = new ItemResponse<Lesson> { Item = lesson };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(iCode, response);
        }

        // GET api/lessons/search
        [HttpGet("search")]
        public ActionResult<ItemResponse<Lesson>> SearchPaginate(int pageIndex, int pageSize, string q)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                Paged<Lesson> paged = _service.SearchPaginate(pageIndex, pageSize, q);

                if (paged == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("App resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Lesson>> { Item = paged };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                Logger.LogError(ex.ToString());
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(iCode, response);
        }

        // POST api/lessons/""
        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(LessonAddRequest model)
        {
            IUserAuthData currentUser = _authService.GetCurrentUser();

            ObjectResult result = null;

            try
            {
                int currentUserId = _authService.GetCurrentUserId();

                int id = _service.Create(model, currentUser.Id);
                ItemResponse<int> response = new ItemResponse<int>() { Item = id };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }

            return result;
        }


        // PUT api/lessons/{id:int}
        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(LessonUpdateRequest model)
        {
            IUserAuthData currentUser = _authService.GetCurrentUser();

            int code = 200;
            BaseResponse response = null;

            try
            {

                _service.Update(model, currentUser.Id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        // DELETE api/lessons/{id:int}
        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> DeleteById(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.DeleteById(id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }


    }
}
