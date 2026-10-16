const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const searchToggle = document.getElementById('searchToggle');
const searchBar = document.getElementById('searchBar');
const searchInput = document.getElementById('searchInput');

menuToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '×' : '☰';
});

mainNav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (menuToggle) menuToggle.textContent = '☰';
  });
});

searchToggle?.addEventListener('click', () => {
  searchBar.classList.toggle('open');
  if (searchBar.classList.contains('open')) searchInput?.focus();
});

searchBar?.addEventListener('submit', event => {
  event.preventDefault();
  const term = searchInput.value.trim().toLocaleLowerCase('vi');
  let found = 0;
  document.querySelectorAll('.product-card').forEach(card => {
    const matches = card.textContent.toLocaleLowerCase('vi').includes(term);
    card.classList.toggle('hidden', Boolean(term) && !matches);
    if (!term || matches) found++;
  });
  document.getElementById('productCount').textContent = `${String(found).padStart(2, '0')} sản phẩm`;
  document.getElementById('products').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.querySelectorAll('.filter-button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter-button').forEach(item => item.classList.remove('selected'));
    button.classList.add('selected');
    const filter = button.dataset.filter;
    let count = 0;
    document.querySelectorAll('.product-card').forEach(card => {
      const visible = filter === 'all' || card.dataset.type === filter;
      card.classList.toggle('hidden', !visible);
      if (visible) count++;
    });
    document.getElementById('productCount').textContent = `${String(count).padStart(2, '0')} sản phẩm`;
  });
});

document.querySelectorAll('.category-card').forEach(card => {
  card.addEventListener('click', () => {
    const category = card.dataset.category;
    const filterMap = { 'Lục bình': 'basket', 'Mây tre': 'basket', 'Nội thất': 'bamboo', 'Trang trí': 'decor', 'Tre': 'bamboo' };
    const filter = filterMap[category] || 'all';
    document.querySelector(`.filter-button[data-filter="${filter}"]`)?.click();
  });
});

document.getElementById('contactForm')?.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const subject = encodeURIComponent('Yêu cầu thông tin từ ' + data.get('name'));
  const body = encodeURIComponent(
    `Họ tên: ${data.get('name')}\nEmail: ${data.get('email')}\n\nNội dung:\n${data.get('message')}`
  );
  document.getElementById('formFeedback').textContent = 'Đang mở ứng dụng email để gửi yêu cầu...';
  window.location.href = `mailto:info@gianguyencraft.com?subject=${subject}&body=${body}`;
});
