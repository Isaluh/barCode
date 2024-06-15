export interface Produto{
    nome : string,
    preco : string,
    imagemCaminho : string,
    categoria : Array<string>
}

export interface Mesa{
    numero : number,
    statusName : string,
    statusCode : number
}

export interface ProdutoComanda{
    quantidade : number,
    nome : string,
    preco : string
}

export interface Comanda{
    mesa : number,
    produtos : ProdutoComanda[],
    total : number
}

export interface Usuario{
    nome : string,
    cpf : number
}

export interface RelatorioTabela{
    numVenda : number,
    data : Date,
    mesa : number,
    preco : number,
    formaPagamento : string
}

export interface Categorias{
    categoria : string
}