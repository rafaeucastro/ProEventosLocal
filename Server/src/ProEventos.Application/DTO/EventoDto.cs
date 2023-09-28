using System;
using System.ComponentModel.DataAnnotations;

namespace ProEventos.Application.DTO
{
    public class EventoDto
    {
        public int Id {get; set;}
        public string Local {get; set;}
        public DateTime? DataEvento {get; set;}
        [Required(ErrorMessage = "O campo {0} � obrigat�rio!"),
        //MinLength(3, ErrorMessage = "{0} deve ter no m�nimo 4 caracteres!"),
        //MaxLength(50, ErrorMessage = "{0} deve ter no m�ximo 50 caracteres!")]
        StringLength(50, MinimumLength = 3, ErrorMessage = "Intervalor permitido: 3 a 50 caracteres")]
        public string Tema {get; set;}
        [Display(Name = "Qtd Pessoas")]
        [Range(1, 120000, ErrorMessage = "{0} n�o pode ser menor que 1 nem menor que 120.000!")]
        public int QtdPessoas {get; set;}
        public LoteDto[] Lotes {get; set;}
        [RegularExpression(@".*\.(gif|jpe?g|bmp|png)$", 
            ErrorMessage = "N�o � uma imagem v�lida! (gif | jpeg | bmp | png)")]
        public string ImagemURL {get; set;}
        [Required(ErrorMessage = "O campo {0} � obrigat�rio!")]
        [Phone(ErrorMessage = "O campo {0} est� com o n�mero inv�lido!")]
        public string Telefone { get; set; }
        [Display(Name = "e-mail")]
        [Required(ErrorMessage = "O campo {0} � obrigat�rio!")]
        [EmailAddress(ErrorMessage = "� necess�rio ser um {0} um {0} v�lido!")]
        public string Email { get; set; }
    }
}