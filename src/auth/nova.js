export const novaApp = (container, firebase) => {
  const html = `
        <div id="novaAppPage">
          <img id="inicialLogo" src="resources/novaAppImage.png" alt="Inicial logo" data-action="login">
        </div>
        `;
    // eslint-disable-next-line no-param-reassign
  container.innerHTML = html;
  firebase.stateVerif();
};
