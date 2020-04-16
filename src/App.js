import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);


  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Repositório ${Date.now()}`,
      url: "localhost:3000",
      techs: ["React", "Node.js"],
    });

    const repository = response.data;

    setRepositories([ ...repositories, repository ]);
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);
    } catch (error) {
      console.error(error);
      alert('Erro ao deletar repositório.');
    }

    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
                                      <li key={repository.id}>
                                        <span>{repository.title}</span>
                                        <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
                                      </li>
                                  ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;