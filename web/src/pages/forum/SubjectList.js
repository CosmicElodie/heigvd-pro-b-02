import React, { useContext, useEffect, useRef, useState, Fragment } from 'react';
import { List, Icon, Typography, Grid, Button } from '@material-ui/core';
import { Spring } from 'react-spring/renderprops';
import Person from '../../layout/Person';
import Moment from 'react-moment';
import SubjectView from './SubjectView';
import SubjectAdd from './SubjectAdd';
import SubjectDelete from './SubjectDelete';
import { ForumContext } from '../../context/ForumContext';


const SubjectList = ( ) => {
    const { current, subjectListEffect, effectActive } = useContext(ForumContext);
    const { selected } = current;
    
    const subjectEls = useRef([]);

    const [ subjectAddModalState, setSubjectAddModalState ] = useState({
        is_open : false
    });

    const [ subjectDeleteModalState, setSubjectDeleteModalState ] = useState({
        is_open : false
    });

    useEffect(() => {     
        // prepare le tableau de refs vers les éléments DOM subject
        // les etat open des sujet sont stockés dans le localStorage
        if(selected && selected.subjects ) { 
            subjectEls.current = subjectEls.current.slice(0, selected.subjects.length);
            let openStates = JSON.parse(localStorage.getItem('forum-subjects-open-' + selected.forum_id)) || [];
            if(openStates.length > 0){
                for (const index of openStates) {
                    // ajouter la classe open sur un sujet
                    subjectEls.current[index] && subjectEls.current[index].classList.add('open');  
                }
            }
        }
        
     }, [selected]);
    

    const handleSubjectClick = ( event, index ) => { 
        if(event.target.classList.contains('subject-edit-button') || event.target.classList.contains('subject-delete-button')) return;
        
        // garder les etat des sujets ouverts de manière persistante
        let set = new Set(
            JSON.parse(
                localStorage.getItem('forum-subjects-open-' + selected.forum_id)
            )
        );
        
        // Ajouter / enlever la classe open sur l'élément subject dans DOM
        if(subjectEls.current[index].classList.contains('open')){
            subjectEls.current[index].classList.remove('open');
            set.delete(index);
        } else {
            subjectEls.current[index].classList.add('open');
            set.add(index);
        }
        
        localStorage.setItem('forum-subjects-open-' + selected.forum_id, 
            JSON.stringify(
                Array.from(set)
            )
        );
        
    }
    
    const handleAddSubjectClick = () => {
        setSubjectAddModalState({ is_open : true });
    }

    const handleAddSubjectClose = () => {
        setSubjectAddModalState({ is_open : false });
    }

     
    const handleDeleteSubjectClick = ( subject_id ) => {
        setSubjectDeleteModalState({ is_open : true, subject_id : subject_id });
    }
    
    const handleDeleteClose = () => {
        setSubjectDeleteModalState({ is_open : false });
    }


    return (
        <Fragment>
        <Spring
            from={ effectActive.active ? subjectListEffect.from : subjectListEffect.to }
            to={ subjectListEffect.to }>
                { ({opacity, top}) => 
                    <List style={ {
                                'opacity' : opacity,
                                'top' : top
                            }} >
                            { selected && selected.subjects && 
                                <Grid container alignItems="center" justify="space-between" className="subjects-header"> 
                                        <Grid item>
                                            <Grid container direction="row" spacing={1}> 
                                                <Icon className="forum-subject" />  
                                                <Typography component="h5" className="typo-headline">Liste des Sujets</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="outlined" color="primary" onClick={ handleAddSubjectClick }>Ajouter</Button>
                                        </Grid>
                                </Grid> }
                                { selected && selected.subjects && selected.subjects.length > 0 
                                && selected.subjects.map(( subject, index ) =>    
                    
                                    subject && <section class="list-item-subject" key={ subject.subject_id }  ref = { (el) => subjectEls.current[index] = el } >
                                        <section className="subject">
                                            <section className="list-item-subjects-person"> 
                                                <Person { ...subject.creator } collapsed={true} noExtend={true} /> 
                                            </section>                                       
                                            <section className="subject-details" 
                                                style={ styles.subjectDetails } 
                                                onClick={ (event) => handleSubjectClick(event, index) } 
                                               >
                                                <Grid container alignItems="center" justify="space-between" >
                                                    <Grid item>
                                                        <Grid container direction="row" spacing={1}> 
                                                            <Grid item>
                                                                <Grid container justify="space-around" direction="column" >
                                                                    <Grid container direction="row" spacing={1}> 
                                                                        <Grid item>
                                                                            <Typography className="typo-headline-4" noWrap> { subject.creator.firstname + ' ' + subject.creator.lastname } </Typography> 
                                                                        </Grid>
                                                                        <Grid item>
                                                                            <Typography className="typo-body-4"  noWrap><Moment fromNow>{ subject.created }</Moment></Typography>
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <Typography className="typo-body-3"  noWrap> { subject.name } </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item>
                                                                <section className="subject-toolbar">
                                                                    <Icon className="subject-edit-button" />
                                                                    <Icon className="subject-delete-button" onClick={ () => handleDeleteSubjectClick(subject.subject_id) } />  
                                                                </section>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    
                                                    <Grid item>
                                                        <Icon className="posts-toggle-show" />
                                                    </Grid>
                                                </Grid>
                                            </section>
                                        </section>
                                        <SubjectView { ...subject } />
                                    </section>
                                    )
                                }
                    </List>  
                }
                
        </Spring>
        <SubjectDelete { ...{...subjectDeleteModalState, ...{ handleClose : handleDeleteClose }} }  />
        <SubjectAdd { ...{...subjectAddModalState, ...{ handleClose : handleAddSubjectClose }} } />
        </Fragment>
        
    )           
}


const styles = {
    List: {
        position:'relative',
	    padding: '50px'
    },
    subjectDetails : {
        padding:'10px',
        background: '#f4f4f4f0',
        border: '1px solid #e8e8e8f0'
    }
}


export default SubjectList;