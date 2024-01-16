import style from './Main.module.scss';
import { Calendar } from 'react-check-in-out-calendar';

function Main(){

    return(
        <div className={style.mainBackground}>
            <div className={style.calendar}>
                <Calendar
                    mainColor="#ff6347"
                    subMainColor="#ffa07a"
                    startDay={0}
                    numMonths={2}
                    language="en"
                    maximumMonths={12}
                    defaultCheckIn="2023-06-01"
                    defaultCheckOut="2023-06-15"
                    isRectangular={false}
                    onCheckInOutChange={(checkInDate, checkOutDate) => {
                    console.log("Check-in: ", checkInDate, " Check-out: ", checkOutDate);
                    }}
                
                />
            </div>
            
        </div>
    );
}

export default Main;