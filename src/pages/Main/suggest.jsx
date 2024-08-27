import React from 'react'
import style from './Main.module.scss';

const SuggestPage = () => {
    return (
        <div className={style.why}>
            <div className={style.suggestPage}>
                <div className={style.totalValue}>
                    <div className={style.advertisement}>Filter</div>
                </div>
                <div className={style.totalValue}>recommendation</div>
            </div>
        </div>
    )
}

export default SuggestPage