import { shallow, ShallowWrapper } from 'enzyme';
import Episodes from './episodes';
import { Movies } from "../types/movies";


describe('Episodes component', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    const content: Movies = {
      _id: 'test',
      image: 'test',
      title: 'test',
      description: 'test',
      director: 'test',
      year: 1999,
      duration: 1,
      cast: ['test'], 
      genre: ['test'],
      rating: 1,
      platform: ['test'],
    }

    wrapper = shallow(<Episodes content={content}/>);
  });

  it('should render without crashing', () => {
    expect(wrapper).toBeTruthy();
  });
});