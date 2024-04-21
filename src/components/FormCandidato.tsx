import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Typography, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import axios from 'axios';

interface FormValues {
  usuario: string;
  nombre: string;
  apellido: string;
  fechaNac: string;
  nDoc: number;
  tipoDoc: string;
}

interface FormProps {
  fetchCandidatos: () => void;
}

const FormCandidato: React.FC<FormProps> = ({ fetchCandidatos }) => {
  const [tiposDocumento, setTiposDocumento] = useState<any[]>([]);
  const [formValues, setFormValues] = useState<FormValues>({
    usuario: '',
    nombre: '',
    apellido: '',
    fechaNac: '',
    nDoc: 0,
    tipoDoc: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormValues(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleTipoDocChange = (e: SelectChangeEvent<string>): void => {
    setFormValues(prevState => ({
      ...prevState,
      tipoDoc: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8090/candidatos', formValues);
      
      setFormValues({
        usuario: '',
        nombre: '',
        apellido: '',
        fechaNac: '',
        nDoc: 0,
        tipoDoc: ''
      });
      
      fetchCandidatos();
    } catch (error) {
      console.error('Error al enviar el candidato:', error);
    }
  };

  useEffect(() => {
    const fetchTiposDocumento = async () => {
      try {
        const response = await axios.get('http://localhost:8090/tipos-documento');
        setTiposDocumento(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching tipos de documento:', error);
      }
    };

    fetchTiposDocumento();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Insertar Candidato</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Usuario"
            name="usuario"
            value={formValues.usuario}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Nombre"
            name="nombre"
            value={formValues.nombre}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Apellido"
            name="apellido"
            value={formValues.apellido}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Fecha de Nacimiento"
            type="date"
            name="fechaNac"
            value={formValues.fechaNac}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Número de Documento"
            type="number"
            name="nDoc"
            value={formValues.nDoc}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Select
            fullWidth
            labelId="tipo-doc"
            label="Tipo de Documento"
            name="tipoDoc"
            value={formValues.tipoDoc}
            onChange={handleTipoDocChange}
          >
            {tiposDocumento.map(tipo => (
              <MenuItem key={tipo.idTipoDoc} value={tipo.idTipoDoc}>
                {tipo.descTipoDoc}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default FormCandidato;
