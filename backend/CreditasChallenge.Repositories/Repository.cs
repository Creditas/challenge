using CreditasChallenge.Domain.Entities;
using CreditasChallenge.Domain.IRepositories;
using System;
using System.Collections.Generic;

namespace CreditasChallenge.Repositories
{
    public class Repository<T> : IRepository<T> where T : EntityBase
    {

        //Adiciona um novo item na base de dados
        public void Add(T entity)
        {
            throw new NotImplementedException();
        }

        //Adiciona uma lista de novos itens na base de dados
        public void AddAll(IEnumerable<T> entities)
        {
            throw new NotImplementedException();
        }

        //Remove um item na base de dados através de seu ID
        public void Delete(int idEntity)
        {
            throw new NotImplementedException();
        }

        //Remove um item na base de dados
        public void Delete(T entity)
        {
            throw new NotImplementedException();
        }

        //Remove Uma lista de itens cadastrados
        public void DeleteAll(IEnumerable<T> entities)
        {
            throw new NotImplementedException();
        }

        //Busca um item cadastrado atravé de seu ID
        public T Find(int id)
        {
            throw new NotImplementedException();
        }


        //Finaliza a Tranção e realiza a persistencia no  banco de dados
        public void FlushTransaction()
        {
            throw new NotImplementedException();
        }

        //Atualiza um item existente na base de dados
        public void Update(T entity)
        {
            throw new NotImplementedException();
        }
    }
}
