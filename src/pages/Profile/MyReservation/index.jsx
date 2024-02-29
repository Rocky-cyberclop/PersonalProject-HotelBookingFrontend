import { useState } from 'react';
// import style from './MyReservation.module.scss'
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function MyReservation() {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const columns = [
        { field: 'from', headerName: 'From', width: 250, disableColumnMenu: true },
        { field: 'to', headerName: 'To', width: 250, disableColumnMenu: true },
        { field: 'totalDays', headerName: 'Total days', width: 150, disableColumnMenu: true },
        {
            field: 'detail',
            headerName: 'Detail',
            width: 150,
            disableColumnMenu: true,
            renderCell: (params) => (
                <Button variant="contained" color="primary"
                    onClick={() => handleButtonClick(params.row.id)}
                >More details</Button>
            )
        },
    ]
    const [rows, setRows] = useState([])

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/auth/reservation`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.data !== null) {
                    setRows(response.data)
                }
            } catch (error) {
                console.log('Can not get reservation: ', error);
            }
        }
        fetch()
    }, [])

    const handleButtonClick = (id) => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/reservation/${id}`);
                if (response.data === null) {
                    toast.error("Reservation no longer exist please check again!");
                    return;
                }
                navigate('/fillInfo', {
                    state: {
                        reservation: response.data.id,
                        adults: parseInt(response.data.adults)
                    }
                })
            } catch (error) {
                console.error('Error fetching data:', error);
                return;
            }
        };
        fetchData();
    };

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                },
            }}
            pageSizeOptions={[5, 10]}
        />
    )
}

export default MyReservation;