export const toggleBurgerMenu = () => {
  console.log('Burger Menu Toggler');
  const burgerButton = document.querySelector('.burger');
  burgerButton.addEventListener('click', () => {
    const currentState = burgerButton.getAttribute('data-state');
    if (!currentState || currentState === 'closed') {
      console.log('Menu Closed!');
      burgerButton.setAttribute('data-state', 'opened');
      burgerButton.setAttribute('aria-expanded', 'true');
    } else {
      console.log('Menu Opened!');
      burgerButton.setAttribute('data-state', 'closed');
      burgerButton.setAttribute('aria-expanded', 'false');
    }
  });
};