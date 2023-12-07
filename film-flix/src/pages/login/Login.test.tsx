// src/pages/Login.test.tsx
import { shallow } from "enzyme";
import Login from "./Login";

// Mockear useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // Mantén las implementaciones no mockeadas
  useNavigate: jest.fn(),
}));

describe("Login Component", () => {
  it("renders form elements", () => {
    // Renderiza el componente Login
    const wrapper = shallow(<Login />);

    // Verifica que el formulario existe
    expect(wrapper.find("form").length).toBe(1);

    // Verifica que hay un campo de entrada de texto con las propiedades específicas
    expect(wrapper.find("input#email").length).toBe(1);
    expect(wrapper.find('input#email[type="email"]').length).toBe(1);
    expect(wrapper.find('input#email[autoComplete="email"]').length).toBe(1);
    expect(wrapper.find("input#email[required]").length).toBe(1);
    expect(
      wrapper.find('input#email[placeholder="email@example.com"]').length
    ).toBe(1);
    expect(wrapper.find("input#email.w-full").length).toBe(1);

    // Verifica que hay un campo de entrada de contraseña con las propiedades específicas
    expect(wrapper.find("input#password").length).toBe(1);
    expect(wrapper.find('input#password[type="password"]').length).toBe(1);
    expect(
      wrapper.find('input#password[autoComplete="current-password"]').length
    ).toBe(1);
    expect(wrapper.find("input#password[required]").length).toBe(1);
    expect(
      wrapper.find('input#password[placeholder="• • • • • • • •"]').length
    ).toBe(1);
    expect(wrapper.find("input#password.w-full").length).toBe(1);

    // Verifica que hay un botón de envío con las propiedades específicas
    expect(wrapper.find('[aria-label="Username"]').length).toBe(0);
    expect(wrapper.find('[aria-label="Password"]').length).toBe(0);
  });
});
