using Microsoft.AspNetCore.Mvc;

namespace Creditas.Challenge.WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoanController : ControllerBase
    {
        [HttpPost]
        public Response Post([FromBody] Request request)
        {
            return new Response()
            {
                receivedName = request.name
            };
        }
    }

    public class Request
    {
        public string name { get; set; }
    }

    public class Response
    {
        public string receivedName { get; set; }
    }
}
