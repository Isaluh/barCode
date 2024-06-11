package com.bamboobyte.API.controllers;

import com.bamboobyte.API.configuration.FileStorageConfiguration;
import com.bamboobyte.API.models.Produto;
import com.bamboobyte.API.models.ProdutoJSON;
import com.bamboobyte.API.models.ProdutoResponse;
import com.bamboobyte.API.services.ProdutoServiceImpl;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.GsonJsonParser;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.swing.text.html.Option;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.lang.reflect.Array;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/produto")
public class ProdutoController {
    @Autowired
    private ProdutoServiceImpl produtoService;

    private final Path fileStorageLocation;
    public ProdutoController(FileStorageConfiguration fileStorageConfiguration) {
        this.fileStorageLocation = Paths.get(fileStorageConfiguration.getUploadDir())
                .toAbsolutePath().normalize();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> showProduto(@PathVariable String id) {
        System.out.println(id);
        UUID uid = UUID.fromString(id);
        Optional<Produto> produto = this.produtoService.getProdutoById(uid);
        System.out.println(produto.isPresent());
        if (produto.isPresent()) {
            return ResponseEntity.ok(produto.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

//    @GetMapping("/imagem/{arquivo}")
//    public ResponseEntity<Resource> downloadImage(@PathVariable String arquivo_nome) {
//        try {
//            File arquivo = new File(this.fileStorageLocation+arquivo_nome);
//            System.out.println(arquivo_nome.toString());
//            InputStreamResource resource = new InputStreamResource(new FileInputStream(arquivo));
//            return ResponseEntity.
//                    ok().
//                    contentLength(arquivo.length()).
//                    contentType(MediaType.APPLICATION_OCTET_STREAM).
//                    body(resource);
//        } catch (FileNotFoundException exception) {
//            throw new RuntimeException(exception);
////            return ResponseEntity.notFound().build();
//        }
//    }

    @GetMapping("/all")
    public ResponseEntity<List<ProdutoResponse>> listAllProdutos() {
        ArrayList<ProdutoResponse> produtos = new ArrayList<>();
        for (Produto produto:this.produtoService.listAllProduto()) {
            produtos.add(new ProdutoResponse(produto));
        }
        return ResponseEntity.ok(produtos);
    }

    @PostMapping("/new")
    public ResponseEntity<?> createProduto(
        @RequestParam("nome") String nome,
        @RequestParam("preco") float preco,
        @RequestParam("categorias") String categoriasString,
        @RequestParam(required = false) Optional<MultipartFile> imagem
    ) {
        System.out.println("criando "+nome);
        ArrayList<String> categorias = this.parseStringToList(categoriasString);
        categorias.replaceAll(String::strip);
        Produto produto = new Produto(nome, preco, categorias);
        Produto produtoCriado = this.produtoService.saveProduto(produto);
        if (produtoCriado == null) {
            return ResponseEntity.status(409).body("[ ERRO ] Já existe um produto com o nome: "+nome);
        }
        UUID createdId = produtoCriado.getId();
        imagem.ifPresent(multipartFile -> atribuirImagem(produtoCriado, multipartFile));
        URI newProdutoLocation = ServletUriComponentsBuilder.fromCurrentContextPath().path("/produtos/{id}").buildAndExpand(createdId).toUri();
        return ResponseEntity.created(newProdutoLocation).build();
    }

    @PostMapping("/load")
    public ResponseEntity<Void> loadFromJSON(
            @RequestParam("produtos") MultipartFile produtosJSON
    ) throws IOException {
        System.out.println(produtosJSON.getName());
        String jsonContent = new String(produtosJSON.getBytes(), StandardCharsets.UTF_8);
        ObjectMapper mapper = new ObjectMapper();
        ProdutoJSON[] produtoJSONArr;
        System.out.println(jsonContent);
        produtoJSONArr = mapper.readValue(jsonContent, ProdutoJSON[].class) ;

//        try {
//        } catch (Exception exception) {
//            return ResponseEntity.badRequest().build();
//        }
        int produtosCriados = 0;
        for (ProdutoJSON produtoJSON:produtoJSONArr) {
            Produto produto = new Produto(
                produtoJSON.getNome(),
                produtoJSON.getPreco(),
                new ArrayList<>(Arrays.stream(produtoJSON.getCategorias()).toList())
            );
            Produto produtoCriado = this.produtoService.saveProduto(produto);
            if (produtoCriado == null) {
                UUID jaCriado = this.produtoService.getProdutoByNome(produto.getNome()).get().getId();
                this.produtoService.deleteProduto(jaCriado);
                produtoCriado = this.produtoService.saveProduto(produto);

            } else {
                produtosCriados++;
            }
            System.out.println(produtoCriado.getId().toString());
            System.out.println(produtosCriados);
        }
        return ResponseEntity.ok().build();

    }

    @PostMapping("/")
    public ResponseEntity<Void> atualizarProduto(
            @RequestParam("uuid") String uuidString,
            @RequestParam(required = false) Optional<Float> preco,
            @RequestParam(name="categorias", required = false) Optional<String> categoriasString,
            @RequestParam(required = false) Optional<MultipartFile> imagem
    ) {
        UUID uid = UUID.fromString(uuidString);
        Optional<Produto> produtoOptional = this.produtoService.getProdutoById(uid);
        if (produtoOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Produto produto = produtoOptional.get();
        preco.ifPresent(produto::setPreco);
        if (categoriasString.isPresent()) {
            ArrayList<String> categorias = parseStringToList(categoriasString.get());
            produto.setCategorias(categorias);
        }

        boolean isImagemAtribuida = false;
        if (imagem.isPresent()) {
            isImagemAtribuida =  atribuirImagem(produto, imagem.get());
        } else  {
            this.produtoService.saveProduto(produto);
        }
        URI newProdutoLocation = ServletUriComponentsBuilder.fromCurrentContextPath().path("/produtos/{id}").buildAndExpand(uid).toUri();
        return ResponseEntity.created(newProdutoLocation).build();
    }

    @PostMapping("/set/imagem")
    public ResponseEntity<Void> adicionarImagem(
            @RequestParam(required = false) Optional<String> nome ,
            @RequestParam(required = false) Optional<String> uuidString,
            @RequestParam MultipartFile imagem
    ) {
        Optional<Produto> produtoOptional;
        if (uuidString.isPresent()) {
            UUID uid = UUID.fromString(uuidString.get());
            produtoOptional = this.produtoService.getProdutoById(uid);
        } else if(nome.isPresent()) {
            produtoOptional = this.produtoService.getProdutoByNome(nome.get());
        } else {
            return ResponseEntity.badRequest().build();
        }
        if (produtoOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Produto produto = produtoOptional.get();
        atribuirImagem(produto, imagem);
        URI newProdutoLocation = ServletUriComponentsBuilder.fromCurrentContextPath().path("/produtos/{id}").buildAndExpand(produto.getId()).toUri();
        return ResponseEntity.created(newProdutoLocation).build();
    }


    //
    private ArrayList<String> parseStringToList(String string) {
        return new ArrayList<>(Arrays.stream(string.split(",")).toList());
    }


    private boolean atribuirImagem(UUID idProduto, MultipartFile imagem) {
        Optional<Produto> produto = this.produtoService.getProdutoById(idProduto);
        if (produto.isPresent()) {
            return atribuirImagem(produto.get(), imagem);
        } else {
           return false;
        }
    }
    private boolean atribuirImagem(Produto produto, MultipartFile imagem) {
        try {
            int i = imagem.getOriginalFilename().lastIndexOf('.');
            String extensao="";
            if (i > 0) {
                extensao = imagem.getOriginalFilename().substring(i);
                // isso retorna a extensao com o .
            } else {
                return false;
            }
            String[] aceitarSomente = {".png", ".jpg", ".jpeg"};
            boolean extensaoValida = false;
            for (String acpt:aceitarSomente) {
                if (acpt.equals(extensao)) {
                    extensaoValida = true;
                }
            }
            if (!extensaoValida) {
                return false;
            }
            Path caminhoReal = fileStorageLocation.resolve("/imagens/"+produto.getId().toString()+extensao);
            Path imagemCaminho = Paths.get("content/"+produto.getId().toString()+extensao);
            imagem.transferTo(caminhoReal);
            produto.setImagemCaminho(imagemCaminho.toString().replaceAll("\\\\","/"));
        } catch (IOException exception) {
            throw new RuntimeException(exception);
        }
        this.produtoService.saveProduto(produto);
        return true;
    }
}
