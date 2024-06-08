package com.bamboobyte.API.controllers;

import com.bamboobyte.API.models.Produto;
import com.bamboobyte.API.services.ProdutoServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.UUID;
import java.util.stream.Collectors;


@RestController
@RequestMapping({"/produto"})
public class ProdutoController {
    @Autowired
    private ProdutoServiceImpl produtoService;

    @GetMapping("/{id}")
    public ResponseEntity<Produto> showProduto(@PathVariable String id) {
        UUID uid = UUID.fromString(id);
        return ResponseEntity.ok(this.produtoService.getProdutoById(uid));
    }

//    TODO ARRUMAR ESSA BOMBA!
    @PostMapping("/new")
    public ResponseEntity<Produto> createProduto(
        @RequestParam("nome") String nome,
        @RequestParam("preco") String precoString,
        @RequestParam("categorias") String categoriasString,
        @RequestParam("imagemCaminho") String imagemCaminho
    ) {
        float preco = Float.parseFloat(precoString);
        System.out.println("criando"+nome);
        ArrayList<String> categorias = (ArrayList<String>) Arrays.stream(categoriasString.split(",")).toList();
        Produto produto = new Produto(nome, preco, categorias, imagemCaminho);
        UUID createdId = this.produtoService.saveProduto(produto).getId();
        URI newProdutoLocation = ServletUriComponentsBuilder.fromCurrentContextPath().path("/produtos/{id}").buildAndExpand(createdId).toUri();
        return ResponseEntity.created(newProdutoLocation).build();
    }

//    @PostMapping("/load")


//    @PostMapping("/new")
//    public ResponseEntity<Garcom> createGarcom(@RequestParam("cpf") String cpf, @RequestParam("password") String password) {
//        Garcom garcom = new Garcom(cpf, password);
//        garcomService.saveGarcom(garcom);
//        UUID createdId = this.garcomService.saveGarcom(garcom).getId();
//        URI newGarcomLocation = ServletUriComponentsBuilder.fromCurrentContextPath().path("/garcom/{id}").buildAndExpand(createdId).toUri();
//        return ResponseEntity.created(newGarcomLocation).build();
//    }

//    @GetMapping("/{id}")
//    public ResponseEntity<CappedUserResponse> showUser(@PathVariable String id){
//        UUID uid = UUID.fromString(id);
//        System.out.println(uid);
//        return ResponseEntity.ok(new CappedUserResponse(this.userService.getUserById(uid)));
//    }
//
//    @PostMapping("/mod/{id}")
//    public void modifyUser(@PathVariable UUID id, @RequestBody ModifyUserBody body) {
//        this.userService.modifyUser(id, body.field, body.value);
//    }
//
//    @GetMapping("/sample-user")
//    public String newProduct(Model model) {
//        userService.saveUser(new User("teste","da silva","teste.silva","testedasilva@gmail.com", "ansjkdbnjaskzxk!21"));
//        return "User criado";
//    }
    
}
