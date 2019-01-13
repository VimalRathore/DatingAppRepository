using System;
using Microsoft.AspNetCore.Http;

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