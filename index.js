function renderComments(list) {
    var $list = document.getElementById('comment-list');
    var fragment = new DocumentFragment();
    list.forEach(item => {
        var $comment = document.createElement('div');
        var $name = document.createElement('div');
        var $content = document.createElement('div');
        $name.innerText = item.name || '匿名';
        $content.innerText = item.content;

        $comment.classList.add('box');
        $name.classList.add('title', 'is-5')

        $comment.appendChild($name);
        $comment.appendChild($content);
        fragment.appendChild($comment);
    });
    $list.appendChild(fragment);
}

function getList() {
    fetch('godqian.json')
        .then(res => res.json())
        .then(renderComments);
}

window.onload = getList;

// function isIE(){
//     //ie? 
//     if (window.navigator.userAgent.indexOf("MSIE")>=1) 
//         return true; 
//     else 
//         return false; 
// } 

// if(!isIE()){ //firefox innerText define
//     HTMLElement.prototype.__defineGetter__(    "innerText", 
//         function(){ 
//             return this.textContent; 
//         } 
//     ); 
//     HTMLElement.prototype.__defineSetter__(    "innerText", 
//         function(sText){ 
//             this.textContent=sText; 
//         } 
//     ); 
// }
// function gel(id)
// {
//     return document.getElementById(id);
// }
// function gelt(e)
// {
//     if(e.textContent)
//         return(e.textContent);
//     else if(e.text)
//         return(e.text);
//     else
//         return "N/A";
// }
// function xmlHttp()
// {
//     if(window.ActiveXObject)
//     {
//         return new ActiveXObject("Microsoft.XMLHTTP");
//     }
//     else if(window.XMLHttpRequest)
//     {
//         return new window.XMLHttpRequest()
//     }
//     else
//     {
//         return null;
//     }
// }
// function getList()
// {
//     var xhr=xmlHttp();
//     if(xhr==null)
//     {
//         gel("list").text="浏览器不支持Ajax，无法显示。";
//         return;
//     }
//     xhr.open("GET","godqian.xml?"+Math.random());
//     xhr.onreadystatechange=function()
//     {
//         if(xhr.readyState==4)
//         {
//             gel("list").innerHTML="";
//             for(i=0;i<xhr.responseXML.getElementsByTagName("entry").length;i++)
//             {
//                 gel("list").innerHTML+="<a onclick=\"gel('tip').innerText='"+gelt(xhr.responseXML.getElementsByTagName("entry")[i]).replace(/"/g,"&quot;")+"';gel('tip').innerHTML=gel('tip').innerHTML.replace(/\\[imp\\]/ig,'<span class=\\'important\\'>').replace(/\\[\\/imp\\]/ig,'</span>');\" onmouseover=\"return true;\" href=\"#atip\">·"+xhr.responseXML.getElementsByTagName("entry")[i].getAttribute("name")+"</a><br />";
//             }
//         }
//     }
//     xhr.send(null);
// }
// function submitTip()
// {
//     var query="";
//     query="Name="+gel("txtName").value+"&Tip="+gel("txtTip").value.replace(/\\/g,"\\\\").replace(/\n/g,"\\r\\n").replace(/'/g,"\\'");
//     var xhr=xmlHttp();
//     if(xhr==null)
//     {
//         alert("浏览器不支持Ajax，无法提交。");
//         return;
//     }
//     xhr.open("POST","submittips.asp");
//     xhr.onreadystatechange=function()
//     {
//         if(xhr.readystate==4)
//         {
//             getList();
//         }
//     }
//     xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
//     xhr.send(query);
// }
