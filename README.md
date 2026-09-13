# 공과대학 교수 익명 의견수렴 페이지

숭실대학교 공과대학 교수님들을 대상으로 **9·18 기자회견 연명단체 명단에 '숭실대학교 교수협의회'가 참여할지 여부**에 대한 익명 의견을 수렴하는 페이지입니다.

- 공개 페이지: https://baelab-create.github.io/ssu-eng-survey/
- 구성: GitHub Pages(`index.html`) + Firebase Firestore(프로젝트 `baelab-ledger`, 컬렉션 `ssu_survey`)
- 선택지: 찬성 / 반대 / 유보 / 기타 + 자유의견(선택, 최대 1,500자)
- 로그인·인증 없이 누구나 익명으로 제출할 수 있고, 현황은 실시간으로 갱신됩니다.

## 동작 방식

- 제출 → Firestore `ssu_survey` 컬렉션에 `{ position, comment, createdAt(서버 시각) }` 문서 하나가 추가됩니다.
- 페이지는 `ssu_survey`를 실시간 구독(onSnapshot)해 집계와 의견 목록을 보여 줍니다.
- Firestore 규칙(`baelab-ledger/firestore.rules`의 `ssu_survey` 블록)이 허용하는 것: 누구나 읽기, 세 필드만 가진 문서 생성. 수정·삭제는 본사 계정(baewongyu@gmail.com 구글 로그인)만 가능합니다.
- 같은 브라우저에서는 제출 후 "의견이 접수되었습니다" 안내가 뜨고, "의견 추가로 제출하기"로 다시 제출할 수 있습니다. 중복 제출을 기술적으로 막지는 않습니다(의도된 설계).

## 규칙 게시 (최초 1회)

`baelab-ledger` 저장소의 `firestore.rules`에 `ssu_survey` 규칙이 들어 있습니다. Firebase 콘솔 → Firestore Database → 규칙 탭에 이 파일 내용을 붙여넣고 **게시**해야 제출·조회가 동작합니다. 게시 전에는 페이지에 "현황을 불러오지 못했습니다" 오류가 뜹니다.

## 응답 확인·관리

- Firebase 콘솔 → Firestore Database → `ssu_survey` 컬렉션에서 전체 응답을 볼 수 있습니다.
- 부적절한 응답은 콘솔에서 해당 문서를 삭제하면 페이지에서 즉시 사라집니다.
- 의견수렴이 끝나면 콘솔에서 `ssu_survey` 컬렉션을 삭제합니다. (규칙 블록도 함께 지우면 깔끔합니다)

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
- `assets/banner.jpg` — 9·18 기자회견 연명단체 명단 (2026. 9. 8. 4차 버전)
