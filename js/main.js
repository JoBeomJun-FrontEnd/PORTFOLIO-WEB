'use strict';

document.addEventListener('DOMContentLoaded', function () {
  // [3선 클릭시 Nav바가 오른쪽에서 나오도록]

  // (클릭할 3선과 show 클래스를 넣을 menu를 가져옴)
  const navToggle = document.querySelector('.nav__toggle');
  const navMenu = document.querySelector('.nav__menu');
  // (3선을 클릭하면)
  navToggle.addEventListener('click', () => {
    // (show 클래스가 있다면 삭제 없다면 추가)
    navMenu.classList.toggle('show');
  });

  // (Nav클릭시 바가 닫히면서 이동되도록)
  const navItems = document.querySelectorAll('.nav__item');
  navItems.forEach((navItem) => {
    navItem.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });
  });

  // [뷰포트가 바뀔때 Nav의 active가 달라져 Nav bar 밑줄이 달라지도록]

  // (감지될 객체들을 가져옴)
  const sections = document.querySelectorAll('.section');
  // (active 클래스를 추가할 객체들을 가져옴)
  const navLinks = document.querySelectorAll('.nav__link');

  const options = {
    // (viewport)
    root: null,
    // (요소가 뷰포트에 조금이라도 들어오면 콜백 실행)
    threshold: 0,
    // (위에서 35% 아래에서 64% 사이를 체크)
    rootMargin: '-35% 0px -64% 0px',
  };

  // (observer1에 걸리면 실행될 함수 정리)
  function LookingSceen(entries, observe) {
    entries.forEach((entry) => {
      // (감지할 객체가 options가 정한 viewport에 보인다면)
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          // (이미 있던 active-link 클래스를 전부 삭제)
          link.classList.remove('active-link');
          // (nav__link에 있는 href에 첫글자(#)를 빼고 감지한 객체한 id의 문자와 같다면 실행 )
          if (link.getAttribute('href').substring(1) === entry.target.id) {
            // (active-link 클래스 추가)
            link.classList.add('active-link');
          }
        });
      }
    });
  }

  // (options에 걸리면 LookingSceen 함수를 실행)
  const observer1 = new IntersectionObserver(LookingSceen, options);

  // (감지할 객체 지정)
  sections.forEach((section) => {
    observer1.observe(section);
  });

  // [프로젝트 클릭시 세부 정보 노출위한 코드]

  const projectsItems = document.querySelectorAll('.projects__item');
  projectsItems.forEach((item) => {
    // (프로젝트 클릭시)
    item.addEventListener('click', () => {
      // (클릭된 프로젝트 외의 프로젝트에서 flip클래스 삭제)
      projectsItems.forEach((projectsItem) => {
        if (projectsItem.classList.contains('flip')) {
          if (projectsItem !== item) {
            projectsItem.classList.remove('flip');
          }
        }
      });
      // (filp이 있다면 추가 없다면 삭제)
      if (item.classList.contains('flip')) {
        item.classList.remove('flip');
      } else {
        item.classList.add('flip');
      }
    });
  });

  // [Skills 섹션의 progessBar가 뷰포트 진입시 애니메이션 시작 위한 코드]

  // (progessBar들의 모임을 가져옴)
  const progessCollections = document.querySelectorAll(
    '.skills__progess-collection',
  );

  function handleIntersection(entries, observe) {
    entries.forEach((entry) => {
      // (요소가 뷰포트에 들어왔다면)
      if (entry.isIntersecting) {
        const container = entry.target;
        const percentages = container.querySelectorAll('.skills__percentage');
        percentages.forEach((bar) => {
          // (skills__percentage-text에 문자열을 가져옴)
          const text = bar.querySelector(
            '.skills__percentage-text',
          ).textContent;
          // (숫자만 추출)
          const value = parseInt(text, 10);
          // (width를 결정)
          bar.style.width = value - 1 + '%';
        });
        // (한번 실행후 다시 실행 안되도록)
        observer2.unobserve(container);
      }
    });
  }

  // (변화 감지될 요소가 10% 보였다면)
  const observer2 = new IntersectionObserver(handleIntersection, {
    threshold: 0.1,
  });

  // (변화 감지할 요소를 등록)
  progessCollections.forEach((container) => {
    observer2.observe(container);
  });

  // [ScrollReveal를 활용한 애니메이션 적용]

  // (어떤 동작을 할건지 변수에 정의)
  const scrollReveal = ScrollReveal({
    // (위에서 아래로)
    origin: 'top',
    // (50px만큼)
    distance: '50px',
    // (1초동안 실행)
    duration: 1000,
  });

  // (화면에 들어오면 바로 실행)
  scrollReveal.reveal('.home__title, .section__title');
  // (화면에 들어오면 0.4초후에 실행)
  scrollReveal.reveal('.home__img, .about__subtitle', { delay: 300 });
  // (화면에 들어온 지정된 클래스들을 interval뒤 숫자 밀리세크마다 실행)
  scrollReveal.reveal('.home__profile', { interval: 100 });
  scrollReveal.reveal('.about__text', { interval: 100 });
  scrollReveal.reveal('.skills__icon', { interval: 100 });
  scrollReveal.reveal('.skills__name', { interval: 100 });
  scrollReveal.reveal('.contact__input', { interval: 100 });
  scrollReveal.reveal('.contact__btn', { interval: 100 });
  scrollReveal.reveal(' .skills__progessbar', { interval: 200 });
  scrollReveal.reveal('.projects__info', { interval: 200 });

  // [Typeits를 활용한 텍스트 타이핑 효과 넣기]

  // (어떤 동작을 할건지 변수에 정의)
  const typeit = new TypeIt('#typeit', {
    // (타이핑 속도)
    speed: 70,
    // (시작 딜레이)
    startDelay: 500,
    // (뷰포트에 보이면 시작할지 그냥 시작할지)
    waitUntilvisible: true,
  });

  // (문구 작성)
  typeit
    .type('안녕하세요!<br/>')
    .type(
      '<strong class="home__title-color">주니어 FrontEnd 개발자</strong><br/>',
    )
    // (문구 작성후 0.3초 대기)
    .type('<strong class="home__title-color">JobeomJun</strong>', {
      delay: 300,
    })
    // (글자 9개 지우고 0.3초후 다음 문구 작성)
    .delete(9, { delay: 300 })
    .type('<strong class="home__title-color">조범준</strong>입니다!')
    .go();
});
