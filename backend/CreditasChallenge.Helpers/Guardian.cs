using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CreditasChallenge.Helpers
{
    public class Guardian
    {
        public static void ForNullOrEmpty(string value, string msgError)
        {
            if (string.IsNullOrEmpty(value))
                throw new Exception(msgError);
        }

        public static void ForStringLength(string value, int maxLenght, string msgError)
        {
            if (value.Length > maxLenght)
                throw new Exception(msgError);
        }

        public static void ForPositiveValue(uint value, string msgError)
        {
            
            if (0 > value)
                throw new Exception(msgError);
        }

        public static void ForMaxUintValue(uint value, string msgError)
        {
            if(value > uint.MaxValue)
            {
                throw new Exception(msgError);
            }
        }
    }
}
