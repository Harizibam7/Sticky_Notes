const containerElement=document.querySelector('.container');
const btnAdd=document.querySelector('.btn');

function getAppStorage(){
    return JSON.parse(localStorage.getItem("hari-app") || "[]");
}

getAppStorage().forEach(element => {
    const textElement=createTextElement(element.id,element.content);
    containerElement.insertBefore(textElement,btnAdd);

});

function createTextElement(id,content){
    const textElement=document.createElement('textarea');
    textElement.classList.add('sticky');
    textElement.value=content;
    textElement.placeholder='Enter Your Notes';
    textElement.addEventListener("change",()=>{
        updateNote(id,textElement.value);
        
});
textElement.addEventListener("dblclick",()=>{
    const check=confirm("Are you Sure to Delete?");
    if(check){
        deleteNotes(id,textElement);
    
    }
});
return textElement;
}

//Add New Sticky Note
function addSticky(){
    const notes=getAppStorage();
    const noteObject={
        id:Math.floor(Math.random()*100000),
        content:""
    }
    const textElement=createTextElement(noteObject.id,noteObject.content);
    containerElement=insertBefore(textElement,btnAdd);
    notes.push(noteObject);
    saveNote(notes);
}
btnAdd.addEventListener('click',()=>addSticky());

function saveNote(notes){
    localStorage.setItem("hari-app",JSON.stringify(notes));
}
//update sticky note
function updateNote(id,content){
    const notes=getAppStorage();
    const updateElement=notes.filter((note)=>note.id==id)[0];
    updateElement.content=content;
    saveNote(notes);
}

function deleteNotes(id,textElement){
    const notes=getAppStorage().filter((note)=>note.id!=id);
    saveNote(notes);
    containerElement.removeChild(textElement);
}

