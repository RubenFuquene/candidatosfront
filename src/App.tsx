import { useState } from 'react';
import './App.css'
import CandidatosList from './components/CandidatosList'
import FormCandidato from './components/FormCandidato'
import axios from 'axios';
import { Candidato } from './components/types';

function App() {
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);

  const fetchCandidatos = async () => {
    try {
      const response = await axios.get<Candidato[]>('http://localhost:8080/candidatos');
      setCandidatos(response.data);
    } catch (error) {
      console.error('Error fetching candidatos:', error);
    }
  };

  return (
    <div className="App" >
      <header className="App-header">
        <h1>Formulario de Insertar Candidato</h1>
      </header>
      <main>
        <FormCandidato fetchCandidatos={fetchCandidatos} />
        <CandidatosList fetchCandidatos={fetchCandidatos} candidatos={candidatos} />
      </main>
    </div>
  )
}

export default App
