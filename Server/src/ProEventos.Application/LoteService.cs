﻿using ProEventos.Application.Contratos;
using ProEventos.Persistence.Contratos;
using System;
using System.Threading.Tasks;
using ProEventos.Application.DTO;
using AutoMapper;
using ProEventos.Domain;
using System.Linq;

namespace ProEventos.Application
{
    public class LoteService : ILoteService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly ILotePersist _lotePersist;
        private readonly IMapper _mapper;

        public LoteService(IGeralPersist geralPersist, ILotePersist lotePersist, IMapper mapper)
        {
            this._geralPersist = geralPersist;
            this._lotePersist = lotePersist;
            this._mapper = mapper;
        }

        public async Task<bool> DeleteLote(int eventoId, int loteId)
        {
            try
            {
                var lote = await _lotePersist.GetLoteByIdsAsync(eventoId, loteId);
                if (lote == null) throw new Exception("Lote para delete não encontrado!");

                _geralPersist.Delete(lote);

                return await _geralPersist.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<LoteDto> GetLoteByIdsAsync(int eventoId, int id)
        {
            try
            {
                var lote = await _lotePersist.GetLoteByIdsAsync(eventoId, id);

                if (lote == null) return null;
                var resultado = _mapper.Map<LoteDto>(lote);

                return resultado;

            } catch(Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<LoteDto[]> GetLotesByEventoAsync(int eventoId)
        {
            try
            {
                var lotes = await _lotePersist.GetLotesByEventoIdAsync(eventoId);

                if(lotes == null) return null;
                var resultado = _mapper.Map<LoteDto[]>(lotes);

                return resultado;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task AddLote(int eventoId, LoteDto model)
        {
            try
            {
                var lote = _mapper.Map<Lote>(model);
                lote.EventoId = eventoId;

                _geralPersist.Add(lote);
                await _geralPersist.SaveChangesAsync();
            } catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<LoteDto[]> SaveLotes(int eventoId, LoteDto[] models)
        {
            foreach (var model in models) //iterar cada lote que está chegando
            {
                if(model.Id == 0)
                {
                    //criar
                    await AddLote(eventoId, model);
                } else
                {
                    //atualizar
                    model.EventoId = eventoId;

                    var lote = _mapper.Map<Lote>(model);
                    _geralPersist.Update(lote);

                    await _geralPersist.SaveChangesAsync();
                }
            }

            var loteRetorno = await _lotePersist.GetLotesByEventoIdAsync(eventoId);

            return _mapper.Map<LoteDto[]>(loteRetorno);
        }
    }
}
