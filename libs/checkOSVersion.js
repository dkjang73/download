var osErrorMsg = ''; // 미지원 기기 메시지 저장 변수

// OS 및 브라우저 버전을 체크하여 웹앱 지원 여부 확인
function checkOSVersion() {
 var ua = navigator.userAgent; // User-Agent 정보 저장
 var isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream; // iOS 여부 확인
 var isAndroid = /Android/.test(ua); // Android 여부 확인
 
 if (isIOS) {
  var match = ua.match(/OS (\d+)_(\d+)_?(\d+)?/); // iOS 버전 추출 정규식
  if (match) {
   var version = parseFloat(match[1] + '.' + match[2]); // 실수형 버전으로 변환
   // 최소 지원 버전 설정 (iOS 13.0 기준)
   if (version < 13.0) {
    osErrorMsg = '현재 기기의 OS 버전(iOS ' + version + ')은<br> 지원 범위에 포함되지 않습니다.<br>iOS 13 이상으로 업데이트 해주세요.'; // 메시지 저장
    return false; // 미지원 반환
   } // End of If
  } // End of If
 } else if (isAndroid) {
  var chromeMatch = ua.match(/Chrome\/(\d+)/); // 크롬 버전 추출 정규식
  if (chromeMatch) {
   var chromeVersion = parseInt(chromeMatch[1], 10); // 정수형 버전으로 변환
   // 권장 지원 버전 설정 (Chrome 100 기준)
   if (chromeVersion < 100) {
    osErrorMsg = '현재 기기의 브라우저(Chrome ' + chromeVersion + ')는<br> 지원 범위에 포함되지 않습니다.<br>최신 버전으로 업데이트 해주세요.'; // 메시지 저장
    return false; // 미지원 반환
   } // End of If
  } // End of If
 } // End of If
 
 return true; // 지원 반환
} // End of checkOSVersion

// 실행 및 체크
if (!checkOSVersion()) {
 // 미지원 기기일 경우 DOM 로드 후 body에 메시지 렌더링
 document.addEventListener('DOMContentLoaded', function() {
  document.body.innerHTML = '<div style="display:flex;height:100vh;justify-content:center;align-items:center;text-align:center;font-family:\'Pretendard GOV\',sans-serif;font-size:17px;line-height:1.5;word-break:keep-all;">' + osErrorMsg + '</div>'; // 메시지 교체
 }); // End of EventListener
} // End of If