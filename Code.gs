/**
 * 공과대학 교수 익명 의견수렴 — Google Apps Script 백엔드
 *
 * 시트 구조 (responses 탭)
 *   A: 시각(ISO)  B: 선택(찬성/반대/기타)  C: 의견  D: 공개(체크박스)
 *
 * 배포: 배포 → 새 배포 → 웹 앱, 실행 사용자 "나", 액세스 "모든 사용자"
 * 발급된 /exec 주소를 index.html 의 API_URL 에 넣습니다.
 */
const SHEET_NAME = 'responses';
const POSITIONS = ['찬성', '반대', '기타'];
const MAX_LEN = 1500;

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = ss.insertSheet(SHEET_NAME);
  if (sh.getLastRow() === 0) {
    sh.appendRow(['시각', '선택', '의견', '공개']);
    sh.getRange(1, 1, 1, 4).setFontWeight('bold');
    sh.setFrozenRows(1);
    sh.setColumnWidth(3, 520);
  }
  return sh;
}

// 응답 저장 (index.html 폼이 hidden iframe 으로 POST)
function doPost(e) {
  const p = (e && e.parameter) || {};
  if (p.website) return html_('ok'); // 봇 방지 허니팟
  const position = String(p.position || '').trim();
  let comment = String(p.comment || '').replace(/\r\n?/g, '\n').trim();
  if (POSITIONS.indexOf(position) < 0) return html_('invalid');
  if (comment.length > MAX_LEN) comment = comment.slice(0, MAX_LEN);

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sh = getSheet_();
    sh.appendRow([new Date().toISOString(), position, comment, true]);
    sh.getRange(sh.getLastRow(), 4).insertCheckboxes();
  } finally {
    lock.releaseLock();
  }
  return html_('ok');
}

// 공개 현황 조회 (JSONP)
function doGet(e) {
  const p = (e && e.parameter) || {};
  const data = listPublic_();
  const json = JSON.stringify(data);
  if (p.callback && /^[A-Za-z_$][\w$]*$/.test(p.callback)) {
    return ContentService.createTextOutput(p.callback + '(' + json + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}

function listPublic_() {
  const sh = getSheet_();
  const last = sh.getLastRow();
  const counts = { 찬성: 0, 반대: 0, 기타: 0 };
  const comments = [];
  if (last >= 2) {
    const rows = sh.getRange(2, 1, last - 1, 4).getValues();
    rows.forEach(function (r) {
      const at = r[0] instanceof Date ? r[0].toISOString() : String(r[0] || '');
      const position = String(r[1] || '').trim();
      const comment = String(r[2] || '');
      const pub = r[3] === true || String(r[3]).toUpperCase() === 'TRUE';
      if (!pub || POSITIONS.indexOf(position) < 0) return;
      counts[position]++;
      if (comment.trim()) comments.push({ at: at, position: position, comment: comment });
    });
  }
  comments.reverse(); // 최신 의견이 위로
  return { total: counts.찬성 + counts.반대 + counts.기타, counts: counts, comments: comments, updatedAt: new Date().toISOString() };
}

function html_(text) {
  return HtmlService.createHtmlOutput('<!doctype html><meta charset="utf-8">' + text);
}
