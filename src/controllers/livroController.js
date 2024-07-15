import livro from "../models/Livro.js";
import {autor} from "../models/Autor.js";
import NaoEncontrado from "../errors/NaoEncontrado.js";

class LivroController {

  static async listarLivros (req, res, next) {
    try {
      const listaLivros = await livro.find({});
      res.status(200).json(listaLivros);
    } catch (error) {
      next(error);
    }
  }

  static async listarLivrosPorId (req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);
      if(livroEncontrado != null){
        res.status(200).json(livroEncontrado);
      } else {
        next(new NaoEncontrado("Id do Livro não encontrado"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async cadastrarLivro (req, res, next) {
    const novoLivro = req.body;

    try {
      const autorEncontrado =  await autor.findById(novoLivro.autor);
      const livroCompleto = {
        ...novoLivro, 
        autor: { ...autorEncontrado._doc }
      };
      const livroCriado = await livro.create(livroCompleto);
      res.status(201).json({ message: "criado com sucesso", livro: livroCriado});
    } catch (error){
      next(error);
    }   
  }

  static async atualizarLivro (req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findByIdAndUpdate(id, req.body);
      if(livroEncontrado != null){
        res.status(200).json({ message: "livro atualizado com sucesso"});
      } else {
        next(new NaoEncontrado("Id do Livro não encontrado"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async deletarLivro (req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findByIdAndDelete(id);
      if(livroEncontrado != null){
        res.status(200).json({ message: "livro excluído com sucesso"});
      } else {
        next(new NaoEncontrado("Id do Livro não encontrado"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async listarLivrosPorEditora(req, res, next) {
    const editora = req.query.editora;
    try {
      const livrosPorEditora = await livro.find({ editora: editora});
      res.status(200).json(livrosPorEditora);
    } catch (error) {
      next(error);
    }
  }
}

export default LivroController;