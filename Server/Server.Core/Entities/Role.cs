namespace Server.Core.Entities
{
    public class Role
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public bool IsManagementRole { get; set; }
    }
}
