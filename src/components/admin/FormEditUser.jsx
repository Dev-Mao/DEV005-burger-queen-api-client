import { CgClose } from "react-icons/cg";
import { HiOutlineUsers } from 'react-icons/hi';
import {MdKeyboardArrowDown} from 'react-icons/md';
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

const FormEditUser = (props) => {
    // // Llamado a funciones para formularios
    const { register,  formState: { errors }, handleSubmit } = useForm()

    // Obtener token almacenado en localStorage
    const token = localStorage.getItem('token');

    // Manejar el envío del formulario para editar el usuario
    const onSubmit = (data) => {
        
        //Solicitud a la api para editar usuario por id

        fetch(`https://api-mock-bq-99b0fe710281.herokuapp.com/users/${props.selectedUser.id}`,{
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            // Se envía token de autorización
            'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data)
        })
        .then(() => {        
            handleClickClose();
        })
        .catch((err) => {
        console.log(err)
        })
      
    }
    // Cerrar el formulario
    const handleClickClose = () => {
        props.setShowFormEditUser(false)         
    }

    
    return (
        <>
            <section className="section-new-employee">
                <CgClose  data-testid="close-icon" className="icon-close-form-user"  onClick = {handleClickClose}/>
                <h1 className="new-employee-title">Edit employee</h1> 
                <form className="form-new-employee" onSubmit={handleSubmit(onSubmit)}> 
                    <div className="container-input-new-employee">  
                        <HiOutlineUsers className="icon-form"/>
                        <select defaultValue={props.selectedUser.role} {...register('role', { required: 'Role is required' })} className = "select-role">
                            <option value=""  disabled>Role</option>
                            <option value="admin">Admin</option>
                            <option value="waiter">Waiter</option>
                            <option value="chef">Chef</option>
                        </select>
                        <MdKeyboardArrowDown className="arrow-icon"/>
                        {errors.role && <p className="error-message">{errors.role.message}</p>}1
                    </div> 
                    <div className="container-input-new-employee">           
                        <AiOutlineMail className="icon-form" />   
                        <input
                            {...register('email', {
                                required: 'Email required',
                                pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Invalid email'
                                }
                            })}
                            type="text"
                            className="input-new-employee"
                            id="email"
                            placeholder="Email"
                            defaultValue = {props.selectedUser.email}
                            />     
                        {errors.email && <p className="error-message">{errors.email.message}</p>}                  
                    </div>  
            
                    <div className="container-input-new-employee">  
                        <AiOutlineLock className="icon-form" />
                        <input
                            {...register('password', { 
                                required: 'Password required',
                                minLength: {
                                    value: 4,
                                    message: 'Password too short',
                                },
                             })}
                            type="password"
                            className="input-new-employee"
                            id="password"
                            placeholder="Password"
                        />
                        {errors.password && <p className="error-message">{errors.password.message}</p>}                        
                    </div>     

                    <button type="submit" className="submit-btn">Save</button>
                </form>        
            </section>
        </>
    );
  };

export default FormEditUser;

FormEditUser.propTypes = {
    selectedUser: PropTypes.object,
    setShowFormEditUser: PropTypes.func,
  };
