import { shallow, ShallowWrapper } from "enzyme";
import NotFound from "./NotFound";

describe("NotFound Component", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<NotFound />);
  });

  it("renders without crashing", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders 404 error message", () => {
    expect(wrapper.find("h1").text()).toBe("404");
    expect(wrapper.find("p").length).toBe(2);
    expect(wrapper.find("a").length).toBe(1);
  });
});
