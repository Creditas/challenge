namespace BankFacil
{
    public class OrderItem
    {
        public Order Order { get; }
        public Product Product { get; }

        public int Total { get { return 10; } }

        public OrderItem(Order order, Product product)
        {
            Order = order;
            Product = product;
        }
    }
}
