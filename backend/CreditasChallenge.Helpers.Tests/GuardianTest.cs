using CreditasChallenge.Helpers;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CreditasChallenge.Helpers.Tests
{

    [TestClass]
    public class GuardianTest
    {

        [TestMethod]
        [ExpectedException(typeof(Exception))]
        public void Guardian_ForNullOrEmpty_ErrorWhenIsEmpty()
        {
            Guardian.ForNullOrEmpty(string.Empty, "Value cant be empty");
        }

        [TestMethod]
        [ExpectedException(typeof(Exception))]
        public void Guardian_ForNullOrEmpty_ErrorWhenIsNull()
        {
            Guardian.ForNullOrEmpty(null, "Value cant be null");
        }

        [TestMethod]
        [ExpectedException(typeof(Exception))]
        public void Guardian_ForStringLenght_OutSideLenght()
        {
            Guardian.ForStringLength("abcde", 4, "Value cant be greater then Max Lenght");
        }


        [TestMethod]
        public void Guardian_ForStringLenght_InsideLenght()
        {
            Guardian.ForStringLength("abcd", 4, "Value cant be greater then Max Lenght");
        }
    }
}
