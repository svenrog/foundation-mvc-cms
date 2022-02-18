export const registerResize = (iframe: HTMLIFrameElement) => {
    iframe.contentWindow.addEventListener('load', (event) => onResize(event, iframe))
    iframe.contentWindow.addEventListener('resize', (event) => onResize(event, iframe))
}

const onResize = (event: Event, iframe: HTMLIFrameElement) => {
    const window = event.currentTarget as Window;
    const document = window?.document?.documentElement;

    if (!document)
        return;

    const newHeight = `${document.scrollHeight}px`;

    if (iframe.style.maxHeight === newHeight)
        return;

    iframe.style.maxHeight = newHeight;
}