async function detailArticle(event) {
    let item = document.getElementById('item');
    let id = event.target.id;
    let data = await getArticle(id)
    item.insertAdjacentHTML('beforeEnd',`
    <div>
        <p>글쓴사람:${data.author}</p>
        <p>제목:${data.title}</p>
        <p>내용:${data.content}</p>
        <p>카테고리:${JSON.stringify(data.category.name)}</p>
        <p>글쓴시각:${data.created_time}</p>
        <p>업데이트:${data.updated_time}</p>
        <button onclick="closeModal()">닫기</button>
    </div>`)
}