document.addEventListener('DOMContentLoaded', () => {
    const movieList = document.getElementById('movie-list');
    const allCards = movieList.querySelectorAll('.card');
    const searchInput = document.getElementById('search-input');
    const filterSelect = document.getElementById('filter-select');
    const searchButton = document.getElementById('search-button');
    const paginationNumbers = document.getElementById('paginationNumbers');
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');

    let filteredCards = Array.from(allCards);
    let currentPage = 1;
    const itemsPerPage = 2;

    // تابع برای فیلتر کردن کارت‌ها
    function filterMovies() {
        const searchText = searchInput.value.toLowerCase();
        const selectedCategory = filterSelect.value;

        filteredCards = Array.from(allCards).filter(card => {
            const title = card.querySelector('h4').innerText.toLowerCase();
            const category = card.dataset.category;

            return (selectedCategory === 'all' || category === selectedCategory) && title.includes(searchText);
        });

        currentPage = 1; // بازگشت به صفحه اول
        renderPage();
    }

    // تابع نمایش کارت‌ها بر اساس صفحه فعلی
    function renderPage() {
        allCards.forEach(card => (card.style.display = 'none'));

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        filteredCards.slice(start, end).forEach(card => {
            card.style.display = 'block';
        });

        updatePagination();
    }

    // به‌روزرسانی شماره‌های صفحه‌بندی
    function updatePagination() {
        paginationNumbers.innerHTML = '';
        const totalPages = Math.ceil(filteredCards.length / itemsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.innerText = i;
            pageButton.className = 'btn btn-xs mx-1';
            pageButton.onclick = () => {
                currentPage = i;
                renderPage();
            };

            if (i === currentPage) {
                pageButton.classList.add('btn-primary');
            }

            paginationNumbers.appendChild(pageButton);
        }

        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage === totalPages;
    }

    // کنترل حرکت بین صفحات
    window.showPage = function(page) {
        const totalPages = Math.ceil(filteredCards.length / itemsPerPage);

        if (page < 1 || page > totalPages) return;

        currentPage = page;
        renderPage();
    };

    // فعال کردن دکمه جستجو در صورت وارد کردن متن
    searchInput.addEventListener('input', () => {
        searchButton.disabled = searchInput.value.trim() === '';
    });

    // اتصال به دکمه جستجو
    searchButton.addEventListener('click', filterMovies);
    filterSelect.addEventListener('change', filterMovies);

    // نمایش پیش‌فرض
    renderPage();
});
