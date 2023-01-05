import React, { useRef, useEffect, useState } from 'react'
import './Create.css';
import * as UserApi from './UserApi';

export default () => {

  const [contatos, setContatos] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const contatos = await UserApi.obterContatos()
    setContatos(contatos)
  }

  const remove = async (id) => {
    await UserApi.remove(id)
    loadData()
  }
  
  const inputFormacao = useRef()
  const inputNome = useRef()
  const inputNome2 = useRef()
  const inputTelefone = useRef()

  const salvar = async () => {

    const formacao = inputFormacao.current.value
    const nome = inputNome.current.value
    const nome2 = inputNome2.current.value
    const telefone = inputTelefone.current.value

    const contato = await UserApi.insert( nome, formacao, nome2, telefone)
    if (contato) {
      alert('Contato cadastrado com sucesso. ID: ' + contato.id)
      await loadData()
    } else
      alert('Nao foi possivel cadastrar o contato')
  }
  return (
    <main>
      <div className='container'>
        <h2>Usuários</h2>
        <div className="caixas">
          <label>Nome:</label>
          <input ref={inputNome} type='text'></input>
        </div>
        <div className="caixas">
          <label>Formação:</label>
          <input ref={inputFormacao} type='text'></input>
        </div>
        <div className="caixas">
          <label>Nome:</label>
          <input ref={inputNome2} type='text'></input>
        </div>
        <div className="caixas">
          <label>Telefone:</label>
          <input ref={inputTelefone} type='text'></input>
        </div>
        <div className='botao'>
          <button onClick={salvar}>Salvar</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Formação</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contatos.map(c =>
            <tr>
              <td>{c.nome}</td>
              <td>{c.formacao}</td>
              <td>{c.nome2}</td>
              <td>{c.telefone}</td>
              <td>
                <button onClick={() => remove(c.id)}
                >Excluir</button>
              </td>
            </tr>
          )
          }

        </tbody>
      </table>


    </main>
  )
}