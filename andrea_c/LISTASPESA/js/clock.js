var data = new Date();
var g, m, a, h, m, s;
g = data.getDate() + "/";
m = data.getMonth() + 1 + "/";
a = data.getFullYear();
document.write("Oggi è il " + g + m + a + ", e sarebbe anche l'ora che tu facessi qualcosa");
// h = data.getHours() + ":";
// m = data.getMinutes() + ":";
// s = data.getSeconds();
// document.write(g + m + a + "            " + h + m + s)