using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CreditasChallenge.Domain.Entities
{
    //O acesso ao forum representa um produto fisico
    //isento de tributação segundo a regra de negócio,
    //apenas como titulo de exemplificação
    public class Livro : ProdutoFisico
    {

        public const string ItemIsento = "Item isento de impostos conforme disposto na Constituição Art. 150, VI, d.";

        public string Nome { get; private set; }
        public string Autor { get; private set; }


        protected Livro() { }

        public Livro(string nome, string artista, string urlAcesso, string descricao, string observacao, float preco, int peso) 
            : base(peso, descricao, observacao, preco)
        {
            SetObservacao(string.Format("\n{0}", ItemIsento));
        }

        public override void PreparaEnvio(Usuario usuario)
        {
            base.PreparaEnvio(usuario);
        }
    }
}
