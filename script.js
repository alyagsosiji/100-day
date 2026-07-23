document.addEventListener('DOMContentLoaded', () => {
    
    // [1] 디데이 카운터
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

    // [2] 이미지 스무스 로딩 (뚝뚝 끊기는 현상 방지)
    const cardImages = document.querySelectorAll('.diary-img img');
    cardImages.forEach(img => {
        // 이미지가 캐시되어 이미 로드된 상태인 경우
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            // 새로 다운로드 되는 경우 이벤트 리스너 추가
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });

    // [3] 스크롤 페이드인 애니메이션 (Intersection Observer 활용)
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

    // [4] 자세히 보기 / 숨기기 토글 기능
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

    // [5] 숨겨진 편지 암호 해제 기능
    const unlockBtn = document.getElementById('unlock-btn');
    if (unlockBtn) {
        unlockBtn.addEventListener('click', () => {
            const pwInput = document.getElementById('letter-password').value;
            if (pwInput === '0114') { // HTML에 적힌 예시 비번에 맞춰 0114로 임시 변경 (필요시 0416으로 수정)
                document.getElementById('lock-screen').style.display = 'none';
                document.getElementById('secret-letter').classList.add('open');
            } else {
                alert('비밀번호가 틀렸어. 우리가 처음 만난 날을 떠올려봐!');
            }
        });
    }

    // [6] 엔터키로도 편지 암호 풀리게 설정
    const pwInputField = document.getElementById('letter-password');
    if (pwInputField) {
        pwInputField.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                unlockBtn.click();
            }
        });
    }

    // [7] 보안 기능: 마우스 우클릭, 드래그, 텍스트 선택 방지
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('dragstart', e => e.preventDefault());
    document.addEventListener('selectstart', e => e.preventDefault());

    // [8] 보안 기능: 키보드 단축키(개발자 도구 등) 완전 차단
    document.addEventListener('keydown', function(event) {
        if (event.keyCode === 123) { // F12
            event.preventDefault();
            return false;
        }
        if (event.ctrlKey && event.shiftKey && (event.keyCode === 73 || event.keyCode === 74 || event.keyCode === 67)) { 
            event.preventDefault();
            return false;
        }
        if (event.ctrlKey && event.keyCode === 85) { // Ctrl+U
            event.preventDefault();
            return false;
        }
        if (event.ctrlKey && event.keyCode === 83) { // Ctrl+S
            event.preventDefault();
            return false;
        }
    });
});
