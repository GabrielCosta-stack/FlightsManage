namespace BilheticaAeronauticaWeb.DTOs
{
    public class UserDTO
    {
        public string UserName { get; set; }

        public string Token { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Address { get; set; }

        public string PhoneNumber { get; set; }

        public int AL { get; set; }

        public string FullName => $"{FirstName} {LastName}";
    }
}
