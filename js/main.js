'use strict';

document.addEventListener('DOMContentLoaded', function () {
  // 삼선 클릭시 Nav바가 오른쪽에서 나오도록
  const navMenu = document.querySelector('.nav__menu');
  const navToggle = document.querySelector('.nav__toggle');
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });

  // Nav클릭시 바가 닫히면서 이동되도록
  const navItems = document.querySelectorAll('.nav__item');
  navItems.forEach((navItem) => {
    navItem.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });
  });

  // 프로젝트 클릭시 세부 정보 노출위한 코드
  const projectsLinks = document.querySelectorAll('.projects__link');
  projectsLinks.forEach((link) => {
    // 프로젝트 클릭시
    link.addEventListener('click', () => {
      // 클릭된 프로젝트 외의 프로젝트에서 flip클래스 삭제
      projectsLinks.forEach((projectLink) => {
        if (projectLink.classList.contains('flip')) {
          if (projectLink !== link) {
            projectLink.classList.remove('flip');
          }
        }
      });
      // filp이 있다면 추가 없다면 삭제
      if (link.classList.contains('flip')) {
        link.classList.remove('flip');
      } else {
        link.classList.add('flip');
      }
    });
  });

  // Skills 섹션의 progessBar가 뷰포트 진입시 애니메이션 시작 위한 코드

  // progessBar들의 모임을 가져옴
  const progessCollections = document.querySelectorAll(
    '.skills__progess-collection',
  );

  function handleIntersection(entries, observe) {
    entries.forEach((entry) => {
      // 요소가 뷰포트에 들어왔다면
      if (entry.isIntersecting) {
        const container = entry.target;
        const percentages = container.querySelectorAll('.skills__percentage');
        percentages.forEach((bar) => {
          // skills__percentage-text에 문자열을 가져옴
          const text = bar.querySelector(
            '.skills__percentage-text',
          ).textContent;
          //숫자만 추출
          const value = parseInt(text, 10);
          // width를 결정
          bar.style.width = value - 1 + '%';
        });
        // 한번 실행후 다시 실행 안되도록
        observer.unobserve(container);
      }
    });
  }

  // 변화 감지될 요소가 10% 보였다면
  const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.1,
  });

  // 변화 감지할 요소를 등록
  progessCollections.forEach((container) => {
    observer.observe(container);
  });
});
