import { shallow, ShallowWrapper } from 'enzyme';
import Content from './content';

jest.mock('../../components/footer/footer', () => ({
  __esModule: true,
  ...jest.requireActual('../../components/footer/footer'),
  footer: jest.fn()
}));

jest.mock('../../components/navbar/navbar', () => ({
  __esModule: true,
  ...jest.requireActual('../../components/navbar/navbar'),
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
    expect(wrapper.find('div').length).toBe(5);
  });

  it ('renders content elements', () => {
    expect(wrapper.find('div').length).toBe(5);
    expect(wrapper.find('h2').length).toBe(0);
    expect(wrapper.find('p').length).toBe(0);
    expect(wrapper.find('img').length).toBe(0);
    expect(wrapper.find('h1').length).toBe(0);
    expect(wrapper.find('ul').length).toBe(0);
    expect(wrapper.find('input').length).toBe(0);
    expect(wrapper.find('Link').length).toBe(0);
  });

  it('renders buttons', () => {
    expect(wrapper.find('button').length).toBe(0);
  });

  it('renders dynamic content', () => {
    wrapper.setProps({ type: "movies" });

    expect(wrapper.exists()).toBe(true);
  });

  it('renders the correct number of buttons', () => {
    expect(wrapper.find('button')).toHaveLength(0);
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
    expect(wrapper.find('div').length).toBe(5);
  });

  it ('renders content elements', () => {
    expect(wrapper.find('div').length).toBe(5);
    expect(wrapper.find('h2').length).toBe(0);
    expect(wrapper.find('p').length).toBe(0);
    expect(wrapper.find('img').length).toBe(0);
    expect(wrapper.find('h1').length).toBe(0);
    expect(wrapper.find('ul').length).toBe(0);
    expect(wrapper.find('input').length).toBe(0);
    expect(wrapper.find('Link').length).toBe(0);
  });

  it('renders buttons', () => {
    expect(wrapper.find('button').length).toBe(0);
  });

  it('renders dynamic content', () => {
    wrapper.setProps({ type: "series" });

    expect(wrapper.exists()).toBe(true);
  });

  afterEach(() => {
      wrapper.unmount();
  });
});