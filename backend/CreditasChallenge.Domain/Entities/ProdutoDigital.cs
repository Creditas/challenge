using CreditasChallenge.Domain.ValueObject;
using CreditasChallenge.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CreditasChallenge.Domain.Entities
{
    public class ProdutoDigital : Produto
    {

        public string URLAcesso { get; private set; }


        public void SetUrlAcesso(string urlAcesso)
        {
            Guardian.ForNullOrEmpty(urlAcesso, "Um link para acesso ao produto digital é obrigatório");
            URLAcesso = urlAcesso;
        }


        public override void PreparaEnvio(Usuario usuario)
        {
            EnviaEmail(usuario.Email, URLAcesso);
            usuario.Cupons.Add(Guid.NewGuid());
        }


        //TODO Implementar
        public void EnviaEmail(Email email, string linkAcesso) { }


        protected ProdutoDigital() { }

        public ProdutoDigital(string urlAcesso, string descricao, string observacao, float preco) 
            : base( descricao, observacao, preco)
        {
            SetUrlAcesso(urlAcesso);
        }

        
    }
}
