function initMenu() {
  var items = Array.from(document.querySelectorAll('.projects__filters-item'));
  items.forEach(function(item) {
    item.addEventListener('click', function() {
      items.forEach(function(it) {
        it.classList.remove('projects__filters-item_current');
      });
      item.classList.add('projects__filters-item_current');
    });
  });
};
initMenu();
initModal('.projects__filters-map', '#modal-map');