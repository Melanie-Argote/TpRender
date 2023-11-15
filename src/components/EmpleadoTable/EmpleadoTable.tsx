import { useEffect, useState } from "react";
import { Empleado } from "../../types/Empleados";
import { EmpleadoService } from "../../services/EmpleadoService";
import Loader from "../Loader/Loader";
import { Button, Table } from "react-bootstrap";
import { ModalType } from "../../types/ModalTtype";
import { EditButton } from "../EditButton/EditButton";
import { DeleteButton } from "../DeleteButton/DeleteButton";
import EmpleadoModal from "../EmpleadoModal/EmpleadoModal";


const EmpleadoTable = () => {

    //Variable que va a contener los datos recibidos por la API
    const [empleados, setEmpleados] = useState<Empleado[]>([]);

    //Variable que muestra el componente Loader hasta que se reciban los datos de la API
    const [isLoading, setIsLoading] = useState(true);

    //Variable que va actualizar los datos de la tabla luego de cada operacion exitosa
    const [refreshData, setRefreshData] = useState(false);



    //Este hook se va a ejecutar cada vez que se renderize el componente
    useEffect(() => {

        //Llamamos a la funcion para obtener todos los productos declarado en el service
        const fetchEmpleados = async () => {
            const empleados = await EmpleadoService.getEmpleados();
            setEmpleados(empleados);
            setIsLoading(false);
        };

        fetchEmpleados();

    }, [refreshData]);

    //Test, este log esta modificado para que muestre los datos de una manera mas legible
    console.log(JSON.stringify(empleados, null, 2));
    //Se inicializa un producto vacio cuando vallamos a crear uno nuevo, para evitar "undefined"
    const initializeNewEmpleado = (): Empleado => {
        return {
            id: 0,
            nombre: "",
            apellido: "",
            telefono: 0,
            email: "",
        };
    };

    //Producto seleccionado que se va a pasar como prop al Modal
    const [empleado, setEmpleado] = useState<Empleado>(initializeNewEmpleado);

    //Manejo de Modal
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [title, setTitle] = useState("");

    //Logica de Modal
    const handleClick = (newTitle: string, prod: Empleado, modal: ModalType) => {
        setTitle(newTitle);
        setModalType(modal)
        setEmpleado(prod);
        setShowModal(true);
    };
    
    return(
        <>
            <Button onClick={() => handleClick("Nuevo Empleado", initializeNewEmpleado(), ModalType.CREATE)}>
                Nuevo Empleado
            </Button>

            {isLoading ? <Loader /> : (
                <Table hover>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Telefono</th>
                            <th>Email</th>
                            <th>Editar</th>
                            <th>Borrar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empleados.map (empleado => (
                            <tr key={empleado.id}>
                                <td>{empleado.nombre}</td>
                                <td>{empleado.apellido}</td>
                                <td>{empleado.telefono}</td>
                                <td>{empleado.email}</td>
                                <td><EditButton onClick={() => handleClick("Editar Empleado", empleado, ModalType.UPDATE)}/></td>
                                <td><DeleteButton onClick={() => handleClick("Borrar Empleado", empleado, ModalType.DELETE)}/></td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            {showModal &&(
                <EmpleadoModal                 
                show={showModal}
                onHide={() => setShowModal(false)}
                title={title}
                modalType={modalType}
                prod={empleado}
                refreshData={setRefreshData}
                />

            )}
        </>
    )
}

export default EmpleadoTable;
