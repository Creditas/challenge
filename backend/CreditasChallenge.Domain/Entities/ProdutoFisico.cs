using CreditasChallenge.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CreditasChallenge.Domain.Entities
{
    public class ProdutoFisico : Produto
    {

        public float Peso { get; private set; }


        public void SetPeso(float peso)
        {
            Guardian.ForPositiveValue((uint)peso, "O peso não pode ser menor que zero");
            Peso = peso;
        }

        protected ProdutoFisico() { }

        public ProdutoFisico(float peso, string descricao, string observacao, float preco) 
            : base( descricao, observacao, preco)
        {
            SetPeso(peso);
        }

        public override void PreparaEnvio(Usuario endereco)
        {
            GeraShippingLabel(string.Format("{0}{1}", endereco, Observacao));
        }

        //TODO Implementar
        private void GeraShippingLabel(string shippingLabel) { }
    }
}
