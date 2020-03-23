function changeViewMode() {
    fetch('/api/change-view-mode').then(function() {
        window.location.reload();
    });
}
