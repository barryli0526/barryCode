(function ()
{
    String.prototype.HtmlEncode = function ()
    {
        var tmpDiv = document.createElement("div");
        if (tmpDiv.innerText != null)
            tmpDiv.innerText = this.toString();
        else
            tmpDiv.textContent = this.toString();
        return tmpDiv.innerHTML;
    };
    String.prototype.HtmlDecode = function ()
    {
        var tmpDiv = document.createElement("div");
        tmpDiv.innerHTML = this.toString();
        return tmpDiv.innerText ? tmpDiv.innerText : tmpDiv.textContent;
    };
    String.prototype.trim = function ()
    {
        var reg = /(^\s*)|(\s*$)/gi,
            empty = "";
        return this.replace(reg, empty);
    };
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/\{(\d+)\}/g, function (m, i) { return args[i]; });
    }
})();