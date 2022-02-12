import React, {useEffect, useState} from "react";
import {db} from '../firebase';
import { Tooltip } from 'antd';
import moment from 'moment';
import { Alert } from 'antd';
import '../App.css';
import '../Moviies.css';
import {Avatar, Card, Comment, Modal} from "antd";
import { Input } from 'antd';
import { Button} from 'antd';
import { SearchOutlined, CommentOutlined,LoadingOutlined} from '@ant-design/icons';
import {InfoCircleOutlined} from '@ant-design/icons';
import Info from "./Info.js";
import {Form, List } from 'antd';
const { TextArea } = Input;


const Movies= () =>{

    const [movies,setMovies]=useState(null);
    const [petition, setPetition]=useState("action")
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [movieId,setMovieid] = useState(null);
    const [info,setInfo]=useState(null);
    const [comment,setComment]=useState([])
    const [commentmovie,setCommentmovie]=useState([])
    const [isModalcommentVisible, setIsModalcommentVisible] = useState(false);
    const [isAlert,setAlert]=useState(false);
    const { Meta } = Card;
    const { Search } = Input;
    const Editor = ({ onSubmit }) => (
        <>
            <Form.Item>
                <TextArea onClick={setnovisibleAlert} id="commentText" rows={4}  />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit"  onClick={onSubmit} type="primary">
                    Add Comment
                </Button>
            </Form.Item>
        </>
    );
    //useefect para buscar las peliculas con la Api de peliculas
    useEffect(
        ()=>{
            const url="https://www.omdbapi.com/?s="+petition+"&apikey=857aef11";
            console.log("url",url)
            fetch(url).then(
                (response)=>{
                    return response.json();
                }
            ).then(
                (data)=>{
                    console.log("dta",data);
                    console.log("dta",data.Response);
                    if(data.Response==="True"){
                        setMovies(data);
                        console.log("dta si");
                    }
                    else{
                        setMovies(0);
                        console.log("dta no");
                    }
                   
                }
            )
        },[petition]
    )
    //usseefect para mostrar la info las peliculas con la Api de peliculas
    useEffect(()=>{
        const url="https://www.omdbapi.com/?i="+movieId+"&apikey=857aef11";
        console.log("url",url)
        fetch(url).then(
            (response)=>{
                return response.json();
            }
        ).then(
            (data)=>{
                console.log("dta",data);
                setInfo(data);
            }
        )



    },[movieId])
//modales para indicar la información de las peliculas
    const setnovisibleAlert =()=>{
        setAlert(false);
    }

    const showModal = (ide) => {
        setIsModalVisible(true);
        setMovieid(ide);

        const commentnew = comment.filter((item,index)=> item.idemovie===ide )
        setCommentmovie(commentnew);

    };
    
    const showModalComment=(ide)=>{
        setIsModalcommentVisible(true);
        setMovieid(ide);
    }
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleOkcomment = () => {
        setIsModalcommentVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const handleCancelcomment = () => {
        setIsModalcommentVisible(false);
    };
    //funcion que le permite agregar un comentario de las peliculas
    const onSubmit = (ideMov)=> {
        const wordtext = document.querySelector("#commentText").value;
        const commentNew = {
            actions: [<span key="comment-list-reply-to-0">Reply to</span>],
            author: 'Anonimo',
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content: (
                <p>
                    {wordtext}
                </p>
            ),
            datetime: (
                <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().subtract(1, 'days').fromNow()}</span>
                </Tooltip>
            ),
            idemovie:" "
        }
        commentNew.idemovie=ideMov;
            setComment(() => [...comment, commentNew]);
        document.querySelector("#commentText").value=" ";
        setAlert(true);

    }

    //funcion buscar peliculas 
    const searhMovies=()=>{
        const word = document.querySelector("#requestBa").value;

        setPetition(word);

    }

    return (
        <>
            <div className="countersearh">
                <table>
                    <tbody>
                    <tr>
                        <td>
                            <Input id={"requestBa"} placeholder="Buscar por género, nombre" />
                        </td>
                        <td>
                            <Button onClick={searhMovies} type="primary" icon={<SearchOutlined />}>
                                Search
                            </Button>
                        </td>
                    </tr>

                    </tbody>
                </table>
            </div>
            {
                movies !=null? (movies==0 ? <div className="Not-found"> No hay resultados de la busqueda, Intente con otra Película</div> :<div className="containerMovies">
                {
                    movies.Search.map((item,index)=>{
                        return (
                            <Card  key={index}
                                   style={{ width: 300 }}
                                   cover={
                                       <img className="imgMovies"
                                            alt="example"
                                            src={item.Poster}
                                       />
                                   }
                                   actions={[
                                       <Button onClick={()=>showModalComment(item.imdbID)} type="primary" icon={<CommentOutlined  style={{ fontsize:"10px"}} />}>
                                       </Button>,
                                       <Button onClick={()=>showModal(item.imdbID)} type="primary" icon={<InfoCircleOutlined style={{fontsize:"10px"}} />}>
                                       </Button>
                                   ]}
                            >
                                <Meta
                                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                    title={item.Title}
                                    //description='Año:  {item.Year}'
                                    description={item.Year}
                                />
                            </Card>);
                    })
                }
                {/*poner el info el modal coment dentro de delcomponente de movie */}
                {info ? <Info info={info}
                              isModalVisible={isModalVisible}
                              handleOk={handleOk}
                              handleCancel={handleCancel}
                              commentmovie={commentmovie}
                              movieId={movieId}

                />: <div className="containerLoading">
                    <LoadingOutlined style={{fontSize:"100px",color:"red"}}/>
                </div>
                }
                <Modal title="Comentario acerca de la Película" visible={isModalcommentVisible} onOk={handleOkcomment} onCancel={handleCancelcomment} >
                    <Comment
                        avatar={
                            <Avatar
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                alt="Han Solo"
                            />

                        }
                        content={
                            <Editor
                                onSubmit={()=>onSubmit(movieId)}
                            />
                        }


                    />
                    {isAlert ? <Alert message="Mensaje Enviado" type="success" />:<div></div>}
                </Modal>

            </div>): <div className="containerLoading">
                <LoadingOutlined style={{fontSize:"100px",color:"red"}}/>
            </div>
            }
        </>
    );
}
export default Movies;

//<Search id="request" placeholder="input search text" enterButton="Search" size="large" loading />
//<Alert message="Success Text" type="success" />