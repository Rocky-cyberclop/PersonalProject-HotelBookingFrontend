import style from './Forget.module.scss'
import FillEmailForm from './FillEmailFrom';
import FillCodeForm from './FillCodeForm';
import { useState } from 'react';

function Forget() {

    const [form, setForm] = useState(0)
    const [email, setEmail] = useState('')

    const handleChangeForm = () => {
        setForm(1)
    }

    return (
        <div className={style.container}>
            {form === 0 && <FillEmailForm handleChangeForm={handleChangeForm} setEmailFromFillEmail={setEmail}/>}
            {form === 1 && <FillCodeForm email={email}/>}
        </div>
    )
}

export default Forget;