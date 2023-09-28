using System;
using System.ComponentModel.DataAnnotations;

namespace ProEventos.Application.DTO
{
    public class EventoDto
    {
        public int Id {get; set;}
        public string Local {get; set;}
        public DateTime? DataEvento {get; set;}
        [Required(ErrorMessage = "O campo {0} é obrigatório!"),
        //MinLength(3, ErrorMessage = "{0} deve ter no mínimo 4 caracteres!"),
        //MaxLength(50, ErrorMessage = "{0} deve ter no máximo 50 caracteres!")]
        StringLength(50, MinimumLength = 3, ErrorMessage = "Intervalor permitido: 3 a 50 caracteres")]
        public string Tema {get; set;}
        [Display(Name = "Qtd Pessoas")]
        [Range(1, 120000, ErrorMessage = "{0} não pode ser menor que 1 nem menor que 120.000!")]
        public int QtdPessoas {get; set;}
        public LoteDto[] Lotes {get; set;}
        [RegularExpression(@".*\.(gif|jpe?g|bmp|png)$", 
            ErrorMessage = "Não é uma imagem válida! (gif | jpeg | bmp | png)")]
        public string ImagemURL {get; set;}
        [Required(ErrorMessage = "O campo {0} é obrigatório!")]
        [Phone(ErrorMessage = "O campo {0} está com o número inválido!")]
        public string Telefone { get; set; }
        [Display(Name = "e-mail")]
        [Required(ErrorMessage = "O campo {0} é obrigatório!")]
        [EmailAddress(ErrorMessage = "É necessário ser um {0} um {0} válido!")]
        public string Email { get; set; }
    }
}