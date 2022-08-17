export function getNotifySetting(message, type = "success", displayTime = 2000) {
    return {
      message: message,
      type: type, //'info' ,  'error', "success"
      displayTime: displayTime,
      position: {
        my: "center",
        at: "center",
        of: window,
        offset: "0 0",
      },
      width: function () {
        return window.innerWidth;
        //return;
      },
    };
  }