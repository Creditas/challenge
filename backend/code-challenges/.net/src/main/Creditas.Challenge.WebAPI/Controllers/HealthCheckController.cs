using Microsoft.AspNetCore.Mvc;

namespace Creditas.Challenge.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HealthCheckController : ControllerBase
    {
        public string Get()
        {
            return "Healthy";
        }
    }
}
