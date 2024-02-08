import style from './ChooseRoom.module.scss'
import FirstFloor from './FirstFloor';
import SecondFloor from './SecondFloor';
import ThirdFloor from './ThirdFloor';
import ForthFloor from './ForthFloor'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function ChooseRoom() {

    const [currentFloorIndex, setCurrentFloorIndex] = useState(0)

    const HandleUpFloor = function () {
        if (currentFloorIndex < 3) {
            setCurrentFloorIndex(preIndex => preIndex + 1)
        }
    }

    const HandleDownFloor = function () {
        if (currentFloorIndex > 0) {
            setCurrentFloorIndex(preIndex => preIndex - 1)
        }
    }

    return (
        <div className={style.container}>
            <div className={style.elevator}>
                <div className={style.up} onClick={HandleUpFloor}><FontAwesomeIcon icon={faCaretUp} size='2xl' /></div>
                <div className={style.down} onClick={HandleDownFloor}><FontAwesomeIcon icon={faCaretDown} size='2xl' /></div>
            </div>
            <div className={style.floor}>
                {currentFloorIndex===0&&<FirstFloor/>}
                {currentFloorIndex===1&&<SecondFloor/>}
                {currentFloorIndex===2&&<ThirdFloor/>}
                {currentFloorIndex===3&&<ForthFloor/>}
            </div>
            <div className={style.info}>
                info
            </div>
        </div>

    )
}

export default ChooseRoom;