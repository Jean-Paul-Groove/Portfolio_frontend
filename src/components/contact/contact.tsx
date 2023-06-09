import "./contact.css"
import { useState } from "react"

function Contact(){
    const [formData, setFormData]=useState({nom:'',email:'',message:''})
    function changeForm(e:React.FormEvent<HTMLInputElement|HTMLTextAreaElement>):void{
        if (e.currentTarget.name){ 
            const prevForm = {...formData}
            setFormData({...prevForm, [e.currentTarget.name]: e.currentTarget.value} )
            }
            
    }

    function handleSubmit(e:React.FormEvent){
e.preventDefault()
    }
    return <form id="contact" className="form" onSubmit={handleSubmit}>
        <h2>Me contacter</h2>
        <label htmlFor="nom" className="form__label"> Nom: 
        <input type="text" value={formData.nom} name="nom" onInput={changeForm} placeholder="Votre nom..." required className="form__input"/>
        </label>
        <label htmlFor="email" className="form__label"> E-mail: 
        <input type="email" value={formData.email} name="email" onInput={changeForm} placeholder="Votre email..." className="form__input"required/>
        </label>
        <label htmlFor="message" className="form__label"> Votre message: 
        <textarea value={formData.message} name="message" onInput={changeForm} placeholder="Votre message..." maxLength={500} className="form__input" required/>
        <div className="form__input__count">{formData.message.length +" /500"}</div>
        </label>
        
        <button type="submit" className="form__button">Envoyer</button>
    </form>
}

export default Contact