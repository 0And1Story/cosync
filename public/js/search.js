var file_list = [];
var search_result = [];
var display_result = [];

function initSearch() {
    fetch('/api/file-list')
    .then(response => response.json())
    .then(data => file_list = data.list)
    .then(function() {
        search_result = file_list;
        initSearchList();
    });
}

function initSearchList() {
    let list = document.getElementById('search-list');
    let content = '';
    for (result of search_result) {
        content += 
        `<li class="mdui-list-item mdui-ripple mdui-text-color-${result.isFile ? filetype.getFileColor(result.file) : 'indigo-accent folder'}">
            <a href="${result.path}" target="_blank" class="mdui-list-item-icon mdui-icon material-icons mdui-text-color-${result.isFile ? filetype.getIconColor(result.file) : 'indigo-accent folder'} mdui-list-item-avator">${result.isFile ? filetype.getFileIcon(result.file) : 'folder'}</a>
            <a href="${result.path}" target="_blank" class="mdui-list-item-content mdui-text-color-${result.isFile ? filetype.getFileColor(result.file) : 'indigo-accent folder'}">
                <div class="mdui-list-item-title">${result.file}</div>
                <div class="mdui-list-item-text mdui-list-item-one-line">~${result.path}</div>
            </a>
            ${result.isFile ? '<a class="mdui-list-item-icon mdui-icon material-icons mdui-text-color-theme-accent" href="' + result.path + '" download="' + result.file + '">file_download</a>' : ''}
            <a class="mdui-list-item-icon mdui-icon material-icons mdui-text-color-theme-accent" href="${result.path}/.." target="_blank">folder</a>
        </li>
        <li class="mdui-divider-inset mdui-m-y-0"></li>`;
    }
    list.innerHTML = content;
}

function search() {
    let str = document.getElementById('search-input').value.toLowerCase();
    search_result = file_list.filter(res => res.file.toLowerCase().indexOf(str) != -1);
    initSearchList();
}
