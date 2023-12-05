export function isMobileDevice(): boolean {
  // 1.
  const hasTouchEvent = "ontouchstart" in document.documentElement;
  // 2.
  const matchedAgent = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,
  );

  return hasTouchEvent || !!matchedAgent;
}
