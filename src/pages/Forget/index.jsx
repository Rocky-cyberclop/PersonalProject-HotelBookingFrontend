import style from './Forget.module.scss'
import FillEmailForm from './FillEmailFrom';
import FillCodeForm from './FillCodeForm';
import FillPassword from './FillPassword';
import { useState } from 'react';

function Forget() {

    const [form, setForm] = useState(0)
    const [email, setEmail] = useState('')

    const handleChangeFormCode = () => {
        setForm(1)
    }

    const handleChangeFormPass = () => {
        setForm(2)
    }

    return (
        <div className={style.container}>
            {form === 0 && <FillEmailForm handleChangeForm={handleChangeFormCode} setEmailFromFillEmail={setEmail}/>}
            {form === 1 && <FillCodeForm email={email} handleChangeFormPass={handleChangeFormPass}/>}
            {form === 2 && <FillPassword email={email}/>}
        </div>
    )
}

export default Forget;