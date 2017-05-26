using CreditasChallenge.Domain.Entities;
using CreditasChallenge.Domain.ValueObject;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace CreditasChallenge.Domain.Tests.Entities
{
    [TestClass]
    public class UsuarioTest
    {

        public string Nome { get; set; }
        public Email Email { get; set; }
        public Endereco Endereco { get; set; }


        public UsuarioTest()
        {
            Email = new Email("jc.bombardelli@live.com");
            Nome = "JC Bombardelli";
            Endereco = new Endereco("Rua A", "", "265B", "Castelo", "Santos", "SP", "11087200");

        }

        [TestMethod]
        [ExpectedException(typeof(Exception))]
        public void Endereco_NovoUsuarioNomeEmBranco()
        {
            var usuario = new Usuario("", Email, Endereco);
        }

        [TestMethod]
        [ExpectedException(typeof(Exception))]
        public void Endereco_NovoUsuarioNomeNull()
        {
            var usuario = new Usuario(null, Email, Endereco);
        }


        [TestMethod]
        [ExpectedException(typeof(Exception))]
        public void Endereco_NovoUsuarioEmailNull()
        {
            var usuario = new Usuario("JC Bombardelli", null, Endereco);
        }

        [TestMethod]
        [ExpectedException(typeof(Exception))]
        public void Endereco_NovoUsuarioEnderecoNull()
        {
            var usuario = new Usuario("JC Bombardelli", Email, null);
        }
    }
}
