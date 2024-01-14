import { shallow, ShallowWrapper } from 'enzyme';
import Home from './Home';


jest.mock('../../components/footer', () => ({
  __esModule: true,
  ...jest.requireActual('../../components/footer'),
  footer: jest.fn()
}));

jest.mock('../../components/navbar', () => ({
  __esModule: true,
  ...jest.requireActual('../../components/navbar'),
  footer: jest.fn()
}));

jest.mock("../../img/daredevil.webp", () => ({
  __esModule: true,
  default: "test-file-stub",
}));

jest.mock("../../img/morbius.webp", () => ({
  __esModule: true,
  default: "test-file-stub",
}));

jest.mock("../../img/GirlUsingLaptop.webp", () => ({
  __esModule: true,
  default: "test-file-stub",
}));

describe ('Home Component', () => {
  let wrapper : ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Home />);
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders content', () => {
    expect(wrapper.find('div').length).toBe(16);
  });

  it ('renders content elements', () => {
    expect(wrapper.find('div').length).toBe(16);
    expect(wrapper.find('h2').length).toBe(6);
    expect(wrapper.find('p').length).toBe(7);
    expect(wrapper.find('img').length).toBe(3);
  });

  it('renders buttons', () => {
    expect(wrapper.find('button').length).toBe(0);
  });
});