document.addEventListener('DOMContentLoaded', () => {
    
    // [1] 자세히 보기 / 숨기기 토글 기능
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

    // [2] 보안 기능: 마우스 우클릭, 드래그, 텍스트 선택 방지
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('dragstart', e => e.preventDefault());
    document.addEventListener('selectstart', e => e.preventDefault());

    // [3] 보안 기능: 키보드 단축키(개발자 도구 등) 완전 차단
    document.addEventListener('keydown', function(event) {
        // F12 차단
        if (event.keyCode === 123) {
            event.preventDefault();
            return false;
        }
        // Ctrl+Shift+I, J, C (개발자 도구 단축키) 차단
        if (event.ctrlKey && event.shiftKey && (event.keyCode === 73 || event.keyCode === 74 || event.keyCode === 67)) {
            event.preventDefault();
            return false;
        }
        // Ctrl+U (페이지 소스 보기) 차단
        if (event.ctrlKey && event.keyCode === 85) {
            event.preventDefault();
            return false;
        }
        // Ctrl+S (웹페이지 저장하기) 차단
        if (event.ctrlKey && event.keyCode === 83) {
            event.preventDefault();
            return false;
        }
    });
});
