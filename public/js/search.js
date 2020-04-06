var file_list = [];
var search_result = [];
var search_str = '';

function initSearch() {
    let input = document.getElementById('search-input');
    input.focus();
    if (file_list.length > 0) return;
    fetch('/api/file-list')
    .then(response => response.json())
    .then(data => file_list = data.list)
    .then(function() {
        search_result = file_list;
        updateSearchList();
    });
}

function updateSearchList() {
    let list = document.getElementById('search-list');
    let content = '';
    for (result of search_result) {
        content += 
        `<li class="mdui-list-item mdui-ripple mdui-text-color-${result.isFile ? filetype.getFileColor(result.file) : 'indigo-accent folder'}">
            <a href="${result.path}" target="_blank" class="mdui-list-item-icon mdui-icon material-icons mdui-text-color-${result.isFile ? filetype.getIconColor(result.file) : 'indigo-accent folder'} mdui-list-item-avator">${result.isFile ? filetype.getFileIcon(result.file) : 'folder'}</a>
            <a href="${result.path}" target="_blank" class="mdui-list-item-content mdui-text-color-${result.isFile ? filetype.getFileColor(result.file) : 'indigo-accent folder'}">
                <div class="mdui-list-item-title">${result.file == '' ? result.file : result.file.replace(RegExp(search_str, 'i'), '<mark>$&</mark>')}</div>
                <div class="mdui-list-item-text mdui-list-item-one-line">~${result.path}</div>
            </a>
            ${result.isFile ? `<a class="mdui-list-item-icon mdui-icon material-icons mdui-text-color-theme-accent" href="${result.path}" download="${result.file}" mdui-tooltip="{content: '下载', delay: 1000, position: 'top'}">file_download</a>` : ''}
            <a class="mdui-list-item-icon mdui-icon material-icons mdui-text-color-theme-accent" href="${result.path}/.." target="_blank" mdui-tooltip="{content: '打开文件夹', delay: 1000, position: 'top'}">folder</a>
        </li>
        <li class="mdui-divider-inset mdui-m-y-0"></li>`;
    }
    list.innerHTML = content;
}

function search() {
    search_str = document.getElementById('search-input').value.replace(/[\^\$\(\)\*\+\?\.\[\\\{\|]/g, '\\$&');
    search_result = file_list.filter(res => res.file.search(RegExp(search_str, 'i')) != -1);
    updateSearchList();
}
