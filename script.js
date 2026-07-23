document.addEventListener('DOMContentLoaded', () => {
    
    // [추가] 최적화: 별똥별 애니메이션 제어
    const starContainer = document.getElementById('shooting-stars');
    const starToggleBtn = document.getElementById('star-toggle-btn');
    const starStatus = document.getElementById('star-status');

    // 모바일(768px 이하)일 때 false(OFF), 데스크탑일 때 true(ON)
    let isMobile = window.innerWidth <= 768;
    let starsActive = isMobile ? false : true; 

    function updateStarUI() {
        if (starsActive) {
            starContainer.style.display = 'block';
            if(starStatus) starStatus.innerText = 'ON';
            if(starToggleBtn) starToggleBtn.classList.add('active');
        } else {
            starContainer.style.display = 'none';
            if(starStatus) starStatus.innerText = 'OFF';
            if(starToggleBtn) starToggleBtn.classList.remove('active');
        }
    }

    // 로드 시 초기 상태 적용
    updateStarUI();

    // 토글 버튼 클릭 이벤트
    if (starToggleBtn) {
        starToggleBtn.addEventListener('click', () => {
            starsActive = !starsActive;
            updateStarUI();
        });
    }

    // [기존 유지] 디데이 카운터
    function updateDDay() {
        const startDate = new Date("2026-04-16T00:00:00");
        const now = new Date();
        const diff = now - startDate;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        
        const ddayText = document.getElementById("dday-text");
        if (ddayText) {
            ddayText.innerText = `❤ ${days}일 ${hours}시간 ${minutes}분 ${seconds}초`;
        }
    }
    
    setInterval(updateDDay, 1000);
    updateDDay(); 

    // [1번 기능] BGM 재생/일시정지 제어
    const bgmAudio = document.getElementById('bgm-audio');
    const bgmToggleBtn = document.getElementById('bgm-toggle-btn');
    const bgmIcon = document.getElementById('bgm-icon');

    if (bgmToggleBtn && bgmAudio) {
        bgmToggleBtn.addEventListener('click', () => {
            if (bgmAudio.paused) {
                bgmAudio.play().then(() => {
                    bgmToggleBtn.classList.add('playing');
                    bgmIcon.textContent = '🎶';
                }).catch(err => {
                    console.log("음악 재생 중 오류 발생:", err);
                });
            } else {
                bgmAudio.pause();
                bgmToggleBtn.classList.remove('playing');
                bgmIcon.textContent = '🎵';
            }
        });
    }

    // [기존 유지] 이미지 스무스 로딩
    const cardImages = document.querySelectorAll('.diary-img img');
    cardImages.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });

    // [3번 기능] 사진 클릭 시 라이트박스 모달로 크게 보기
    const imageModal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const modalClose = document.querySelector('.modal-close');

    cardImages.forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            if (imageModal && modalImg) {
                modalImg.src = img.src;
                imageModal.classList.add('open');
            }
        });
    });

    if (imageModal) {
        imageModal.addEventListener('click', () => {
            imageModal.classList.remove('open');
        });
    }

    // [기존 유지] 스크롤 페이드인 애니메이션
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 
    });

    document.querySelectorAll('.diary-card, .hidden-letter-section').forEach(el => {
        observer.observe(el);
    });

    // [기존 유지] 자세히 보기 / 숨기기 토글 기능
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.diary-card');
            const longDesc = card.querySelector('.desc-long');
            
            longDesc.classList.toggle('active');
            
            if (longDesc.classList.contains('active')) {
                button.textContent = '숨기기 ▲';
            } else {
                button.textContent = '자세히 보기 ▼';
            }
        });
    });

    // [5번 기능] 맨 위로 이동 (Top 버튼) 및 스크롤 감지
    const topBtn = document.getElementById('top-btn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            topBtn.classList.add('show');
        } else {
            topBtn.classList.remove('show');
        }
    });

    if (topBtn) {
        topBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // [기존 유지] 숨겨진 편지 암호 해제 기능
    const unlockBtn = document.getElementById('unlock-btn');
    if (unlockBtn) {
        unlockBtn.addEventListener('click', () => {
            const pwInput = document.getElementById('letter-password').value.trim();
            if (pwInput === '0114' || pwInput === '0416') {
                document.getElementById('lock-screen').style.display = 'none';
                document.getElementById('secret-letter').classList.add('open');
            } else {
                alert('비밀번호가 틀렸어. 우리가 처음 만난 날을 떠올려봐!');
            }
        });
    }

    const pwInputField = document.getElementById('letter-password');
    if (pwInputField) {
        pwInputField.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                unlockBtn.click();
            }
        });
    }

    // [기존 유지] 보안 기능
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('dragstart', e => e.preventDefault());
    document.addEventListener('selectstart', e => e.preventDefault());

    document.addEventListener('keydown', function(event) {
        if (event.keyCode === 123) {
            event.preventDefault();
            return false;
        }
        if (event.ctrlKey && event.shiftKey && (event.keyCode === 73 || event.keyCode === 74 || event.keyCode === 67)) { 
            event.preventDefault();
            return false;
        }
        if (event.ctrlKey && event.keyCode === 85) { 
            event.preventDefault();
            return false;
        }
        if (event.ctrlKey && event.keyCode === 83) { 
            event.preventDefault();
            return false;
        }
    });
});
