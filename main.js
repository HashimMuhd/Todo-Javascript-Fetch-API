let postList=document.querySelector('#notes');
let addPostForm=document.querySelector('.add-post-form');
let idValue=document.getElementById('user_id');
let titleValue=document.getElementById('text');
let bodyValue=document.getElementById('desc');
let output="";

let renderPosts=(posts)=>{
    posts.forEach(post=>{
        output +=`
        <div id="note" data-id=${post.id}>
        <h5>User Id : ${post.userId}</h5>
        
       <h4>Title : ${post.title}</h4>
       <h3>Note : ${post.completed}</h3>
         <button class="del" id="delete-post">Delete</button>
         <button class="edit" id="edit-post">Edit</button>
     </div>
        `;
     });
     postList.innerHTML=output;
}

let url='https://jsonplaceholder.typicode.com/todos';

fetch(url).then(res => res.json()).then(data =>renderPosts(data))


postList.addEventListener('click', (e)=>{
    e.preventDefault();
    let deleteButtonIsPressed = e.target.id == 'delete-post';
    let editButtonIsPressed = e.target.id == 'edit-post';

    let id = e.target.parentElement.dataset.id;

    if(deleteButtonIsPressed){
        fetch(`${url}/${id}`, {
            method: 'DELETE',
        })
        .then(res=>res.json())
        .then(()=>location.reload())
    }
});

addPostForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    fetch(url, {
        method: 'POST',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: idValue.value,
            title: titleValue.value,
            completed: bodyValue.value
        })
    })

    .then(res=> res.json())
    .then(data=>{
        let dataArray=[];
        dataArray.push(data);
        renderPosts(dataArray);
    })

})
