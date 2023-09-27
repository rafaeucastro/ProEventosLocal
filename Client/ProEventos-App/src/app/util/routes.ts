export class AppRoutes {
    public static readonly palestrantes = 'palestrantes';
    public static readonly dashboard = 'dashboard';
    public static readonly contatos = 'contatos';

    public static readonly eventos = 'eventos';
    public static readonly eventos_detalhe = AppRoutes.eventos +'detalhe';
    public static readonly eventos_lista = AppRoutes.eventos + 'lista';

    public static readonly user = 'user';
    public static readonly user_perfil = AppRoutes.user + '/perfil';
    public static readonly user_login = AppRoutes.user + 'login';
    public static readonly user_registration = AppRoutes.user + 'registration';
}