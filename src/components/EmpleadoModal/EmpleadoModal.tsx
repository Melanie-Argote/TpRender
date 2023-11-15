import { Button, Form, Modal } from "react-bootstrap";
import { ModalType } from "../../types/ModalTtype";
import * as Yup from "yup";
import {useFormik} from "formik";
import { EmpleadoService } from "../../services/EmpleadoService";
//notif al usuario
import { toast } from 'react-toastify';
import { Empleado } from "../../types/Empleados";


type EmpleadoModalProps = {
    show: boolean;
    onHide: () => void;
    title:string
    modalType: ModalType;
    prod: Empleado;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;
};

const EmpleadoModal = ({show, onHide, title, modalType, prod, refreshData}:EmpleadoModalProps) => {
    //CREATE - UPDATE
    const handleSaveUpdate = async (pro: Empleado) => {
        try {
            const isNew = pro.id === 0;
            if (isNew) {
                await EmpleadoService.createEmpleado(pro);
            } else {
                await EmpleadoService.updateEmpleado(pro.id, pro);
            }
            toast.success(isNew ? "Empleado creado" : "Empleado Actualizado", {
                position: "top-center",
            });
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error('A ocurrido un Error');
        }
    };
    //DELETE
    const handleDelete = async () => {
        try {
            await EmpleadoService.deleteEmpleado(prod.id);
            toast.success("Empleado Borrado", {
                position: "top-center",
            });
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
            toast.error('A ocurrido un Error');
        }
    }

    //modificar esto?
    const validationSchema = () => {
        return Yup.object().shape({
        id: Yup.number().integer().min(0),
        nombre: Yup.string().required('El nombre es requerido'),
        apellido: Yup.string().required('El apellido es requerido'),
        telefono: Yup.number().min(0).required('El telefono es requerido'),
        email: Yup.string().required('El email es requerido'),
        });
    };
    const formik = useFormik({
        initialValues: prod,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: Empleado) => handleSaveUpdate(obj),
    });




    return(
        <>
            {modalType === ModalType.DELETE ? (
                <>
                <Modal show={show} onHide={onHide} centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>¿Está seguro que desea eliminar este empleado?<br/> <strong>{prod.nombre}</strong>?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                    Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                    Borrar
                    </Button>
                </Modal.Footer>
            </Modal>

                </>
            ) : (
                <>
                <Modal show={show} onHide={onHide} centered backdrop="static" className="modal-xl">
                    <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {"Formulario"}
                        <Form onSubmit={formik.handleSubmit}>
                                
                                <Form.Group controlId="formNombre">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        name="nombre"
                                        type="text"
                                        value={formik.values.nombre || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.nombre && formik.touched.nombre)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.nombre}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                
                            
                                <Form.Group controlId="formApellido">
                                    <Form.Label>Apellido</Form.Label>
                                    <Form.Control
                                        name="apellido"
                                        type="text"
                                        value={formik.values.apellido || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.apellido && formik.touched.apellido)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.apellido}
                                    </Form.Control.Feedback>
                                </Form.Group>

                            
                                <Form.Group controlId="formTelefono">
                                    <Form.Label>Telefono</Form.Label>
                                    <Form.Control
                                        name="telefono"
                                        type="number"
                                        value={formik.values.telefono || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.telefono && formik.touched.telefono)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.telefono}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        name="email"
                                        type="text"
                                        value={formik.values.email || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.email && formik.touched.email)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            
                            <Modal.Footer className="mt-4">
                                <Button variant="secondary" onClick={onHide}>
                                     Cancelar
                                </Button>

                                <Button variant ="primary" type="submit" disabled={!formik.isValid}>
                                    Guardar
                                </Button>

                            </Modal.Footer>
                        </Form>
                    </Modal.Body>
                </Modal>
                </>
            )}
        </>
    )
}

export default EmpleadoModal;
