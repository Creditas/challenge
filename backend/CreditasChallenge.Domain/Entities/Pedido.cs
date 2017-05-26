using CreditasChallenge.Domain.ValueObject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CreditasChallenge.Domain.Entities
{

    //Conjunto de Produtos e quantidades que um usuario fará
    //a compra ou o acesso, em caso de uma assinatura
    public class Pedido : EntityBase
    {
        public Usuario Usuario { get; private set; }
        public Dictionary<Produto, int> Produtos { get; private set; }

        protected Pedido() { }

        public Pedido(Usuario usuario, Produto produto, int qtd)
        {
            SetUsuario(usuario);
            AddProduto(produto, qtd);
        }

        public void SetUsuario(Usuario usuario)
        {
            if (usuario == null)
                throw new Exception("Usuario não pode ser nulo");
        }

        public void ClearProdutos()
        {
            Produtos.Clear();
        }

        public void AddProduto(Produto produto, int qtd)
        {
            if (produto == null || qtd < 1)
                throw new Exception("Não é possivel adicionar produto");

            if (Produtos.Keys.Contains(produto))
                Produtos[produto] += qtd;
            else
                Produtos.Add(produto, qtd);
        }

        public void RemoveProduto(Produto produto)
        {
            if (Produtos.Keys.Contains(produto))
                Produtos.Remove(produto);
        }

        public void RemoveQuantidade(Produto produto, int qtd)
        {
            Produtos[produto] -= qtd;
            if (Produtos[produto] <= 0)
                Produtos.Remove(produto);
        }


        public void FinalizarPedido(Pagamento pagamento)
        {

            if (pagamento != null)
                foreach (Produto p in Produtos.Keys)
                {
                    p.PreparaEnvio(Usuario);
                }
        }

        //TODO Implementar
        private void GeraShippingLabel(string shippingLabel) { }
    }
}
