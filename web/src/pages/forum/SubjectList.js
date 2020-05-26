import React, { useContext, useEffect, useRef, useState, Fragment, useMemo, useCallback } from 'react';
import { List, Icon, Typography, Grid, Button } from '@material-ui/core';
import { useInput } from '../../hooks/input';
import Person from '../../layout/Person';
import Moment from 'react-moment';
import SubjectView from './SubjectView';
import SubjectAdd from './SubjectAdd';
import SubjectDelete from './SubjectDelete';
import { ForumContext } from '../../context/ForumContext';
import { MainContext, cleanChars } from '../../context/MainContext';
import AutosizeInput from 'react-input-autosize';
import { getSubjectByID, traverseForums } from './Utility';


const SubjectList = ( ) => {
    const { current: { selected } } = useContext(ForumContext);
    
    const subjectEls = useRef([]);
 
    const [ subjectAddDialogState, setSubjectAddDialogState ] = useState({
        is_open : false
    });

    const [ subjectDeleteDialogState, setSubjectDeleteDialogState ] = useState({
        is_open : false
    });

    useEffect(() => {     
        // prepare le tableau de refs vers les éléments DOM subject
        // les etat open des sujet sont stockés dans le localStorage
        if(selected && selected.subjects ) { 
            subjectEls.current = subjectEls.current.slice(0, selected.subjects.length);
            let openStates = JSON.parse(localStorage.getItem('forum-subjects-open')) || [];
            if(openStates.length > 0){
                for (const index of openStates) {
                    // ajouter la classe open sur un sujet
                    subjectEls.current[index] && subjectEls.current[index].classList.add('open');  
                }
            }
        }
        let listEl = document.querySelector('.subjects'); 
        setTimeout(()=>listEl.classList.add('animated'), 10);
        return () => {
            listEl.classList.remove('animated');
        }
     }, [selected]);
    

    const handleSubjectClick = ( event, index ) => { 
        if(event.target.classList.contains('no-open') || event.target.tagName === 'INPUT') return;
        
        // garder les etat des sujets ouverts de manière persistante
        let set = new Set(
            JSON.parse(
                localStorage.getItem('forum-subjects-open')
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
        
        localStorage.setItem('forum-subjects-open', 
            JSON.stringify(
                Array.from(set)
            )
        );
    }
    
    const handleAddSubjectClick = () => {
        setSubjectAddDialogState({ is_open : true });
    }

    const handleAddSubjectClose = () => {
        setSubjectAddDialogState({ is_open : false });
    }

    const handleDeleteClose = () => {
        setSubjectDeleteDialogState({ is_open : false });
    }

    return (
        <Fragment>
            <List className="subjects">
            { selected && 
            <Grid container alignItems="center" justify="space-between" className="subjects-header"> 
                    <Grid item>
                        <Grid container direction="row" alignItems="center" spacing={1}> 
                            <Icon className="forum-subject" />  
                            <Typography component="h5" className="typo-headline">Liste des Sujets</Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                    <Button size="small" color="primary" onClick={ handleAddSubjectClick }>Nouveau sujet</Button> 
                    </Grid>
            </Grid> }
            { selected && selected.subjects && selected.subjects.length > 0 
            && selected.subjects.map(( subject, index ) =>    
                subject && 
                <section class="list-item-subject" key={ subject.forum_subject_id } ref = { (el) => subjectEls.current[index] = el } >
                    <section className="subject" onClick={ (event) => handleSubjectClick(event, index) } >
                        <section className="list-item-subjects-person"> 
                            <Person user = { subject.creator } collapsed={true} noExtend={true} /> 
                        </section>                                       
                        <SubjectDetails { ...{ index, subject, subjectEls, setSubjectDeleteDialogState } } />
                    </section>
                    <SubjectView { ...subject } />
                </section>
                )
            }
            </List>                
            <SubjectDelete { ...{...subjectDeleteDialogState, ...{ handleClose : handleDeleteClose }} }  />
            <SubjectAdd { ...{...subjectAddDialogState, ...{ handleClose : handleAddSubjectClose }} } />
        </Fragment>
    )           
}

const SubjectDetails = ( { // Component local non-exporté
        index,
        subject,
        subjectEls,
        setSubjectDeleteDialogState
    } ) => {

    const { data, setData, current } = useContext(ForumContext);
    const { user, setDialog } = useContext(MainContext);
    
    const { value, setValue, bind:bindSubject } = useInput();

    const handleSubjectEditOkClick = useCallback(( idx, forum_subject_id ) => {
        fetch('http://localhost:8080/forum/update_subject', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: "&name=" + cleanChars(value) + "&forum_subject_id=" + forum_subject_id 
        })
        .then(response => response.json())
        .then(({ status, dialog_id }) => {
            if(status === 'ok'){
                let { reference, index } = traverseForums('subjects', forum_subject_id, data, getSubjectByID);
                reference.subjects[index].name = value;
                setData(JSON.parse(JSON.stringify(data)));
                subjectEls.current[idx].classList.remove('edit-subject');
            }
            setDialog( { [dialog_id] : {
                is_open: true
            }});
        });   
    }, [setData, setDialog, data, subjectEls, value ]);

    const handleEditSubjectClick = useCallback(( name, index ) => {
        subjectEls.current[index].classList.add('edit-subject');
        setValue(name); 
        // on ne peut stocker la valeur par default dans l'état
        // car l'input s'auto resize par rapport a la taille du contenu
        // et il est impossible de lire la taille d'un élément invisible.
        // Pour que AutosizeInput puisse lire la taille du contenu
        // il doit être rendu visible add('edit-subject') et ensuite
        // son état peut être chargé setValue(name)
    }, [setValue, subjectEls]);

    const handleSubjectEditCancelClick = useCallback(( index ) => {
        subjectEls.current[index].classList.remove('edit-subject');
    }, [subjectEls]);
    
    const handleDeleteSubjectClick = useCallback(( forum_subject_id ) => {
        setSubjectDeleteDialogState({ is_open : true, forum_subject_id : forum_subject_id });
    }, [setSubjectDeleteDialogState]);
    
    return useMemo(() => 
        <section className={ "subject-details " + ( subject.resolved ? 'resolved' : '' ) }
            style={ styles.subjectDetails } 
            >
            <Grid container alignItems="center" justify="space-between" >
                <Grid item>
                    <Grid container direction="row" spacing={1}> 
                        { subject.resolved !== 0 && <Grid item> 
                            <Icon className="subject-resolved" />
                        </Grid> }
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
                                    <Typography className="display-name typo-body-3"  noWrap> { subject.name } </Typography>
                                    <section className="edit-subject-inline-input"> <AutosizeInput { ...bindSubject } /></section>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <section className="subject-toolbar">
                            { ( subject.creator.user_id === user.user_id || user.access_level >= 75 ) && 
                                <Icon className="no-open subject-edit-button" 
                                    onClick={ () => handleEditSubjectClick(subject.name, index) } /> }
                             { ( subject.creator.user_id === user.user_id || ( user.access_level >= 25 && current.selected.house_id !== null ) || user.access_level >= 75) &&    
                                <Icon className="no-open subject-delete-button" 
                                    onClick={ () => handleDeleteSubjectClick(subject.forum_subject_id) } />  
                             }
                             </section>
                            
                            <section className="edit-subject-buttons">
                                <Icon className="no-open subject-edit-ok-button" 
                                    onClick={ () => handleSubjectEditOkClick( index, subject.forum_subject_id ) } />
                                <Icon className="no-open subject-edit-cancel-button"  
                                    onClick={ () => handleSubjectEditCancelClick( index ) }  />  
                            </section>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Icon className="posts-toggle-show" />
                </Grid>
            </Grid>
        </section>, [current, index, user, subject, bindSubject, handleEditSubjectClick, handleDeleteSubjectClick, handleSubjectEditOkClick, handleSubjectEditCancelClick]
    )
}

const styles = {
    List: {
        position:'relative',
	    padding: '50px'
    }
}

export default SubjectList;