using CreditasChallenge.Domain.ValueObject;
using CreditasChallenge.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CreditasChallenge.Domain.Entities
{
    public class Usuario : EntityBase
    {
        public string Nome { get; private set; }
        public Email Email { get; private set; }
        public Endereco Endereco { get; private set; }
        public List<Guid> Cupons { get; private set; }
        public List<ProdutoServico> Servicos { get; private set; }


        protected Usuario() { }

        public Usuario(string nome, Email email, Endereco endereco)
        {
            SetNome(nome);
            SetEmail(email);
            SetEndereco(endereco);
        }

        public void SetNome(string nome)
        {
            Guardian.ForNullOrEmpty(nome, "Nome obrigatório");
            this.Nome = nome;
        }

        public void SetEmail(Email email)
        {
            if (Email == null)
                throw new Exception("Email não pode ser vazio");
            Email = email;
        }

        public void SetEndereco(Endereco endereco)
        {
            if (Endereco == null)
                throw new Exception("Endereço não pode ser vazio");
            Endereco = endereco;
        }

        public void AddCupom(Guid cupom)
        {
            Guardian.ForNullOrEmpty(cupom.ToString(), "Cupom nulo");
            Cupons.Add(cupom);
        }

        public void RemoveCupom(Guid cupom)
        {
            Guardian.ForNullOrEmpty(cupom.ToString(), "Cupom nulo");
            Cupons.Remove(cupom);
        }

        public void AddServico(ProdutoServico servico)
        {
            if (servico != null)
                Servicos.Add(servico);
        }

        public void RemoveServico(ProdutoServico servico)
        {
            if (servico != null)
                Servicos.Remove(servico);
        }


    }
}
