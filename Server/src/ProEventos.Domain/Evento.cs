using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProEventos.Domain
{
    //[Table("EventosDetalhes")] Muda o nome da tabela salva no banco de dados
    public class Evento
    {
        //Especifica a chave primária deste objeto para o EF
        //[Key]
        //public int Codigo {get; set;}
        public int Id { get; set; }
        public string Local {get; set;}
        public DateTime? DataEvento {get; set;}
        //[NotMapped] //Este campo não será criado/salvo no BD.
        //public int ContagemDias { get; set; }
        [Required]
        [MaxLength(50)]
        public string Tema {get; set;}
        public int QtdPessoas {get; set;}
        public string Lote {get; set;}
        public string ImagemURL {get; set;}
        public string Telefone { get; set; }
        public string Email { get; set; }
        public IEnumerable<Lote> Lotes { get; set; }
        public IEnumerable<RedeSocial> RedesSociais { get; set; }
        public IEnumerable<PalestranteEvento> PalestranteEventos { get; set; }
    }
}