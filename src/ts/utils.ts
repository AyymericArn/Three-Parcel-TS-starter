function addStyle(content:string) {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = content;
    document.getElementsByTagName('head')[0].appendChild(style);
}
