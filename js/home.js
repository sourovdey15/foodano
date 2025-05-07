
const menuItems = document.querySelectorAll('li');

menuItems.forEach(function(item){
    item.addEventListener('mouseover', () => {
        item.classList.add('hover:text-hoverColor');
        // item.classList.add('hover:underline');
      });
      item.addEventListener('mouseout', () => {
        item.classList.remove('hover:text-hoverColor');
        // item.classList.remove('hover:underline');
      });
});


// button style
document.querySelectorAll('button').forEach(button => {
  // Wrap inner content in a <span> to handle layering
  const span = document.createElement('span');
  span.innerHTML = button.innerHTML;
  button.innerHTML = '';
  button.appendChild(span);

  // Add the class for the hover effect
  button.classList.add('circle-hover-effect');
});

// Product Cart Hover Style
