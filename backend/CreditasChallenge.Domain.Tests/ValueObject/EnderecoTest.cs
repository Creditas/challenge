using CreditasChallenge.Domain.ValueObject;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CreditasChallenge.Domain.Tests.ValueObject
{
    [TestClass]
    public class EnderecoTest
    {
        [TestMethod]
        [ExpectedException(typeof(Exception))]
        public void Endereco_NovoEnderecoLogradouroEmBranco()
        {
            var endereco = new Endereco("", "HU3BR", "258","Castelo","Santos","SP", "11087200");
        }

        [TestMethod]
        [ExpectedException(typeof(Exception))]
        public void Endereco_NovoEnderecoLogradouroNull()
        {
            var endereco = new Endereco(null, "HU3BR", "258", "Castelo", "Santos", "SP", "11087200");
        }

        [TestMethod]
        [ExpectedException(typeof(Exception))]
        public void Endereco_NovoEnderecoNumeroEmBranco()
        {
            var endereco = new Endereco("rua A", "HU3BR", "", "Castelo", "Santos", "SP", "11087200");
        }


        [TestMethod]
        [ExpectedException(typeof(Exception))]
        public void Endereco_NovoEnderecoNumeroNull()
        {
            var endereco = new Endereco("rua A", "HU3BR", null, "Castelo", "Santos", "SP", "11087200");
        }

        [TestMethod]
        [ExpectedException(typeof(Exception))]
        public void Endereco_NovoEnderecoBairroEmBranco()
        {
            var endereco = new Endereco("rua A", "HU3BR", "265", "", "Santos", "SP", "11087200");
        }


        [TestMethod]
        [ExpectedException(typeof(Exception))]
        public void Endereco_NovoEnderecoBairroNull()
        {
            var endereco = new Endereco("rua A", "HU3BR", "265", null, "Santos", "SP", "11087200");
        }

        [TestMethod]
        [ExpectedException(typeof(Exception))]
        public void Endereco_NovoEnderecoCidadeEmBranco()
        {
            var endereco = new Endereco("rua A", "HU3BR", "265", "Castelo", "", "SP", "11087200");
        }


        [TestMethod]
        [ExpectedException(typeof(Exception))]
        public void Endereco_NovoEnderecoCidadeNull()
        {
            var endereco = new Endereco("rua A", "HU3BR", "265", "Castelo", null, "SP", "11087200");
        }

        [TestMethod]
        [ExpectedException(typeof(Exception))]
        public void Endereco_NovoEnderecoEstadoNull()
        {
            var endereco = new Endereco("rua A", "HU3BR", "265", "Castelo", "Santos", "", "11087200");
        }

        [TestMethod]
        [ExpectedException(typeof(Exception))]
        public void Endereco_NovoEnderecoEstadoEmBranco()
        {
            var endereco = new Endereco("rua A", "HU3BR", "265", "Castelo", "Santos", null, "11087200");
        }

        [TestMethod]
        [ExpectedException(typeof(Exception))]
        public void Endereco_NovoEnderecoCepEmBranco()
        {
            var endereco = new Endereco("rua A", "HU3BR", "265", "Castelo", "Santos", "SP", "");
        }


        [TestMethod]
        [ExpectedException(typeof(Exception))]
        public void Endereco_NovoEnderecoCepNull()
        {
            var endereco = new Endereco("rua A", "HU3BR", "265", "Castelo", "Santos", "SP", null);
        }
    }
}
