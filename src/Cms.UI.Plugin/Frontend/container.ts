import './Components/Container/reset';
import './Components/Container';
import { registerResize } from './Components/Container/events';

const container = document.getElementById('view-portal') as HTMLIFrameElement;
if (container) 
    registerResize(container);