const constant = {
    langs: ["1c","abnf","accesslog","ada","armasm","arm","avrasm","actionscript","as","alan","i","angelscript","asc","apache","apacheconf","applescript","osascript","arcade","asciidoc","adoc","aspectj","autohotkey","autoit","awk","mawk","nawk","gawk","axapta","bash","sh","zsh","basic","bnf","brainfuck","bf","cs","csharp","cpp","c","cc","h","hpp","cal","cos","cls","cmake","coq","csp","css","capnproto","capnp","clojure","clj","coffeescript","coffee","cson","iced","crmsh","crm","pcmk","crystal","cr","cypher","d","dns","zone","bind","dos","bat","cmd","dart","delphi","dpr","dfm","pas","pascal","freepascal","lazarus","lpr","lfm","diff","patch","django","jinja","dockerfile","docker","dsconfig","dts","dust","dst","dylan","ebnf","elixir","elm","erlang","erl","extempore","xtlang","xtm","fsharp","fs","fix","fortran","f90","f95","gcode","nc","gams","gms","gauss","gss","godot","gdscript","gherkin","gn","gni","go","golang","gf","golo","gololang","gradle","groovy","xml","xhtml","rss","atom","xjb","xsd","xsl","plist","svg","http","https","haml","handlebars","hbs","haskell","hs","haxe","hx","hy","hylang","ini","toml","inform7","i7","irpf90","json","java","jsp","javascript","js","jsx","kotlin","kt","leaf","lasso","ls","lassoscript","less","ldif","lisp","livecodeserver","livescript","ls","lua","makefile","mk","mak","mathematica","mma","wl","matlab","maxima","mel","mercury","mirc","mrc","mizar","mojolicious","monkey","moonscript","moon","n1ql","nsis","nginx","nginxconf","nimrod","nim","nix","ocaml","ml","objectivec","mm","objc","obj-c","glsl","openscad","scad","ruleslanguage","oxygene","pf","php","php3","php4","php5","php6","php7","parser3","perl","pl","pm","plaintext","pony","pgsql","postgres","postgresql","powershell","ps","ps1","processing","prolog","properties","protobuf","puppet","pp","python","py","gyp","profile","k","kdb","qml","r","cshtml","razor","razor-cshtml","reasonml","re","rib","rsl","graph","instances","robot","rf","rpm-specfile","rpm","spec","rpm-spec","specfile","ruby","rb","gemspec","podspec","thor","irb","rust","rs","SAS","sas","scss","sql","p21","step","stp","scala","scheme","scilab","sci","shexc","shell","console","smali","smalltalk","st","solidity","sol","stan","stanfuncs","stata","iecst","scl","stl","structured-text","stylus","styl","subunit","supercollider","sc","swift","tcl","tk","terraform","tf","hcl","tap","tex","thrift","tp","twig","craftcms","typescript","ts","vbnet","vb","vbscript","vbs","vhdl","vala","verilog","v","vim","x86asm","xl","tao","xquery","xpath","xq","yml","yaml","zephir","zep"],
    langs_icon: ["1c","abnf","accesslog","ada","armasm","arm","avrasm","actionscript","as","alan","i","angelscript","asc","apache","apacheconf","applescript","osascript","arcade","asciidoc","adoc","aspectj","autohotkey","autoit","awk","mawk","nawk","gawk","axapta","bash","sh","zsh","basic","bnf","brainfuck","bf","cs","csharp","cpp","c","cc","h","hpp","cal","cos","cls","cmake","coq","csp","css","capnproto","capnp","clojure","clj","coffeescript","coffee","cson","iced","crmsh","crm","pcmk","crystal","cr","cypher","d","dns","zone","bind","dos","bat","cmd","dart","delphi","dpr","dfm","pas","pascal","freepascal","lazarus","lpr","lfm","diff","patch","django","jinja","dockerfile","docker","dsconfig","dts","dust","dst","dylan","ebnf","elixir","elm","erlang","erl","extempore","xtlang","xtm","fsharp","fs","fix","fortran","f90","f95","gcode","nc","gams","gms","gauss","gss","godot","gdscript","gherkin","gn","gni","go","golang","gf","golo","gololang","gradle","groovy","xml","html","xhtml","rss","atom","xjb","xsd","xsl","plist","svg","http","https","haml","handlebars","hbs","haskell","hs","haxe","hx","hy","hylang","ini","toml","inform7","i7","irpf90","json","java","jsp","javascript","js","jsx","kotlin","kt","leaf","lasso","ls","lassoscript","less","ldif","lisp","livecodeserver","livescript","ls","lua","makefile","mk","mak","mathematica","mma","wl","matlab","maxima","mel","mercury","mirc","mrc","mizar","mojolicious","monkey","moonscript","moon","n1ql","nsis","nginx","nginxconf","nimrod","nim","nix","ocaml","ml","objectivec","mm","objc","obj-c","glsl","openscad","scad","ruleslanguage","oxygene","pf","php","php3","php4","php5","php6","php7","parser3","perl","pl","pm","plaintext","pony","pgsql","postgres","postgresql","powershell","ps","ps1","processing","prolog","properties","protobuf","puppet","pp","python","py","gyp","profile","k","kdb","qml","r","cshtml","razor","razor-cshtml","reasonml","re","rib","rsl","graph","instances","robot","rf","rpm-specfile","rpm","spec","rpm-spec","specfile","ruby","rb","gemspec","podspec","thor","irb","rust","rs","SAS","sas","scss","sql","p21","step","stp","scala","scheme","scilab","sci","shexc","shell","console","smali","smalltalk","st","solidity","sol","stan","stanfuncs","stata","iecst","scl","stl","structured-text","stylus","styl","subunit","supercollider","sc","swift","tcl","tk","terraform","tf","hcl","tap","tex","thrift","tp","twig","craftcms","typescript","ts","vbnet","vb","vbscript","vbs","vhdl","vala","verilog","v","vim","x86asm","xl","tao","xquery","xpath","xq","yml","yaml","zephir","zep"]
};

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

const filetype = new FileType();
