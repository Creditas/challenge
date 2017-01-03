namespace BankFacil
{
    public abstract class Product
    {
        public string Name { get; }

        public Product(string name)
        {
            Name = name;
        }
    }
}
