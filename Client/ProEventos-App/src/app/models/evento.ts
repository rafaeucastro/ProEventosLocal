import { Lote } from "./lote";
import { Palestrante } from "./palestrante";
import { RedeSocial } from "./rede_social";

export interface Evento {
    id: number;
    local: string;
    dataEvento?: Date;
    tema: string;
    qtdPessoas: number;
    lote: string;
    imagemURL: string;
    telefone: string;
    email: string;
    lotes: Lote[];
    redesSociais: RedeSocial[];
    palestranteEventos: Palestrante[];
}