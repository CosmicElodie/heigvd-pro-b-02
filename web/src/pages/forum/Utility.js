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
   Ex : traverseForums('subjects', subject_id, data, getSubjectByID)
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

        if(entry.hasOwnProperty('forums')) {
            let value = traverseForums( where, what, entry.forums, fn );
            if(value){
                if(!value.hasOwnProperty('parent')) value.parent = entry;
                return value;
            } 
        }
    }
}

export const searchForumByID = (forum_id, forums) => {
    for (const entry of forums) {
        if(entry.forum_id === forum_id) return entry;
        if(entry.hasOwnProperty('forums')) {
            let value = searchForumByID( forum_id, entry.forums);
            if(value) return value;
        }        
    }
}

/* Cherche le Subject par rapport à subject_id */

export const getSubjectByID = ( subjects, subject_id ) => {
    let index;
    let found = subjects && subjects.some((item, i) => { index = i; return item.subject_id === subject_id; });
    return found ? index : -1;
}

/* Cherche le Subject par rapport à subject_id */

export const getForumByID = ( forum, forum_id, index ) => forum.forum_id === forum_id ? index : -1;

export const findIndexByName = (what, list) => {
    for (var i = 0; i < list.length; i++){
        if(list[i].name === what) return i;
    }
    return -1;
};

export const findCurrentPathForum = (location, data) => {
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