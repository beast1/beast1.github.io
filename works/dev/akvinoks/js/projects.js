//function initToggleMod(itemClass, itemMod, parent) {
//  var itemsParent = parent ? document.querySelector(parent) : document;
//  var items = document.querySelector('.' + itemClass);
//  console.log(items)
//  function toggleMod(evt) {
//    items.forEach(function(item) {
//      item.classList.remove(itemClass + '_' + itemMod);
//    });
//    evt.target.classList.add(itemClass + '_' + itemMod);
//  }
//  items.addEventListener('click', toggleMod);
//}
//initToggleMod('projects__filters-item', 'current');
function initMenu() {
  var items = document.querySelectorAll('.projects__filters-item');
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