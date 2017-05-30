using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CreditasChallenge.Domain.Entities
{

    //O acesso ao forum representa uma assinatura 
    //apenas como titulo de exemplificação
    public class Forum : ProdutoServico
    {


        public const string parabens = "Parabéns, sua assinatura está ativa";
        public const int diasAtivos = 30;


        protected Forum() { }


        public Forum(DateTime dataInicio, DateTime dataFim, string nome, string descricao, string observacao, float preco)
            : base(dataInicio, dataFim, descricao,  observacao, preco) { }

        public override void PreparaEnvio(Usuario usuario)
        {
            SetInicio(new DateTime());
            SetFim(Inicio.AddDays(diasAtivos));
            SetObservacao(parabens);
            base.PreparaEnvio(usuario);
        }

    }
}
