# 공과대학 교수 익명 의견수렴 페이지

숭실대학교 공과대학 교수님들을 대상으로 **9·18 기자회견 연명단체 명단에 '숭실대학교 교수협의회'가 참여할지 여부**에 대한 익명 의견을 수렴하는 페이지입니다.

- 공개 페이지: https://baelab-create.github.io/ssu-eng-survey/
- 구성: GitHub Pages(`index.html`) + Google Sheets/Apps Script(`Code.gs`, 응답 저장·공개 집계)
- 이 저장소만 clone 하면 어느 PC에서든 동일하게 작업할 수 있습니다.

## 1. Google Sheets와 Apps Script 만들기 (최초 1회)

1. 새 Google 스프레드시트를 만듭니다. (예: `공대 의견수렴 2026-09`)
2. `확장 프로그램 → Apps Script`를 엽니다.
3. 기본 코드를 모두 지우고 이 저장소의 `Code.gs` 내용을 붙여 넣어 저장합니다.
4. `배포 → 새 배포 → 유형 선택(톱니바퀴) → 웹 앱`을 선택합니다.
5. 실행 사용자는 `나`, 액세스 권한은 `모든 사용자`로 설정하고 배포합니다. (처음에는 권한 승인 창이 뜹니다)
6. 발급된 `/exec` 로 끝나는 웹 앱 URL을 복사합니다.

## 2. HTML에 API 주소 넣기

`index.html` 하단 스크립트의 다음 값을 웹 앱 URL로 교체합니다.

```js
const API_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';
```

예시:

```js
const API_URL = 'https://script.google.com/macros/s/xxxxxxxxxxxxxxxx/exec';
```

교체 후 commit & push 하면 GitHub Pages가 자동으로 다시 배포됩니다. (반영까지 1~10분)

> `Code.gs`를 나중에 수정했다면 `배포 → 배포 관리 → 새 버전`으로 다시 배포해야 반영됩니다. URL은 그대로 유지됩니다.

## 3. 다른 PC(노트북)에서 작업하기

```bash
git clone https://github.com/baelab-create/ssu-eng-survey.git
```

수정 후:

```bash
git add -A && git commit -m "수정 내용" && git push
```

## 운영 및 관리

- 응답은 Google Sheet의 `responses` 탭에 저장됩니다. (A 시각, B 선택, C 의견, D 공개)
- D열 `공개` 체크를 해제하면 해당 응답은 공개 집계와 의견 목록에서 즉시 제외됩니다.
- 삭제가 필요한 의견은 행을 삭제해도 됩니다.
- 이름, 학과, 이메일은 수집하지 않으며 Apps Script는 접속자 IP를 시트에 기록하지 않습니다.
- 완전 익명 방식이므로 한 사람이 여러 번 제출하는 것을 기술적으로 완전히 막지는 않습니다. (같은 브라우저에서는 "이미 제출" 안내가 뜨고, "다시 제출하기"로 재제출 가능)
- 의견 작성은 선택 사항이며, 자유의견은 즉시 공개되므로 배포 중에는 시트를 주기적으로 확인하는 것이 좋습니다.

## 파일

- `index.html` — 의견수렴 페이지 (안건, 연명단체 이미지, 투표·의견 폼, 공개 현황)
- `assets/banner.jpg` — 9·18 기자회견 연명단체 명단 (2026. 9. 8. 4차 버전)
- `Code.gs` — Google Apps Script 백엔드
