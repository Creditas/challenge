using CreditasChallenge.Domain.ValueObject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CreditasChallenge.Domain.Entities
{
    public class ProdutoServico : Produto
    {

        public DateTime Inicio { get; private set; }
        public DateTime? Fim { get; private set; }



        public void SetInicio(DateTime inicio)
        {
            Inicio = inicio;
        }

        public void SetFim(DateTime fim)
        {
            Fim = fim;
        }

        protected ProdutoServico() { }

        public ProdutoServico(DateTime inicio, DateTime fim, string descricao, string observacao, float preco) 
            : base( descricao, observacao, preco)
        {
            SetInicio(inicio);
            SetFim(fim);
        }


        public override void PreparaEnvio(Usuario usuario)
        {
            EnviaEmail(usuario.Email, Observacao);
            usuario.AddServico(this);

        }

        //TODO Implementar
        public void EnviaEmail(Email email, string msgAtivado) { }


    }
}
