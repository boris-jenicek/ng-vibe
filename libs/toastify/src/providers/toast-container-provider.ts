export function setupToastContainer(document: Document) {
  return () => {
    const container = document.createElement('div');
    container.id = 'toastify-container';
    const styles = {
      position: 'fixed',
      top: '0',
      left: '0',
      zIndex: '999999999999',
    };
    Object.assign(container.style, styles);
    document.body.appendChild(container);
  };
}
