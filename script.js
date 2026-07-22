document.addEventListener('DOMContentLoaded', () => {
    
    // [1] 디데이 카운터 (2026년 4월 16일 기준, 당일을 1일로 계산)
    function updateDDay() {
        const startDate = new Date("2026-04-16T00:00:00");
        const now = new Date();
        const diff = now - startDate;
        
        // 1일차를 포함하므로 +1
        const days = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        
        const ddayText = document.getElementById("dday-text");
        if (ddayText) {
            ddayText.innerText = `우리가 함께한 지 ${days}일 ${hours}시간 ${minutes}분 ${seconds}초`;
        }
    }
    
    // 1초마다 디데이 업데이트
    setInterval(updateDDay, 1000);
    updateDDay(); // 로드 시 즉시 실행

    // [2] 스크롤 페이드인 애니메이션 (Intersection Observer 활용)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // 요소가 10% 화면에 보일 때 실행
    });

    // 모든 일기 카드와 편지 섹션 관찰 시작
    document.querySelectorAll('.diary-card, .hidden-letter-section').forEach(el => {
        observer.observe(el);
    });

    // [3] 자세히 보기 / 숨기기 토글 기능
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

    // [4] 숨겨진 편지 암호 해제 기능
    const unlockBtn = document.getElementById('unlock-btn');
    if (unlockBtn) {
        unlockBtn.addEventListener('click', () => {
            const pwInput = document.getElementById('letter-password').value;
            // 0416 입력 시 잠금 해제
            if (pwInput === '0416') {
                document.getElementById('lock-screen').style.display = 'none';
                document.getElementById('secret-letter').classList.add('open');
            } else {
                alert('비밀번호가 틀렸어. 우리가 처음 만난 날을 떠올려봐!');
            }
        });
    }

    // [5] 엔터키로도 편지 암호 풀리게 설정
    const pwInputField = document.getElementById('letter-password');
    if (pwInputField) {
        pwInputField.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                unlockBtn.click();
            }
        });
    }

    // [6] 보안 기능: 마우스 우클릭, 드래그, 텍스트 선택 방지
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('dragstart', e => e.preventDefault());
    document.addEventListener('selectstart', e => e.preventDefault());

    // [7] 보안 기능: 키보드 단축키(개발자 도구 등) 완전 차단
    document.addEventListener('keydown', function(event) {
        if (event.keyCode === 123) { // F12
            event.preventDefault();
            return false;
        }
        if (event.ctrlKey && event.shiftKey && (event.keyCode === 73 || event.keyCode === 74 || event.keyCode === 67)) { // Ctrl+Shift+I/J/C
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
