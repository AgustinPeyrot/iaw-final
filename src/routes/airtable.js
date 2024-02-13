const apiKey = process.env.REACT_APP_AIRTABLE_API_KEY;
const baseId = process.env.REACT_APP_AIRTABLE_BASEID;
const tableId = process.env.REACT_APP_AIRTABLE_TABLEID;

export const getTareas = () => {
    return fetch(`https://api.airtable.com/v0/${baseId}/${tableId}?view=Grid%20view`, {
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
        // para trabajar con los datos
        console.log('Records:', data.records);
        return data.records;
    })
    .catch(error => {
        console.error('Problema con la operacion de recuperacion:', error);
        throw error;
    });
}

export const createTarea = (nombre, descripcion, prioridad, fv, duracion, estado) => {
    fetch(`https://api.airtable.com/v0/${baseId}/${tableId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                records: [
                    {
                      fields: {
                        "Nombre": nombre,
                        "Descripcion": descripcion,
                        "Prioridad": prioridad,
                        "Fecha-Vencimiento": fv,
                        "Duracion": duracion,
                        "Estado": estado
                      }
                    }
                  ]
            }
        )
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al crear la tarea');
        }
        return response.json();
      })
      .then(data => {
        data.records.forEach(record => {
          console.log(record.id);
        });
      })
      .catch(error => {
        console.error('Problema con la operacion de recuperacion:', error);
      });
}

export const deleteTarea = (tareaId) => {
    fetch(`https://api.airtable.com/v0/${baseId}/${tableId}/${tareaId}`, {
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