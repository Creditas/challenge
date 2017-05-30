using CreditasChallenge.Domain.Entities;
using CreditasChallenge.Domain.ValueObject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CreditasChallenge.Domain.IRepositories
{
    public interface IUserRepository
    {
        bool EmailJaCadastrado(Email email, int idUsuario);
        bool ValidaCupom(Guid cupom, int idUsuario);
        Usuario Find(Email email);
    }
}
