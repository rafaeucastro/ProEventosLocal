using Microsoft.EntityFrameworkCore;
using ProEventos.Domain;
using ProEventos.Persistence.Contexto;
using ProEventos.Persistence.Contratos;
using System.Linq;
using System.Threading.Tasks;

namespace ProEventos.Persistence
{
    public class LotePersist : ILotePersist
    {
        private readonly ProEventosContext _context;

        public LotePersist(ProEventosContext context)
        {
            _context = context;
        }

        async Task<Lote> ILotePersist.GetLoteByIdsAsync(int eventoId, int id)
        {
            IQueryable<Lote> query = _context.Lotes;

            query = query.AsNoTracking().
                Where(lote => lote.EventoId.Equals(eventoId) && lote.Id.Equals(id));

            return await query.FirstOrDefaultAsync();
        }

        async Task<Lote[]> ILotePersist.GetLotesByEventoIdAsync(int eventoId)
        {
            IQueryable<Lote> query = _context.Lotes;

            query = query.AsNoTracking().
                Where(lote => lote.EventoId.Equals(eventoId));

            return await query.ToArrayAsync();
        }
    }
}
