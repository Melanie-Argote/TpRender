import { Empleado } from '../types/Empleados';

const BASE_URL = 'http://localhost:8080/api/v1'; 

export const EmpleadoService = {
	//Aquí adentro vamos a declarar los métodos
    getEmpleados: async (): Promise<Empleado[]> => {
        const response = await fetch(`${BASE_URL}/empleado/getAll`);
        const data = await response.json();
        return data;
    },
    getEmpleado: async (id: number): Promise<Empleado> => {
        const response = await fetch(`${BASE_URL}/empleado/${id}`);
            const data = await response.json();
            return data;
    },
    createEmpleado: async (empleado: Empleado): Promise<Empleado> => {
        const response = await fetch(`${BASE_URL}/empleado`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(empleado)
        });
        const data = await response.json();
        return data;
    },

    updateEmpleado: async (id: number, empleado: Empleado): Promise<Empleado> => {
        const response = await fetch(`${BASE_URL}/empleado/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(empleado)
        });
        const data = await response.json();
        return data;
    },
    deleteEmpleado: async (id: number): Promise<void> => {
        await fetch(`${BASE_URL}/empleado/${id}`, {
            method: "DELETE"
        });
    }

        
        

};

