using BilheticaAeronauticaWeb.Data;
using BilheticaAeronauticaWeb.Data.Mocks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using BilheticaAeronauticaWeb.Data.Repository.interfaces;
using BilheticaAeronauticaWeb.Data.Repository;
using BilheticaAeronauticaWeb.Helper.Interfaces;
using BilheticaAeronauticaWeb.Helper;
using BilheticaAeronauticaWeb.Middleware;
using System.Text.Json.Serialization;
using Newtonsoft.Json;
using BilheticaAeronauticaWeb.Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace BilheticaAeronauticaWeb
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

            
            //services.AddSwaggerGen(c =>
            //{
            //    c.SwaggerDoc("v1", new OpenApiInfo { Title = "BilheticaAeronauticaWeb", Version = "v1" });
            //});

            services.AddControllers().AddNewtonsoftJson(options =>
            options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);

            services.AddDbContext<DataContext>(cfg =>
            {
                cfg.UseSqlServer(this.Configuration.GetConnectionString("DefaultConnection"),
                    o => o.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery));
            });

            // CORS CONFIG
            services.AddCors();
            services.AddAuthorization();

            services.AddIdentity<User, IdentityRole>(cfg =>
            {
                //Configuração Token
                cfg.Tokens.AuthenticatorTokenProvider = TokenOptions.DefaultAuthenticatorProvider;
                cfg.Tokens.EmailConfirmationTokenProvider = TokenOptions.DefaultEmailProvider;
                // confirmação por email
                cfg.SignIn.RequireConfirmedEmail = true;
                cfg.User.RequireUniqueEmail = true;
                cfg.Password.RequireDigit = false;
                cfg.Password.RequiredUniqueChars = 0;
                cfg.Password.RequireUppercase = false;
                cfg.Password.RequireLowercase = false;
                cfg.Password.RequireNonAlphanumeric = false;
                cfg.Password.RequiredLength = 6;

            })
              .AddDefaultTokenProviders()
          .AddEntityFrameworkStores<DataContext>();

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(options => {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
                        .GetBytes(Configuration["JWTSettings:TokenKey"]))
                    };
                });


           

            services.AddRazorPages();



            services.AddTransient<SeedDb>();
            services.AddScoped<ICAOTypeDesignatorsMock>();
            services.AddScoped<FlightCompanyMock>();
            services.AddScoped<RegionMock>();
            services.AddScoped<CountryMock>();
            services.AddScoped<CityAirportMock>();
            services.AddScoped<IUserHelper, UserHelper>();
            services.AddScoped<ICityAirportRepository, CityAirportRepository>();
            services.AddScoped<IFlightCabinAndSeatsMapRepository, FlightCabinAndSeatsMapRepository>();
            services.AddScoped<IFlightTicketMetadataRepository, FlightTicketMetadataRepository>();
            services.AddScoped<IFlightRepository, FlightRepository>();
            services.AddScoped<IFlightSeatMapRepository, FlightSeatMapRepository>();
            services.AddScoped<IFlightCabinMapRepository, FlightCabinMapRepository>();
            services.AddScoped<IICAOTDesignatorsRepository, ICAOTDesignatorsRepository>();
            services.AddScoped<IFlightCompanyRepository, FlightCompanyRepository>();
            services.AddScoped<ISeatRepository, SeatRepository>();
            services.AddScoped<ICabinRepository, CabinRepository>();
            services.AddScoped<IAircraftRepository, AircraftRepository>();
            services.AddScoped<IConverterHelper, ConverterHelper>();
            services.AddScoped<IImageHelper, ImageHelper>();
            services.AddScoped<ITokenHelper, TokenHelper>();
            services.AddScoped<IMailHelper, MailHelper>();
            services.AddScoped<IStripeHelper, StripeHelper>();
            services.AddScoped<IFlightTicketRepository, FlightTicketRepository>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // Injeta a classe que está na pasta Middleware
            app.UseMiddleware<ExceptionMiddleware>();

            if (env.IsDevelopment())
            {
                //app.UseDeveloperExceptionPage();
                //app.UseSwagger();
                //app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "BilheticaAeronauticaWeb v1"));
            }

            //app.UseHttpsRedirection();

            app.UseRouting();

            // SERVE BUILD
            app.UseDefaultFiles();
            app.UseStaticFiles();

            // CORS CONFIG
            app.UseCors(opt => {
                opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000");
            });

            app.UseAuthentication();

            app.UseAuthorization();
            

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapRazorPages();
                endpoints.MapControllers();
                endpoints.MapFallbackToController("Index", "Fallback");

            });
        }
    }
}
