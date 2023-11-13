import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./signupValidation";
import axios from "axios";


function Signup (){
    
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: ""
    })
    
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }
    
    const handleSubmit = (event) =>{
        event.preventDefault();
        setErrors(Validation(values));
        if(errors.name === "" && errors.email === "" && errors.password === ""){
            axios.post('http://localhost:8082/signup', values)
            .then(res => {navigate('/');
        })
            .catch(err  => console.log(err));
        }
    }

    return(
        <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Registro</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name"> <strong>Nombre:</strong> </label>
                        <input type="text" placeholder="Ingrese tu Nombre" name="name"
                        onChange={handleInput} className="form-control rounded-0"></input>
                    {errors.name && <span className="text-danger">{errors.name}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email"> <strong>Email:</strong> </label>
                        <input type="email" placeholder="Ingrese email Electrónico" name="email" 
                        onChange={handleInput} className="form-control rounded-0"></input>
                        {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Contraseña:</strong></label>
                        <input type="password" placeholder="Ingrese la Contraseña" name="password"
                        onChange={handleInput} className="form-control rounded-0"></input>
                        {errors.password && <span className="text-danger">{errors.password}</span>}
                    </div>
                <button  type='submit' className="btn btn-success w-100 rounded-0">Inscribirse</button>
                <p>Estas de acuerdo con las politicas y privacidad</p>
                <Link to ='/' className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Iniciar Sesión</Link>
                </form>
            </div>
        </div>
        )
}

export default Signup;