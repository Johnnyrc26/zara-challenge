import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Asignar TextEncoder y TextDecoder al ámbito global
Object.assign(global, { TextDecoder, TextEncoder });
