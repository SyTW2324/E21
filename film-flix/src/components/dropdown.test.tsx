import { shallow, ShallowWrapper } from 'enzyme';
import DropdownComponent from './dropdown';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe('DropdownComponent', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<DropdownComponent />);
  });

  it('should render without crashing', () => {
    expect(wrapper).toBeTruthy();
  });
});