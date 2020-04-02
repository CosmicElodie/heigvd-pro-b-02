/*
     Fonctions helper utilisés par des composantes de Forum
*/

/* Fonction de Parcours d'Arbres Recursif du JSON forums */
/* 
    Permets de retrouver un élément d'une liste contenue dans la structire
    récursive de forums.
    Prends en argument une fonction permettant de trouver la référece
    Retourne : la paire référence parent, index
   Voir : getSubjectByID
   Ex : traverseForums('subjects', forum_subject_id, data, getSubjectByID)
   where = '' -> chercher un forum et non pas un element contenu dans un forum
*/
export const traverseForums = ( where, what, forums, fn ) => {
    for (const [i, entry] of forums.entries()) {
        let index;

        if(where.length > 0){
            index = entry.hasOwnProperty(where) ? fn(entry[where], what) : -1;
        }else{
            index = fn(entry, what, i);
        }
     
        if(index > -1) 
            return { reference: entry, index : index } ;

        if(entry.hasOwnProperty('forums') && entry.forums) {
            let value = traverseForums( where, what, entry.forums, fn );
            if(value){
                if(!value.hasOwnProperty('parent')) value.parent = entry;
                return value;
            } 
        }
    }
}

export const searchForumByID = (forum_section_id, data) => {
    for (const entry of data) {
        if(entry.forum_section_id === forum_section_id) return entry;
        if(entry.hasOwnProperty('forums') && entry.forums) {
            let value = searchForumByID( forum_section_id, entry.forums);
            if(value) return value;
        }        
    }
}

/* Cherche le Subject par rapport à forum_subject_id */

export const getSubjectByID = ( subjects, forum_subject_id ) => {
    let index;
    let found = subjects && subjects.some((item, i) => { index = i; return item.forum_subject_id === forum_subject_id; });
    return found ? index : -1;
}

/* Cherche le Subject par rapport à forum_subject_id */

export const getForumByID = ( forum, forum_section_id, index ) => forum.forum_section_id === forum_section_id ? index : -1;



export const traverseSubjects = (forum, what, where, fn) => {
    if(!forum.subjects) return;
    for (const subject of forum.subjects) {
        if(!subject.posts) continue;
        for (const [i, post] of subject.posts.entries()) {
            let value = fn(post[where], what);
            if(value) return { subject : subject, post : post, index: i };
        }
    }
}

export const getPostByID = ( post_id, forum_post_id) => post_id === forum_post_id;


export const findIndexByName = (what, list) => {
    for (var i = 0; i < list.length; i++){
        if(list[i].name === what) return i;
    }
    return -1;
};

export const findCurrentPathForum = (location, data) => {
    if(!data) return {};
    let path = location.pathname.trim("/").split("/");
    let next = data;
    let forum = null;
    if(path.length > 2){
        for (var i = 2; i < path.length; i++){
            let where = findIndexByName(path[i], next);
            if(where >= 0){
                forum = next[where];
                next = next[where].forums;
            }else{
                return {};
            }
        }
    }
    return forum;
}

/* Subject List */

export const findSubject = (data, subjectIndex, breadcrumbs) => {
    // On cherche le sujet dans la data
    // la fonction renvoi la référence vers l'objet subject
    for (const [i, { name }] of breadcrumbs.entries()) {
        let index;
        data.some((item, i) => { index = i; return item.name === name; });
        if (i === breadcrumbs.length - 1) {
            return data[index].subjects[subjectIndex];
        }
        data = data[index].forums;
    }
}

export const countPosts = (forums) => {
    let nbPosts = 0;
    if(!forums) return 0;
    for (const [i, forum] of forums.entries()) {
        nbPosts = 0;
        if(!forum.subjects) continue;
        for (const [j, { posts }] of forum.subjects.entries()) {
            nbPosts += posts ? posts.length : 0; 
        }
        if(forum.hasOwnProperty('forums') && forum.forums){
            nbPosts += countPosts(forum.forums);
        }
        forum.nbPosts = nbPosts;
    }
    return nbPosts;
}