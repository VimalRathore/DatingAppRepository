using System;
using Microsoft.AspNetCore.Http;
using System.Runtime.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace DatingApp.API.Helper
{
    public static class Helper
    {
      public static void AddApplicationError(this HttpResponse response, string  message)
        {
            if (response == null)
            {
                throw new System.ArgumentNullException(nameof(response));
            }
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Controle-Allow-Origin", "*");
        }

      public static void AddPagination(this HttpResponse response, int currentPage, int itemsPerPage, int totalItems, int totalPages)
       {
           var paginationHeader = new PaginationHeader(currentPage, itemsPerPage, totalItems, totalPages);
           var camelCaseFormatter = new JsonSerializerSettings();
           camelCaseFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
           response.Headers.Add("Pagination", JsonConvert.SerializeObject(paginationHeader, camelCaseFormatter));
           response.Headers.Add("Access-Control-Expose-Headers", "Pagination");
       }
        public static int CalculateAge(this DateTime dateTime)
        {
           var age = DateTime.Today.Year- dateTime.Year;
           if(dateTime.AddYears(age) > DateTime.Today)
           {
               age--;
           }
           return age;
        }
    }
}