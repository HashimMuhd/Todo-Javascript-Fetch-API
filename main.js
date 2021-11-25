let postList=document.querySelector('#notes');
let addPostForm=document.querySelector('.add-post-form');
let idValue=document.getElementById('user_id');
let titleValue=document.getElementById('text');
let bodyValue=document.getElementById('desc');
let output="";

let renderPosts=(posts)=>{
    posts.forEach(post=>{
        output +=`
        <div id="note">
        <h5>${post.userId}</h5>
        <h3>${post.id}</h3>
       <h4>${post.title}</h4>
       <h3>${post.completed}</h3>
         <button class="del">Delete</button>
         <button class="edit">Edit</button>
     </div>
        `;
     });
     postList.innerHTML=output;
}

let url='https://jsonplaceholder.typicode.com/todos';

fetch(url).then(res => res.json()).then(data =>renderPosts(data))

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
