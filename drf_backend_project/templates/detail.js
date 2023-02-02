const SERVER_URL = 'http://127.0.0.1:8000';
async function getArticle(id) {
    let response = await fetch(`${SERVER_URL}/blog/article/${id}`);
    let data = await response.json()
    return data;
}
async function deleteArticle(id) {
    let token = getCookie('access_token')
    let response = await fetch(`${SERVER_URL}/blog/article/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (response.status ===204) {
        let post = document.getElementById(id);
        post.remove();
    }
}
async function detailArticle(id) {
    let item = document.getElementById('item');
    let data = await getArticle(id)
    item.insertAdjacentHTML('beforeEnd',`
    <div>
        <p>글쓴사람:${data.author}</p>
        <p>제목:${data.title}</p>
        <p>내용:${data.content}</p>
        <p>카테고리:${JSON.stringify(data.category.name)}</p>
        <p>글쓴시각:${data.created_time}</p>
        <p>업데이트:${data.updated_time}</p>
        <button onclick="deleteArticle(${data.id})">삭제</button>
        <button onclick="closeModal()">수정</button>
    </div>`)
}
