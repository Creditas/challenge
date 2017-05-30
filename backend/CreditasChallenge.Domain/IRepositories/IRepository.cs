using CreditasChallenge.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CreditasChallenge.Domain.IRepositories
{
    public interface IRepository<T> where T : EntityBase
    {

        void Add(T entity);
        void AddAll(IEnumerable<T> entities);
        void DeleteAll(IEnumerable<T> entities);
        void Delete(T entity);
        void Delete(int idEntity);
        void Update(T entity);
        void FlushTransaction();
        T Find(int id);


    }
}
