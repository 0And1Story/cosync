const constant = require('./const');

function FileType() {
    this.getFileType = function(path) {
        return path.split('.').slice(-1)[0].toLowerCase();
    };
    
    this.getFileColor = function(path) {
        let suffix = this.getFileType(path);
        switch(suffix) {
            case 'exe':
                return 'green-500';
    
            case 'rar':
            case 'zip':
            case '7z':
            case 'tgz':
            case 'tar':
            case 'gz':
            case 'iso':
                return 'red-accent';
            
            case 'png':
            case 'jpg':
            case 'ico':
            case 'webp':
            case 'gif':
            case 'bmp':
                return 'deep-purple-accent';
            
            case 'mp3':
            case 'm4a':
            case 'wav':
            case 'flac':
            case 'ogg':
                return 'orange-500';

            case 'mp4':
            case 'avi':
            case 'wmv':
                return 'teal-400';
    
            default:
                return 'grey-700';
        }
    };
    
    this.getIconColor = function(path) {
        let suffix = this.getFileType(path);
        switch(suffix) {
            case 'exe':
                return 'green-500';
    
            case 'rar':
            case 'zip':
            case '7z':
            case 'tgz':
            case 'tar':
            case 'gz':
            case 'iso':
                return 'red-accent';
            
            case 'png':
            case 'jpg':
            case 'ico':
            case 'webp':
            case 'gif':
            case 'bmp':
                return 'deep-purple-accent';
            
            case 'mp3':
            case 'm4a':
            case 'wav':
            case 'flac':
            case 'ogg':
                return 'orange-500';

            case 'mp4':
            case 'avi':
            case 'wmv':
                return 'teal-400';

            case 'doc':
            case 'docx':
                return 'indigo-a400';
            case 'ppt':
            case 'pptx':
                return 'orange-a400';
            case 'xls':
            case 'xlsx':
                return 'green-a400';
            case 'pdf':
                return 'red-a400';
            case 'md':
                return 'yellow-700';
    
            default:
                return 'grey-700';
        }
    };
    
    this.getFileIcon = function(path) {
        let suffix = this.getFileType(path);
        if (constant.langs_icon.indexOf(suffix) != -1) return 'code_file';
        switch(suffix) {
            case 'exe':
                return 'console';
    
            case 'rar':
            case 'zip':
            case '7z':
            case 'iso':
                return 'archive';
            
            case 'png':
            case 'jpg':
            case 'ico':
            case 'webp':
            case 'gif':
            case 'bmp':
                return 'image';
            
            case 'mp3':
            case 'm4a':
            case 'wav':
            case 'flac':
            case 'ogg':
                return 'music_note';

            case 'mp4':
            case 'avi':
            case 'wmv':
                return 'slideshow';
            
            case 'doc':
            case 'docx':
                return 'doc';
            case 'ppt':
            case 'pptx':
                return 'ppt';
            case 'xls':
            case 'xlsx':
                return 'xls';
            case 'pdf':
                return 'pdf';
            case 'md':
                return 'markdown';
    
            default:
                return 'description';
        }
    };
}

module.exports = new FileType();
