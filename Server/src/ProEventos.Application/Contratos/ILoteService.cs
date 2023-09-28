using System.Threading.Tasks;
using ProEventos.Application.DTO;

namespace ProEventos.Application.Contratos
{
    public interface ILoteService
    {
        Task<LoteDto[]> SaveLotes(int eventoId, LoteDto[] model);
        Task<bool> DeleteLote(int eventoId, int loteId);
        Task<LoteDto> GetLoteByIdsAsync(int eventoId, int id);
        Task<LoteDto[]> GetLotesByEventoAsync(int eventoId);
    }
}
