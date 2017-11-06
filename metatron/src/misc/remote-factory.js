import { remote } from 'electron';

const { store } = remote.require(`${__dirname}/main-factory`);

export { store };
