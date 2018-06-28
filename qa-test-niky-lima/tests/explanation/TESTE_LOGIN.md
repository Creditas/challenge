## Levantamento de Requisitos - Página de Login

**Desenvolvimento da página de login da CREDITAS**

1. Contextualização

       - A página de login deverá conter:

first```
       Uma header com o logo da CREDITAS no canto superior esquerdo;
       E no canto superior direito deverá conter um link chamado "Ajuda";
       Um título no formulário com os dizeres "Entre para ver a sua solicitação de empréstimo";
       Um campo para o preenchimento do CPF ou EMAIL;
       Um campo para o preenchimento da Senha;
       Um botão "Entrar";
       E um link com os frase "ESQUECEU A SENHA?".
```
2. Regras

second```
       O logo da CREDITAS deverá redirecionar para a HOME PAGE do site;
       
       O link Ajuda deverá redirecionar para página de AJUDA do site;
       
       O formulário e os elementos html que estarão dispostos dentro do
       mesmo deverão estar centralizados (alinhados no centro da página);
       
       O campo de preenchimento de CPF ou EMAIL deverão aceitar
       os símbolos (apenas @, _, ., -) e alfanuméricos.
       
       Se preenchido com CPF, apenas 11 dígitos, e uma máscara de CPF
       deverá ser aplicada;
       
       Se for preenchido com EMAIL, deverá ter o padrão nome@domínio;
       
       Verificar se o EMAIL é preenchido com nome+123@domínio, se for
       um EMAIL com o sinal (+), invalidar;
       
       A senha deverá possuir pelo menos 1 dígito, 1 letra maiúscula e
       um símbolo. O tamanho não poderá ser maior do que N caracteres;

       Ao em ENTRAR, o usuário só poderá ter o acesso à plataforma se:
       O CPF ou EMAIL estiverem corretos, senão um alerta de CPF ou EMAIL
       inválido deverá ser disparado;

       O mesmo para SENHA, mas nesse caso o alerta será de Senha Inválida!;

       Caso ele esqueça de preencher algum campo, um alerta de falta de 
       preenchimento deverá ser apresentado. A ordem de precedência é o
       CPF ou EMAIL, depois SENHA;

       Caso ele tente preencher os campos com caracteres não permitidos,
       bloquear com uma máscara o preenchimento;

       Caso ele clique no link "ESQUECEU A SENHA?", ele deverá ser
       redirecionado para a página de recuperação ou troca de senha.
```
## [Ir para o README](../README.md)