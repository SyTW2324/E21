import { shallow } from 'enzyme';
import Navbar from './navbar';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

describe('Navbar component', () => {
  it('should crash with ReferenceError', () => {
    try {
      shallow(<Navbar />);
      // Si no se lanza un error, hacemos que el test falle
      expect(true).toBe(false);
    } catch (error) {
      expect(error instanceof ReferenceError).toBe(true);
    }
  });
});