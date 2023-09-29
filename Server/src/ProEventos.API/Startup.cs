using System;
using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using ProEventos.Application;
using ProEventos.Application.Contratos;
using ProEventos.Persistence;
using ProEventos.Persistence.Contexto;
using ProEventos.Persistence.Contratos;

namespace ProEventos.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //Usar o sqlite com banco de dados
            services.AddDbContext<ProEventosContext>(
                context => context.UseSqlite(Configuration.GetConnectionString("Default"))
            );
            services.AddControllers()
                //evitar o loop de referências internas de objeto
                .AddNewtonsoftJson(x => {
                    x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                });

            //Associar classes usando Profile
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            
            //Relacionar interface com sua respectiva implementação para injeção de dependência.
            services.AddScoped<IGeralPersist, GeralPersist>();

            services.AddScoped<IEventoService, EventoService>();
            services.AddScoped<IEventoPersist, EventoPersist>();

            services.AddScoped<ILotePersist, LotePersist>();
            services.AddScoped<ILoteService, LoteService>();

            services.AddCors();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "ProEventos.API", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "ProEventos.API v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseCors(x => x.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());

            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "Resources")),
                RequestPath = new PathString("/Resources")
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
