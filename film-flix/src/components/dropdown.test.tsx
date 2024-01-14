import { shallow, ShallowWrapper } from 'enzyme';
import DropdownComponent from './dropdown';

const isOpen: boolean = false;
const onToggle = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe('DropdownComponent', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<DropdownComponent isOpen={isOpen} onToggle={onToggle}/>);
  });

  it('should render without crashing', () => {
    expect(wrapper).toBeTruthy();
  });
});