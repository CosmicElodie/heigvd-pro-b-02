import React, { useContext, useEffect } from 'react';
import { Icon, Box, TextField, Button } from '@material-ui/core';
import Bubble from '../../layout/Bubble';
import Person from '../../layout/Person';
import { useInput } from '../../hooks/input';
import { ForumContext } from '../../context/ForumContext';
import { MainContext } from '../../context/MainContext';
import { traverseForums, getSubjectByID  } from './Utility';

const SubjectView = ( { subject_id, posts, isOpen } ) => {
    
    const { data, setData, setEffectActive } = useContext(ForumContext);
    const { user, setDialog } = useContext(MainContext);
    const { value:message, bind:bindPost } = useInput('');

    useEffect(() => {
        setTimeout(() => {
            document.querySelector('.main').style.height = 'auto';
        }, 300);
    }, [data]);

    const buttonSendPost = (e) => {
        e.preventDefault();
        
        // previent le scroll back to top au moment de render
        document.querySelector('.main').style.height = document.querySelector('.main').offsetHeight  + 'px';
        setEffectActive( { active : false });
        if(message.length === 0){
            setDialog( { insufficient_post_length : {
                is_open: true
            }});
            return;
        }
        let { reference, index } = traverseForums('subjects', subject_id, data, getSubjectByID);
        if(!reference.subjects[index].posts) reference.subjects[index].posts = [];
        reference.subjects[index].posts.unshift({
                "post_id": 99,
                "message": message,
                "created": new Date().toISOString().slice(0, 19).replace('T', ' '),
                "last_update": new Date().toISOString().slice(0, 19).replace('T', ' '),
                "creator" : user
        });
        setData(JSON.parse(JSON.stringify(data)));
        setDialog( { post_posted : {
            is_open: true
        }});
    }
    
    return (
            <section className={ "view-subject-posts " + ( isOpen ? 'open' : '' )}> 
                <section className="posts-list">{
                    posts && posts.length > 0 && posts.map(({creator, created, message}, index) => 
                        <section className={ 'post-item ' + ( index % 2 ? 'right' : 'left' ) }>
                            <section className="bubble-container">
                                <Icon className="post-delete-button" />
                                <Bubble orientation="left" className="post-bubble" text={ message } time={ created } />
                            </section>
                            <Person { ...creator } variant="tiny" />
                        </section>
                    ) 
                }
                </section>
                <section className="post-new">
                    <TextField
                        fullWidth
                        id="filled-required"
                        label="Nouveau Post..."
                        defaultValue=""
                        variant="outlined"
                        { ...bindPost } 
                        />
                        <Box m={1} />
                        <Button
                            variant="contained"
                            color="primary"
                            endIcon={<Icon>send</Icon>}
                            onClick= { buttonSendPost }
                        >
                            Publier
                        </Button>
                </section>       
            </section>
    )
}

export default SubjectView;