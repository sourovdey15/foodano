
const menuItems = document.querySelectorAll('li');

menuItems.forEach(function(item){
    item.addEventListener('mouseover', () => {
        item.classList.add('hover:text-hoverColor');
        item.classList.add('hover:underline');
      });
      item.addEventListener('mouseout', () => {
        item.classList.remove('hover:text-hoverColor');
        item.classList.remove('hover:underline');
      });
});