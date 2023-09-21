import { Evento } from "./evento";
import { RedeSocial } from "./rede_social";

export interface Palestrante {
    id: number;
    nome: string;
    miniCurriculo: string;
    imagemURL: string;
    telefone: string;
    email: string;
    redesSociais: RedeSocial[];
    palestrantesEventos: Evento[];
}