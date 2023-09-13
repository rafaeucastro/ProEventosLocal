using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ProEventos.API.Models;

namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventoController : ControllerBase
    {
        public IEnumerable<Evento> _eventos = new Evento[] {
            new() {
                    EventoId = 1,
                    Tema = "Angular e .Net 5",
                    Local = "Belo Horizonte",
                    Lote = "1º Lote",
                    QtdPessoas = 34,
                    DataEvento = DateTime.Now.AddDays(2).ToString("dd/MM/yyyy"),
                    ImagemURL = "foto.png",
                },
                new() {
                    EventoId = 2,
                    Tema = "C#",
                    Local = "São Paulo",
                    Lote = "2º Lote",
                    QtdPessoas = 245,
                    DataEvento = DateTime.Now.AddDays(3).ToString("dd/MM/yyyy"),
                    ImagemURL = "foto1.png",
                },
        };

        public EventoController()
        {
          
        }

        [HttpGet]
        public IEnumerable<Evento> Get()
        {
            return _eventos;
        }

        [HttpGet("{id}")]
        public IEnumerable<Evento> Get(int id)
        {
            return _eventos.Where(evento => evento.EventoId == id);
        }

        [HttpPost]
        public string Post()
        {
            return "Exemplo de Post";
        }

        [HttpPut("{id}")]
        public string Put(int id)
        {
            return $"Exemplo de Put com id = {id}";
        }

        [HttpDelete("{id}")]
        public string Delete(int id)
        {
            return $"Exemplo de Delete com id = {id}";
        }
    }
}
