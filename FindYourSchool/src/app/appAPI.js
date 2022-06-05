var str = new String(process.env.GITPOD_WORKSPACE_URL)
var splits1 = str.substring(0, 8)
var splits2 = str.substring(8,)
var str3 = splits1+5000+"-"+splits2
const _API2= str3;
console.log(_API2);
