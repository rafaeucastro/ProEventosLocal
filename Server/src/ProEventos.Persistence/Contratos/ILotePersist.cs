using ProEventos.Domain;
using System.Threading.Tasks;

namespace ProEventos.Persistence.Contratos
{
    public interface ILotePersist
    {
        //LOTES
        /// <summary>
        /// Pegar todos os lotes de um evento
        /// </summary>
        /// <param name="eventoId">Código chave da tabela evento</param>
        /// <returns> Array de lotes</returns>
        Task<Lote[]> GetLotesByEventoIdAsync(int eventoId);
        /// <summary>
        /// Método get que retornará apenas 1 Lote
        /// </summary>
        /// <param name="eventoId">Código chave da tabela Evento</param>
        /// <param name="id">Código chave do meu lote</param>
        /// <returns>Um lote</returns>
        Task<Lote> GetLoteByIdsAsync(int eventoId, int id);
    }
}
