using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CreditasChallenge.Domain.Entities.Base
{

    //O acesso ao forum representa uma produto digital 
    //apenas como titulo de exemplificação
    public class Musica : ProdutoDigital
    {
        public string Nome { get;  private set;}
        public string Artista { get; private set; }


        protected Musica() { }

        public Musica(string nome, string artista, string urlAcesso, string descricao, string observacao, float preco) 
            : base(urlAcesso, descricao, observacao, preco)
        {

        }

        public override void PreparaEnvio(Usuario usuario)
        {
            base.PreparaEnvio(usuario);
        }
    }
}
