import React, { useState } from 'react'
import style from './Main.module.scss';
import { Checkbox, FormControlLabel } from '@mui/material';

const SuggestPage = () => {
    const [filter, setFilter] = useState([])
    const roomType = [
        { title: 'Classic room', value: '0' },
        { title: 'Couple room', value: '1' },
        { title: 'Extra large room', value: '2' },
    ]
    const utilities = [
        { title: 'Television', value: '3' },
        { title: 'Free wifi', value: '4' },
        { title: 'Fridge', value: '5' },
        { title: 'A bathtub', value: '6' },
        { title: 'Single bed beside double bed', value: '7' },
    ]
    const capacities = [
        { title: 'One person', value: '8' },
        { title: 'Two person', value: '9' },
        { title: 'Three person', value: '10' },
    ]
    const HandleChosseFilter = (e) => {
        const existed = filter.indexOf(e.target.value)
        if (existed === -1) {
            setFilter(pre => [...pre, e.target.value])
        }
        else {
            setFilter(pre => pre.filter(item => item !== e.target.value))
        }
        console.log(filter)
    }
    return (
        <div className={style.why}>
            <div className={style.suggestPage}>
                <div className={style.totalValue}>
                    <div className={style.advertisement}>
                        <div className={style.filterHeader}>
                            Filter by:
                        </div>
                        <div className={style.filterType}>
                            <div className={`${style.textBold}`}>
                                Room type:
                            </div>
                            {roomType.map(item => (
                                <div>
                                    <FormControlLabel control={<Checkbox value={item.value} onChange={HandleChosseFilter} />} label={item.title} />
                                </div>
                            ))}
                        </div>
                        <div className={style.filterType}>
                            <div className={`${style.textBold}`}>
                                Utilities:
                            </div>
                            {utilities.map(item => (
                                <div>
                                    <FormControlLabel control={<Checkbox value={item.value} onChange={HandleChosseFilter} />} label={item.title} />
                                </div>
                            ))}
                        </div>
                        <div className={style.filterType}>
                            <div className={`${style.textBold}`}>
                                Capacity:
                            </div>
                            {capacities.map(item => (
                                <div>
                                    <FormControlLabel control={<Checkbox value={item.value} onChange={HandleChosseFilter} />} label={item.title} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={style.totalValue}>recommendation</div>
            </div>
        </div>
    )
}

export default SuggestPage