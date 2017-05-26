using CreditasChallenge.Domain.ValueObject;
using CreditasChallenge.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CreditasChallenge.Domain.Entities
{
    public abstract class Produto : EntityBase
    {

        public string Descricao { get; private set; }
        public string Observacao { get; private set; }
        public uint Preco { get; private set; }

        public abstract void PreparaEnvio(Usuario usuario);

        public void SetDescricao(string descricao)
        {
            Guardian.ForNullOrEmpty(descricao, "Todo produto Deve ter uma descrição");
            Descricao = descricao;
        }

        public void SetObservacao(string observacao)
        {
            Observacao += observacao;
        }

        public void SetPreco(uint preco)
        {
            Guardian.ForPositiveValue(preco, "O valor cadastrado deve ser maior que zero");
            Guardian.ForMaxUintValue(preco, string.Format("o Valor maximo deve ser {0}", uint.MaxValue));
        }


        protected Produto() { }

        public Produto(string descricao, string observacao, float preco)
        {

        }

    }
}
