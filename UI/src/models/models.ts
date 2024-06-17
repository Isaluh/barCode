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

export interface Usuario{
    nome : string,
    cpf : number
}

export interface RelatorioTabela{
    numero : number,
    data : string,
    numMesa : number,
    valor : number,
    meioPagamento : string
}

export interface Categorias{
    categoria : string
}

export interface Comanda{
    numero : number,
    statusName : string,
    statusCode : number,
    produtos : ProdutoComanda[],
    total : number
}

export interface ProdutoComanda{
    quantidade : number,
    produto : string,
    precoUnitario : number
}

export interface Login{
    acessLevel : string
}