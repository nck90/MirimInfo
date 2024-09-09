import * as entry from '../../../../src/app/api/classes/page';
// Entry가 유효한지 확인
checkFields(entry);

// 기본 함수의 props 타입 확인
checkFields(entry.default);

// generateMetadata 함수의 인수 및 반환 타입 확인
if ('generateMetadata' in entry) {
  checkFields(entry.generateMetadata);
}

// generateViewport 함수의 인수 및 반환 타입 확인
if ('generateViewport' in entry) {
  checkFields(entry.generateViewport);
}

// generateStaticParams 함수의 인수 및 반환 타입 확인
if ('generateStaticParams' in entry) {
  checkFields(entry.generateStaticParams);
}


// checkFields 함수 정의
function checkFields<T>(input: T): void {
  // 검증 로직 추가 가능
  console.log(input);
}
