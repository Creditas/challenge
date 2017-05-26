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
    public class EmailTest
    {

        [TestMethod]
        [ExpectedException(typeof(Exception))]
        public void Email_NovoEmailEmBranco()
        {
            var email = new Email("");
        }

        [TestMethod]
        [ExpectedException(typeof(Exception))]
        public void Email_NovoEmailNulo()
        {
            var email = new Email(null);
        }

        [TestMethod]
        public void Email_NovoEmailValido()
        {
            var end = "jc.bombardelli@live.com";
            var email = new Email(end);
            Assert.AreEqual(end, email.Endereco);
        }

        [TestMethod]
        [ExpectedException(typeof(Exception))]
        public void Email_NovoEmailInvalido()
        {
            var end = "hu3hu3hu3BR.com.br";
            var email = new Email(end);
        }

        [TestMethod]
        [ExpectedException(typeof(Exception))]
        public void Email_NovoEmailTamanhoMaximo()
        {
            var end = "jc.bombardelli@live.com";

            while(end.Length < Email.EnderecoMaxLenght + 1)
            {
                end += end;
            }
            var email = new Email(end);
        }


    }
}
