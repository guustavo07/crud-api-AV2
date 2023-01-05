const URL = 'https://user-api.tarleylana.repl.co/users'

const getHeader = (method) => ({
  method,
  headers: {
    'Content-type': 'application/json',
    Authorization: '12110603'
  }
})

const obterContatos = async () => {
  const response = await fetch(URL, getHeader('GET'))
  if (response.status !== 200)
    return []

  const responseJson = await response.json()
  return responseJson.data
}

const remove = async (id) => {
  const response = await fetch(`${URL}/${id}`, getHeader('DELETE'))

  return response.status === 200
}

const insert = async (nome, formacao, nome2, telefone) => {
  const contato = { nome, formacao, nome2, telefone }
  const header = getHeader('POST')
  header.body = JSON.stringify(contato)

  const response = await fetch(URL, header)

  if (response.status !== 200)
    return null

  const responseJson = await response.json()
  return responseJson.data
}

export {
  obterContatos,
  remove,
  insert
}