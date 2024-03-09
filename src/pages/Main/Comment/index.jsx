import style from './Comment.module.scss'
import { Button, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

var colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];

function Comment() {

    const [comments, setComments] = useState([])
    const [page, setPage] = useState(2)
    const [content, setContent] = useState('')
    const token = localStorage.getItem('token')

    useEffect(() => {
        const fetchComment = async () => {
            try {
                var response = await axios.get('http://localhost:8080/api/auth/comments/1');
                setComments(response.data.map(item => {
                    return {
                        ...item,
                        color: getAvatarColor()
                    };
                }))
            } catch (error) {
                console.error('Error fetching data:', error);
                return;
            }
        };
        fetchComment()
    }, [])

    const loadMoreComments = () => {
        const fetchComment = async () => {
            try {
                var response = await axios.get(`http://localhost:8080/api/auth/comments/${page}`);
                setComments([...comments, ...response.data])
            } catch (error) {
                console.error('Error fetching data:', error);
                return;
            }
        };
        fetchComment()
        setPage(page + 1)
    }

    const handleInputChange = (e) => {
        setContent(e.target.value)
    }

    const getAvatarColor = () => {
        console.log('I got forced functioning!')
        return colors[Math.floor(Math.random() * colors.length)];
    }

    const handleSubmitComment = () => {
        if (!token) {
            toast.info('You had to login to write a comment!')
            return
        }
        if (content.trim() === '') {
            toast.info('Your content is empty!')
            return
        }
        const postComment = async () => {
            try {
                var response = await axios.post(`http://localhost:8080/api/auth/postComments`, { content },
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                if (response.data !== null) {
                    toast.success("Thanks for your review!")
                    setContent('')
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                return;
            }
        };
        postComment()

    }

    return (
        <div className={style.comment}>
            <div className={style.header}>Want to know what people say about us?</div>
            <div className={style.body}>
                <div className={style.comments}>
                    {comments &&
                        comments.map(((comment, index) => (
                            <div className={style.item} key={index}>
                                <div className={style.avatar} style={{ backgroundColor: comment.color }}>{
                                    comment?.name?.split(' ').slice(-2).join(' ')[0]
                                }</div>
                                <div>
                                    <div className={style.name}>{
                                        comment?.name?.split(' ').slice(-2).join(' ')
                                    }</div>
                                    <div className={style.content}>
                                        {
                                            comment?.content
                                        }
                                    </div>
                                </div>
                            </div>

                        )))
                    }

                    <div className={style.loadMore}>
                        <Button className={style.loadMoreBtn} onClick={loadMoreComments}>Load more comment</Button>
                    </div>
                </div>
                <div className={style.writeComment}>
                    <TextField
                        fullWidth
                        id="outlined-multiline-static"
                        label="Leave your comment here"
                        multiline
                        rows={4}
                        value={content}
                        onChange={handleInputChange}
                    />
                    <Button className={style.writeCommentBtn} onClick={handleSubmitComment}>
                        Post
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Comment;