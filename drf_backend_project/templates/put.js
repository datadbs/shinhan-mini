const SERVER_URL = 'http://127.0.0.1:8000';

async function getArticle(id) {
    let response = await fetch(`${SERVER_URL}/blog/article/${id}`);
    let data = await response.json();
    return data;
}
async function insertArticle(id) {
    let data = await getArticle(id);
    let title = document.getElementById('title');
    let content = document.getElementById('content');
    title.value = data.title;
    content.innerText = data.content;
    title.parentElement.id = id;
}

async function updateArticle(post, id) {
    let response = await fetch(`${SERVER_URL}/blog/article/${id}`, {
        method: "PUT",
        body: JSON.stringify(post),
        headers: {
            'Content-type':'application/json'
        }
    });
    let data = await response.json();
    return data;
}

async function submitArticle(event) {
    let id = event.target.previousElementSibling.id;
    let post = {
        title: document.getElementById('title').value,
        content: document.getElementById('content').value,
    }
    let result = await updateArticle(post, id);
    console.log(result)
}