// Implementation of the different tests usign Jest, Enzyme and Mocha.
// Advertise: See the configuration of Jest in package.json
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
