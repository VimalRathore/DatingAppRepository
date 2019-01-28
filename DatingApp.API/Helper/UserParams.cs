namespace DatingApp.API.Helper
{
    public class UserParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } =1;
        public int PageSize = 10;
        public int MyProperty
        {
            get { return PageSize;}
            set { PageSize  =  (value> MaxPageSize)? MaxPageSize: value;}
        }

        public int UserId { get; set; }
        public string Gender { get; set; }
        public int MinAge { get; set; } = 18;
        public int MaxAge { get; set; } = 99;
        public string OrderBy { get; set; }

        public bool Likees { get; set; } = false;
        public bool Likers { get; set; } = false;
        
    }
}