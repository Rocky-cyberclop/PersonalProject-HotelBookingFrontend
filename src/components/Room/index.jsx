import style from './Room.module.scss'
// import Single from '../../assets/images/rooms/single.png'
// import Double from '../../assets/images/rooms/double.png'
// import DoubleLarge from '../../assets/images/rooms/double-large.png'
import ConferenceRoomImage from '../../assets/images/reference-room.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

function Room(props) {
    if (!props.data) return (<div className={`${style.container}`}></div>)

    const data = props.data;

    const HandleClick = function () {
        if (props.setRooms) {
            props.toggleRoomInfo(data, props.setRooms);
        } else props.toggleRoomInfo(data);
    }

    return (
        <div className={`${style.container} 
            ${data &&
            ((data.booked === 1 && style.booked) ||
                (data.booked === -1 && style.pending) ||
                (props.bookingRooms?.includes(data.number) && style.booking))}`}
            onClick={HandleClick}>
                {data.number}
            {Array.from({ length: data.capacity }, (_, i) => (
                <FontAwesomeIcon key={i} icon={faUser} className={style.icon} />
            ))}
            {/* {data && (
                <img height={100} src={
                    (data.capacity === 1 && Single) ||
                    (data.capacity === 2 && Double) ||
                    (data.capacity === 3 && DoubleLarge)
                } alt="" />
            )
            } */}
        </div>
    )
}

function ConferenceRoom(props) {
    if (!props.data) return (<div className={`${style.container}`}></div>)

    const data = props.data;

    const HandleClick = function () {
        if (props.setRooms) {
            props.toggleRoomInfo(data, props.setRooms);
        } else props.toggleRoomInfo(data);
    }


    return (
        <div className={`${style.container} ${data && data.booked && style.booked}`}
            onClick={HandleClick}>
            {data &&
                ((data.capacity === 1 && "Small reference room") ||
                    (data.capacity === 2 && "Large reference room"))
            }
            <img height={100} src={ConferenceRoomImage} alt="" />
        </div>
    )
}

export { Room, ConferenceRoom };