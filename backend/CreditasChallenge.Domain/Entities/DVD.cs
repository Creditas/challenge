using CreditasChallenge.Domain.Entities.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CreditasChallenge.Domain.Entities
{

    //O acesso ao forum representa um produto fisico
    //sem isenção de tributação segundo a regra de negócio,
    //apenas como titulo de exemplificação
    public class DVD : ProdutoFisico
    {
        public TipoMidia TipoMidia { get; private set; }


        public void SetTipoMidia(TipoMidia tipoMidia)
        {
            TipoMidia = tipoMidia;
        }

        protected DVD() { }

        public DVD(TipoMidia tipoMedia)
        {

            SetTipoMidia(tipoMedia);
        }

    }
}
