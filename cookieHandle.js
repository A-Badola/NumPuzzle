function setCookie(cname,cvalue,exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  console.log("" + cname + "=" + cvalue + ";" + expires + ";path=/")
  console.log("cookie Set");
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = document.cookie;
  let ca = decodedCookie.split(';');
  console.log(ca);
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie(curTotalTime) {

  console.log("inside checking cookie " + curTotalTime);
  let curMin = getCookie("minTotalTime");
  console.log(curMin);
  if (curMin != "") {
    console.log("checking cookie");
    if(parseInt(curMin) >= curTotalTime){
      curMin = curTotalTime.toString();
      setCookie("minTotalTime", curMin, 30);
    }
  } else {
    console.log("setting cookie");
    setCookie("minTotalTime", curTotalTime, 30);
  }
}