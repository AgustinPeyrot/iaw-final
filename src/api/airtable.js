const apiKey = process.env.REACT_APP_AIRTABLE_API_KEY;
const baseId = process.env.REACT_APP_AIRTABLE_BASEID;
const tableId = process.env.REACT_APP_AIRTABLE_TABLEID;
const url = 'https://api.airtable.com/v0';

export const getTareas = () => {
    return fetch(`${url}/${baseId}/${tableId}?view=Grid%20view`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al obterner las tareas');
        }
        return response.json();
    })
    .then(data => {
        console.log('Records:', data.records);
        return data.records;
    })
    .catch(error => {
        console.error('Problema con la operacion de recuperacion:', error);
        throw error;
    });
}

export const createTarea = (nombre, descripcion, prioridad, fv, duracion, estado) => {
    return new Promise((resolve, reject) => {
      fetch(`${url}/${baseId}/${tableId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          records: [{
            fields: {
              "Nombre": nombre,
              "Descripcion": descripcion,
              "Prioridad": prioridad,
              "Fecha-Vencimiento": fv,
              "Duracion": duracion,
              "Estado": estado
            }
          }]
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al crear la tarea');
        }
        return response.json();
      })
      .then(data => {
        const idTarea = data.records[0].id;
        resolve(idTarea);
      })
      .catch(error => {
        console.error('Problema con la operacion de recuperacion:', error);
        reject(error);
      });
    });
  }
  

export const deleteTarea = (tareaId) => {
    fetch(`${url}/${baseId}/${tableId}/${tareaId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al eliminar la tarea');
        }
        console.log('Tarea eliminada con éxito');
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
}

export const getTarea = (tareaId) => {
  return fetch(`${url}/${baseId}/${tableId}/${tareaId}`, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${apiKey}`
      }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Error al obtener la tarea');
      }
      return response.json();
  })
  .catch(error => {
      console.error('Error:', error.message);
      throw error;
  });
}

export const updateEstadoTarea = (tareaId, Estado) => {
  return fetch(`${url}/${baseId}/${tableId}/${tareaId}`, {
      method: 'PATCH',
      headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          fields: {
              "Estado": Estado
          }
      })
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Error al actualizar el estado de la tarea');
      }
      console.log('Estado de la tarea actualizado con éxito');
  })
  .catch(error => {
      console.error('Error:', error.message);
      throw error;
  });
}

export const updateDuracionTarea = (tareaId, Duracion) => {
  return fetch(`${url}/${baseId}/${tableId}/${tareaId}`, {
      method: 'PATCH',
      headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          fields: {
              "Duracion": Duracion
          }
      })
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Error al actualizar la duración de la tarea');
      }
      console.log('Duración de la tarea actualizada con éxito');
  })
  .catch(error => {
      console.error('Error:', error.message);
      throw error;
  });
}
