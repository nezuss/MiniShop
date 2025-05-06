namespace Backend.Models
{
    public class Item
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; } = "This item do not have a description.\nWARNING -> Set it up before deploy";
        public string[] Categories { get; set; }
        public double Price { get; set; }
        public int UserId_Created { get; set; }
        public int UserId_Updated { get; set; }
    }
}
