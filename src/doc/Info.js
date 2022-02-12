
import React, {useEffect, useState} from "react";
import {Descriptions, Modal} from "antd";
import { Comment, Tooltip, List } from 'antd';
import '../info.css';
import moment from "moment";


const data = [
    {
        actions: [<span key="comment-list-reply-to-0">Reply to</span>],
        author: 'Han Solo',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (
            <p>
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure), to help people create their product prototypes beautifully and
                efficiently.
            </p>
        ),
        datetime: (
            <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment().subtract(1, 'days').fromNow()}</span>
            </Tooltip>
        )
    },
    {
        actions: [<span key="comment-list-reply-to-0">Reply to</span>],
        author: 'Han Solo',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: (
            <p>
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure), to help people create their product prototypes beautifully and
                efficiently.
            </p>
        ),
        datetime: (
            <Tooltip title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment().subtract(2, 'days').fromNow()}</span>
            </Tooltip>
        ),
    },
];

const Info = ({info,isModalVisible,handleOk,handleCancel,commentmovie,movieId}) =>{
    const [datos,setdatos]=useState([]);

    console.log("data",datos);
    console.log("viejos",commentmovie);
    return (
            <Modal title="Información acerca de la Película" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Descriptions bordered>
                    <Descriptions.Item label="title"> {info.Title}</Descriptions.Item>
                    <Descriptions.Item label="Rated">{info.Rated}</Descriptions.Item>
                    <Descriptions.Item label="Released">{info.Released}</Descriptions.Item>
                    <Descriptions.Item label="Runtime">{info.Runtime}0</Descriptions.Item>
                    <Descriptions.Item label="Genre" span={2}>
                        {info.Genre}
                    </Descriptions.Item>
                    <Descriptions.Item label="Writer" span={3}>
                        {info.Writer}
                    </Descriptions.Item>
                    <Descriptions.Item label="Actors">{info.Actors}</Descriptions.Item>
                    <Descriptions.Item label="Country">{info.Country}</Descriptions.Item>
                    <Descriptions.Item label="Language">{info.Language}</Descriptions.Item>
                    <Descriptions.Item label="Plot"  span={3}>
                        {info.Plot}
                    </Descriptions.Item>
                    <Descriptions.Item label="Awards" >{info.Awards}</Descriptions.Item>

                </Descriptions>
                <h1>COMENTARIOS</h1>
                 <List
                    className="comment-list"
                    header={`${commentmovie.length} replies`}
                    itemLayout="horizontal"
                    dataSource={commentmovie}
                    renderItem={item => (
                        <li>
                                <Comment
                                actions={item.actions}
                                author={item.author}
                                avatar={item.avatar}
                                content={item.content}
                                datetime={item.datetime}
                                />

                        </li>

                    )}
                />

            </Modal>
    );
}
export default Info;