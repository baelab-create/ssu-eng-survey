# 공과대학 교수 익명 의견수렴 페이지

숭실대학교 공과대학 교수님들을 대상으로 **9·18 기자회견 연명단체 명단에 '숭실대학교 교수협의회'가 참여할지 여부**에 대한 익명 의견을 수렴하는 페이지입니다.

- 공개 페이지: https://baelab-create.github.io/ssu-eng-survey/
- 구성: GitHub Pages(`index.html`) + Firebase Firestore(전용 프로젝트 `ssu-eng-survey`, 컬렉션 `ssu_survey`)
- 배랩·닥터배 프로젝트(baelab-ledger)와는 완전히 분리된 별도 Firebase 프로젝트입니다. 의견수렴이 끝나면 프로젝트째 삭제합니다.
- 선택지: 찬성 / 반대 / 유보 / 기타 + 자유의견(선택, 최대 1,500자)
- 로그인·인증 없이 누구나 익명으로 제출할 수 있고, 현황은 실시간으로 갱신됩니다.

## 동작 방식

- 제출 → Firestore `ssu_survey` 컬렉션에 `{ position, comment, createdAt(서버 시각) }` 문서 하나가 추가됩니다.
- 페이지는 `ssu_survey`를 실시간 구독(onSnapshot)해 집계와 의견 목록을 보여 줍니다.
- Firestore 규칙(이 저장소의 `firestore.rules`)이 허용하는 것: 누구나 읽기, 세 필드만 가진 문서 생성. 수정·삭제는 클라이언트에서 불가, Firebase 콘솔에서만 가능합니다.
- 같은 브라우저에서는 제출 후 "의견이 접수되었습니다" 안내가 뜨고, "의견 추가로 제출하기"로 다시 제출할 수 있습니다. 중복 제출을 기술적으로 막지는 않습니다(의도된 설계).

## 규칙

`firestore.rules`가 콘솔에 게시된 규칙 원본입니다. 바꿀 일이 있으면 Firebase 콘솔 → ssu-eng-survey → Firestore Database → 규칙 탭에 붙여넣고 게시합니다.

## 응답 확인·관리 (관리자 페이지)

- 관리자 페이지: https://baelab-create.github.io/ssu-eng-survey/admin.html
- 구글 로그인(baewongyu@gmail.com만 허용, `OWNER_EMAILS`)이 필요합니다. Firebase 콘솔의 Authentication → Google 제공업체가 켜져 있고, 승인된 도메인에 baelab-create.github.io가 등록되어 있습니다.
- 기능: 응답 실시간 목록(선택·시각·의견), 필터, 체크박스 선택 삭제·개별 삭제, CSV 내려받기. 삭제하면 공개 페이지에서도 즉시 사라집니다.
- 작성자는 수정·삭제할 수 없고, 삭제는 관리자만 가능합니다(규칙 `allow delete: if isOwner()`).
- Firebase 콘솔 → Firestore Database → `ssu_survey`에서도 같은 데이터를 볼 수 있습니다.
- 의견수렴이 끝나면 Firebase 콘솔 → 프로젝트 설정 → 일반 → 맨 아래 "프로젝트 삭제"로 프로젝트째 삭제합니다. (삭제 후 30일 유예 뒤 완전 삭제) GitHub 저장소도 Settings → Delete this repository로 지우면 끝입니다.

## 다른 PC(노트북)에서 작업하기

```bash
git clone https://github.com/baelab-create/ssu-eng-survey.git
```

수정 후:

```bash
git add -A && git commit -m "수정 내용" && git push
```

GitHub Pages 반영까지 1~10분 걸립니다. 바로 확인하려면 주소 뒤에 `?v=2`처럼 아무 값을 붙여 캐시를 우회하세요.

## 파일

- `index.html` — 의견수렴 페이지 (안건, 연명단체 이미지, 4지선다 투표·의견 폼, 실시간 공개 현황)
- `admin.html` — 관리자 페이지 (구글 로그인, 응답 목록·선택 삭제·CSV)
- `assets/banner.jpg` — 9·18 기자회견 연명단체 명단 (2026. 9. 8. 4차 버전)
- `firestore.rules` — Firestore 보안 규칙 (콘솔에 게시된 것과 동일)
