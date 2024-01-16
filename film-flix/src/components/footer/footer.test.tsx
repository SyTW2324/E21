import { shallow, ShallowWrapper } from 'enzyme';
import Footer from './footer';

describe('Footer component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<Footer />);
  });

  it('should render without crashing', () => {
    expect(wrapper).toBeTruthy();
  });

  it('should display the correct footer', () => {
    const footer = 'FilmFlix© 2023 FilmFlix';
    wrapper.setProps({ footer });
    expect(wrapper.text()).toContain(footer);
  });

  it('should apply the correct footer type', () => {
    const type = 'success';
    wrapper.setProps({ type });
    expect(wrapper.hasClass(`footer-${type}`)).toBe(false);
  });
});