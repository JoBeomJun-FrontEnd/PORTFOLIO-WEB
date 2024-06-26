'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const progessBars = document.querySelectorAll('.skills__progessbar');

  // 프로젝트 클릭시 세부 정보 노출
  function init() {
    const $projectsLink = document.getElementById('projects__link');
    $projectsLink.addEventListener('click', () => {
      // 클릭시 클래스에 flip추가 / 삭제
      $projectsLink.classList.toggle('flip');
    });
  }

  init();

  // Skills 섹션의 progessBar가 뷰포트 진입시 애니메이션 시작위한 코드
  function handleIntersection(entries, observe) {
    entries.forEach((entry) => {
      // 각 요소가 뷰포트에 들어왔다면
      if (entry.isIntersecting) {
        const progessBar = entry.target;
        const percentage = progessBar.querySelector('.skills__percentage');
        // skills__percentage-text에 문자열을 가져옴
        const text = percentage.querySelector(
          '.skills__percentage-text',
        ).textContent;

        //숫자만 추출
        const value = parseInt(text, 10);

        // width를 결정
        percentage.style.width = value - 1 + '%';

        // 한번 실행후 다시 실행 안되도록
        observer.unobserve(progessBar);
      }
    });
  }

  // 변화 감지될 요소가 10% 보였다면
  const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.1,
  });

  // 변화 감지할 요소를 등록
  progessBars.forEach((bar) => {
    observer.observe(bar);
  });
});
