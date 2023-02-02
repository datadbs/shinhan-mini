const SERVER_URL = 'http://127.0.0.1:8000';
async function getArticle(id) {
    let response = await fetch(`${SERVER_URL}/blog/article/${id}`);
    let data = await response.json()
    return data;
}
async function getArticles() {
    let response = await fetch(`${SERVER_URL}/blog/article`);
    let data = await response.json()
    return data;
}
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
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
const closeModal = () => {
    let modal = document.getElementById('modal');
    let item = document.getElementById('item');
    modal.style.animation = 'fadeout 2s';
    setTimeout(() => modal.style.display = 'none', 2000);
    item.empty();
}
async function detailArticle(event) {
    let modal = document.getElementById('modal');
    modal.style.display = 'flex';
    modal.style.animation = 'fadein 2s';
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
async function insertArticles(category) {
    let datas = await getArticles();
    const happy = datas.filter((data) => {
        return data.category.id===category;
    })
    happy.forEach((data, index) => {
        document.body.insertAdjacentHTML('beforeEnd',`
        <hr>
        <div onclick="detailArticle(event)" id="${data.id}">
            <h2>글쓴사람:${data.author}</h2>
            <h2>${data.title}</h2> \
            <p>${data.content}</p> \
        </div>
        <button onclick="deleteArticle(${data.id})">삭제</button>
        `)
    })
}
async function getCategory() {
    let response = await fetch(`${SERVER_URL}/blog/category`);
    let data = await response.json()
    return data;
}
async function categorys() {
    let datas = await getCategory();
    let select = document.getElementsByTagName('select')[0];
    datas.forEach((data, index) => {
        select.insertAdjacentHTML('beforeEnd',`
            <option value="${data.id}">${data.name}</option>
        `);
    })
}
categorys()
function changeValue() {
    var value_str = document.getElementById('select');
    console.log(value_str)
    insertArticles(Number(value_str.options[value_str.selectedIndex].value))
}