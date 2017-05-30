using CreditasChallenge.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CreditasChallenge.Domain.ValueObject
{
    public class Endereco
    {
        public const int LogradouroMaxLength = 150;
        public virtual string Logradouro { get; private set; }

        public const int ComplementoMaxLength = 50;
        public virtual string Complemento { get; private set; }

        public const int NumeroMaxLength = 50;
        public virtual string Numero { get; private set; }

        public const int BairroMaxLength = 50;
        public virtual string Bairro { get; private set; }

        public const int CidadeMaxLength = 50;
        public virtual string Cidade { get; private set; }

        public const int EstadoMaxLenght = 50;
        public string Estado { get; private set; }

        public const int CepMaxLenght = 9;
        public virtual string Cep { get; private set; }

        protected Endereco() { }

        public Endereco(string logradouro, string complemento, string numero, string bairro,
            string cidade, string estado, string cep)
        {
            SetCep(cep);
            SetBairro(bairro);
            SetCidade(cidade);
            SetComplemento(complemento);
            SetLogradouro(logradouro);
            SetNumero(numero);
            SetEstado(estado);
        }

        public void SetCep(string cep)
        {
            Guardian.ForNullOrEmpty(cep, "CEP é obrigatório");
            //TODO: Implementar outras validações
            Cep = cep;
        }

        public void SetComplemento(string complemento)
        {
            if (string.IsNullOrEmpty(complemento))
                complemento = "";
            Complemento = complemento;
        }

        public void SetLogradouro(string logradouro)
        {
            Guardian.ForNullOrEmpty(logradouro, "Endereço obrigatório");
            Logradouro = logradouro;
        }

        public void SetNumero(string numero)
        {
            Guardian.ForNullOrEmpty(numero, "Número obrigatório");
            Numero = numero;
        }

        public void SetBairro(string bairro)
        {
            Guardian.ForNullOrEmpty(bairro, "Bairro obrigatório");
            Bairro = bairro;
        }

        public void SetCidade(string cidade)
        {
            Guardian.ForNullOrEmpty(cidade, "Numero obrigatório");
            Cidade = cidade;
        }

        public void SetEstado(string estado)
        {
            Guardian.ForNullOrEmpty(estado, "Numero obrigatório");
            Estado = Estado;
        }

        public override string ToString()
        {
            return string.Format("{0},{1} - {2}\n{3} - {4}\n{5} - {6}", Logradouro, Numero, Complemento, Bairro, Cidade, Cep, Estado);
        }
    }
}
