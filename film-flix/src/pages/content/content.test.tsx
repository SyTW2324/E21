import { shallow, ShallowWrapper } from 'enzyme';
import Content from './content';

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

// Testing the content component using movies
describe('Content Movies Component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Content type={"movies"} />);
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders content', () => {
    expect(wrapper.find('div').length).toBe(12);
  });

  it ('renders content elements', () => {
    expect(wrapper.find('div').length).toBe(12);
    expect(wrapper.find('h2').length).toBe(0);
    expect(wrapper.find('p').length).toBe(0);
  });

  it('renders buttons', () => {
    expect(wrapper.find('button').length).toBe(5);
  });

  it('renders dynamic content', () => {
    wrapper.setProps({ type: "movies" });

    expect(wrapper.exists()).toBe(true);
  });

  afterEach(() => {
      wrapper.unmount();
  });
});

// Testing the content component using series
describe('Content Series Component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Content type={"series"} />);
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders content', () => {
    expect(wrapper.find('div').length).toBe(12);
  });

  it ('renders content elements', () => {
    expect(wrapper.find('div').length).toBe(12);
    expect(wrapper.find('h2').length).toBe(0);
    expect(wrapper.find('p').length).toBe(0);
  });

  it('renders buttons', () => {
    expect(wrapper.find('button').length).toBe(5);
  });

  it('renders dynamic content', () => {
    wrapper.setProps({ type: "series" });

    expect(wrapper.exists()).toBe(true);
  });

  afterEach(() => {
      wrapper.unmount();
  });
});