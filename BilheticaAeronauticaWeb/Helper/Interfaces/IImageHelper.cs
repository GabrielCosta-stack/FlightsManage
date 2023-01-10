﻿using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace BilheticaAeronauticaWeb.Helper.Interfaces
{
    public interface IImageHelper
    {
        Task<string> UploadImageAsync(IFormFile imageFile, string folder);
    }
}
