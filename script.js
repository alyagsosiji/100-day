document.addEventListener('DOMContentLoaded', () => {
    
    // [보안] 우클릭, 드래그 차단
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('dragstart', e => e.preventDefault());
    document.addEventListener('selectstart', e => e.preventDefault());

    // [보안] 단축키 차단 (F12, Ctrl+U, S, I 등)
    document.addEventListener('keydown', e => {
        if (e.keyCode === 123 || 
           (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) ||
           (e.ctrlKey && (e.keyCode === 85 || e.keyCode === 83))) {
            e.preventDefault();
            return false;
        }
    });

    // [별똥별 최적화 로직] 데스크탑 ON, 모바일 OFF 초기화
    const starContainer = document.getElementById('shooting-stars');
    const starToggleBtn = document.getElementById('star-toggle-btn');
    const starStatus = document.getElementById('star-status');
    let starsActive = window.innerWidth > 768; 

    function updateStarUI() {
        if (starsActive) {
            starContainer.style.display = 'block';
            starStatus.innerText = 'ON';
            starToggleBtn.classList.add('active');
        } else {
            starContainer.style.display = 'none';
            starStatus.innerText = 'OFF';
            starToggleBtn.classList.remove('active');
        }
    }
    updateStarUI();
    starToggleBtn.addEventListener('click', () => {
        starsActive = !starsActive;
        updateStarUI();
    });

    // [디데이 카운터] 2026-04-16 기준
    const startDate = new Date("2026-04-16T00:00:00");
    function updateDDay() {
        const diff = new Date() - startDate;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        document.getElementById("dday-text").innerText = `❤ ${days}일 ${hours}시간 ${minutes}분 ${seconds}초`;
    }
    setInterval(updateDDay, 1000);
    updateDDay();

    // [이미지 로딩 최적화] 로딩 시 네모박스 방지 및 페이드인
    const images = document.querySelectorAll('.diary-img img');
    images.forEach(img => {
        if (img.complete) img.classList.add('loaded');
        else img.addEventListener('load', () => img.classList.add('loaded'));
    });

    // [Intersection Observer] 스크롤 페이드인
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.diary-card, .hidden-letter-section').forEach(el => observer.observe(el));

    // [BGM 제어]
    const bgm = document.getElementById('bgm-audio');
    const bgmBtn = document.getElementById('bgm-toggle-btn');
    bgmBtn.addEventListener('click', () => {
        if (bgm.paused) {
            bgm.play();
            bgmBtn.classList.add('playing');
        } else {
            bgm.pause();
            bgmBtn.classList.remove('playing');
        }
    });

    // [토글 버튼] 자세히 보기
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.previousElementSibling;
            content.classList.toggle('active');
            btn.innerText = content.classList.contains('active') ? '숨기기 ▲' : '자세히 보기 ▼';
        });
    });

    // [모달] 사진 확대
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    images.forEach(img => {
        img.addEventListener('click', () => {
            modalImg.src = img.src;
            modal.classList.add('open');
        });
    });
    modal.addEventListener('click', () => modal.classList.remove('open'));

    // [비밀번호 편지] 0114 / 0416
    const unlockBtn = document.getElementById('unlock-btn');
    unlockBtn.addEventListener('click', () => {
        const pw = document.getElementById('letter-password').value;
        if (pw === '0114' || pw === '0416') {
            document.getElementById('lock-screen').style.display = 'none';
            document.getElementById('secret-letter').classList.add('open');
        } else alert('비밀번호가 틀렸어!');
    });

    // [TOP 버튼]
    const topBtn = document.getElementById('top-btn');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) topBtn.classList.add('show');
        else topBtn.classList.remove('show');
    });
    topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});
