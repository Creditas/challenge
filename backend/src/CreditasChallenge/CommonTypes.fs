namespace CommonTypes

module RestrictedStrings =

    open System
    open System.Text.RegularExpressions
    
    /// Partial Active Pattern - quero apenas um pedaço do universo das strings possíveis 
    /// seja utilizado na validação - só me interessam as strings que tenham tamanho menor que 50. 
    /// Logo, este active pattern pode ser lido assim: "função que retorna HasNoMoreThan50Chars ou 
    /// retorna None". Veja que temos um OR: Ou é uma opção OU é outra!
    let (|HasNoMoreThan50Chars|_|) (str:String) = 
        if str.Length <= 50 then 
            // retornar um Some com a própria opção selecionada .Na verdade o retorno não é 
            // utilizado para nada - mas serve para indicar no pattern matching logo abaixo
            // que sim, retornou algo "positivo" durante a checagem.
            Some HasNoMoreThan50Chars 
        else None


    let (|HasNoMoreThan100Chars|_|) (str:String) = 
        if str.Length <= 100 then 
            // retornar um Some com a própria opção selecionada .Na verdade o retorno não é 
            // utilizado para nada - mas serve para indicar no pattern matching logo abaixo
            // que sim, retornou algo "positivo" durante a checagem.
            Some HasNoMoreThan100Chars 
        else None


    let (|HasOnlyValidChars|_|) (str:String) =  
        if Regex.IsMatch(str, @"[A-z]{2}[a-zA-z0-9]{5,18}" ) then 
            Some HasOnlyValidChars 
        else None


    type String50 = String50 of content : string
    type String100 = String100 of content: string

    let createString50 (v : string) = 
        match v with
        | HasNoMoreThan50Chars & HasOnlyValidChars-> Some(String50 v)
        | _ -> None

    
    let createString100 (v : string) = 
        match v with
        | HasNoMoreThan100Chars & HasOnlyValidChars-> Some(String100 v)
        | _ -> None
    
    let unwrapString50 (String50 s) = s
    let unwrapString100 (String100 s) = s
   

module CurrencyTypes = 
    
    [<Measure>] type BRL
    [<Measure>] type USD
    [<Measure>] type EUR


