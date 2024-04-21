import React, { useEffect } from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { Candidato } from './types';

interface CandidatosListProps {
  fetchCandidatos: () => void;
  candidatos: Candidato[];
}

const CandidatosList: React.FC<CandidatosListProps> = ({ fetchCandidatos, candidatos }) => {

  useEffect(() => {
    fetchCandidatos();
  }, []);

  return (
    <div>
      <Typography variant="h5">Lista de Candidatos</Typography>
      <List>
        {candidatos.map((candidato, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`${candidato.nombre} ${candidato.apellido}`}
              secondary={`Usuario: ${candidato.usuario}, ${candidato.tipoDoc}: ${candidato.nDoc}, Fecha de nacimiento: ${candidato.fechaNac}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default CandidatosList;
