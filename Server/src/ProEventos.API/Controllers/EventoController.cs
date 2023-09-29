using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProEventos.Application.DTO;
using ProEventos.Application.Contratos;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using System.Linq;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventosController : ControllerBase
    {
        private readonly IEventoService _eventoService;
        private readonly IWebHostEnvironment _hostEnvironment;

        public EventosController(IEventoService eventoService, IWebHostEnvironment hostEnvironment)
        {
            _eventoService = eventoService;
            this._hostEnvironment = hostEnvironment;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var eventos = await _eventoService.GetAllEventosAsync(true);
                if(eventos == null) return NoContent();

                return Ok(eventos);
            }
            catch (Exception ex) {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar eventos. Erro: {ex.Message}"    
                );
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var evento = await _eventoService.GetEventoByIdAsync(id, true);
                if (evento == null) return NoContent();

                return Ok(evento);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Evento por Id não encontrado. Erro: {ex.Message}"
                );
            }
        }
        [HttpGet("{tema}/tema")]
        public async Task<IActionResult> GetByTema(string tema)
        {
            try
            {
                var eventos = await _eventoService.GetAllEventosByTemaAsync(tema, true);
                if (eventos == null) return NoContent();

                return Ok(eventos);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Eventos por tema não encontrados. Erro: {ex.Message}"
                );
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(EventoDto model)
        {
            try
            {
                var evento = await _eventoService.AddEventos(model);
                if (evento == null) return BadRequest("Erro ao tentar adicionar evento!");

                return Ok(evento);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao criar evento. Erro: {ex.Message}"
                );
            }
        }

        [HttpPost("upload-image/{eventoId}")]
        public async Task<IActionResult> UploadImage(int eventoId)
        {
            try
            {
                var evento = await _eventoService.GetEventoByIdAsync(eventoId, false);
                if (evento == null) return NoContent();

                var file = Request.Form.Files[0];
                if(file.Length > 0)
                {
                    DeleteImage(evento.ImagemURL);
                    evento.ImagemURL  = await SaveImage(file);
                }
                var eventoRetorno = await _eventoService.UpdateEvento(eventoId, evento);

                return Ok(eventoRetorno);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao adicionar imagem. Erro: {ex.Message}"
                );
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, EventoDto model)
        {
            try
            {
                var evento = await _eventoService.UpdateEvento(id, model);
                if (evento == null) return BadRequest("Erro ao tentar atualizar evento!");

                return Ok(evento);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao atualizar evento. Erro: {ex.Message}"
                );
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var evento = await _eventoService.GetEventoByIdAsync(id, false);
                if (evento == null) return NoContent();

                var success = await _eventoService.Delete(id);
                if (success) {
                    DeleteImage(evento.ImagemURL);
                    return Ok(new { message = "Evento apagado!" });
                }

                throw new Exception("Ocorreu um erro não especificado!");
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao deletar evento. Erro: {ex.Message}"
                );
            }
        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName)
                .Take(10)
                .ToArray()
                ).Replace(' ', '-');

            imageName = $"{imageName}{DateTime.UtcNow.ToString("yymmssfff")}{Path.GetExtension(imageFile.FileName)}";
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, @"Resources/images", imageName);

            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }

        [NonAction]
        public void DeleteImage(string imageName)
        {
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, @"Resources/images", imageName);

            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }
    }
}
