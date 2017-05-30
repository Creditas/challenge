using CreditasChallenge.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace CreditasChallenge.Domain.ValueObject
{
    public class Email
    {

        public const int EnderecoMaxLenght = 254;

        public string Endereco { get; private set; }


        public void SetEndereco(string endereco)
        {
            Guardian.ForNullOrEmpty(endereco, "Email invalido");
            Guardian.ForStringLength(endereco, EnderecoMaxLenght, "Tamanho excedeu ao limite");

            if (!IsValid(endereco))
                throw new Exception("Email Invalido");

            this.Endereco = endereco;
        }


        protected Email() { }

        public Email(string endereco)
        {
            SetEndereco(endereco);
        }

        public static bool IsValid(string email)
        {
            var regex = new Regex(@"^(?("")("".+?""@)|(([0-9a-zA-Z]((\.(?!\.))|[-!#\$%&'\*\+/=\?\^`\{\}\|~\w])*)(?<=[0-9a-zA-Z])@))(?(\[)(\[(\d{1,3}\.){3}\d{1,3}\])|(([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,6}))$");
            return regex.IsMatch(email);
        }
    }
}
